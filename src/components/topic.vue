<style src="../css/topic.css"></style>

<template>
	<header class="header topic-hd">
		<a class="back-btn-wrap" v-link="{path: '/'}">
			<i class="back-btn"></i>
		</a>
		<h2 class="title">帖子正文</h2>
		<!-- <div class="login-btn"></div> -->
	</header>
	<!-- <div class="loading-wrap topic-loading" v-if="loading">
		<div class="loading">正在加载 客官骚等哈~~</div>
	</div> -->
	<div class="topic-container" v-if="! loading">
		<div class="topic-content">
			<div class="topic-header">
				<h1 class="topic-title" v-text="topic.title"></h1>
				<p>
					<img class="topic-avatar" :src="topic.author.avatar_url">
					<span class="topic-username" v-text="topic.author.loginname"></span>
					<span>·</span>
					<span v-text="topic.create_at | timeFormat"></span>
				</p>
			</div>
			<div v-html="topic.content"></div>
		</div>
		<div class="reply">
			<div class="reply-count" v-text="topic.reply_count | textFormat"></div>
			<ul class="reply-list">
				<li class="reply-item" v-for="item in topic.replies">
					<div>
						<img class="avatar" :src="item.author.avatar_url">
					</div>
					<div>
						<a class="reply-name" :href="'https://cnodejs.org/user/' + item.author.loginname" v-text="item.author.loginname"></a>
						<p class="reply-content" v-html="item.content"></p>
						<p class="reply-ft">
							<span v-text="item.create_at | timeFormat"></span>
							<template v-if="loginState">
								<template v-if="item.author.loginname !== user.loginname">
									<span class="reply-btn" @click="subReply(item)">回复</span>
									<span class="like" @click="like(item.id, item)" v-text="item.ups.includes('5617694c2fb53d5b4f2329bd') ? '取消赞' : '赞'"></span>
									<span class="like-count" v-text="item.ups.length + ' 赞'"></span>
								</template>
								<template v-else>
									<span class="del" @click="del">删除</span>
								</template>
							</template>
							<template v-else>
								<span class="like" @click="forLike">赞</span>
								<span class="like-count" v-text="item.ups.length + ' 赞'"></span>
							</template>
							<div class="reply-box" v-if="item.replyState">
								<div class="reply-edit-content-wrap">
									<img :src="avatar">
									<input type="text" class="reply-edit-content" placeholder="留下你的评论" v-model="item.replyContent" @keydown.enter="toSubReply(item)">
								</div>
								<div class="reply-edit-btn-wrap">
									<span class="reply-edit-btn" @click="item.replyState = false">取消</span>
									<span class="reply-edit-btn" @click="toSubReply(item)">评论</span>
								</div>
							</div>
						</p>
					</div>
				</li>
			</ul>
			<div class="reply-box reply-box-ft" v-if="loginState">
				<div class="reply-edit-content-wrap">
					<img :src="user.avatar_url">
					<input type="text" class="reply-edit-content" placeholder="留下你的评论" v-model="replyContent" @click="replyState = true" @keydown.enter="toReply">
				</div>
				<div class="reply-edit-btn-wrap" v-if="replyState">
					<span class="reply-edit-btn" @click="replyState = false">取消</span>
					<span class="reply-edit-btn" @click="toReply">评论</span>
				</div>
			</div>
			<!-- <div class="reply-more" @click="loadMoreReply">显示更多评论</div> -->
		</div>
	</div>
	<modal :show.sync="showLoginModal"></modal>
</template>

<script>
	import api from "../api"
	import filters from "../filters"
	import modal from "./modal.vue"
	import Vue from "vue"

	export default {
		//props: ["user"],
		data() {
			return {
				loading: true,
				show: false,
				topic: {
					author: {
						loginname: "",
						avatar_url: ""
					},
					replies: []
				},
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
				replyContent: "",
				//replyContentFt: "",
				showLoginModal: false,
				replyState: false
			}
		},
		route: {
			activate(transition) {
				// 隐藏导航栏
				this.$dispatch("hideNav")

				transition.next()
			},
			deactivate() {
				// 显示导航栏
				this.$dispatch("showNav")
			}
		},
		components: {
			modal
		},
		created() {
			this.$dispatch("loading")

			this.getTopic()
		},
		computed: {
			loginState() {
				return !! localStorage.getItem("user")
			},
			avatar() {
				return this.user.avatar_url //JSON.parse(localStorage.getItem("user")).avatar_url
			}
		},
		filters: {
			textFormat(value) {
				return `${value}条评论`
			},
			timeFormat(value) {
				return filters.timeFormat(value)

			}
		},
		events: {
			showSlideNav() {
				this.show = true
			},
			hideSlideNav() {
				this.show = false
			}
		},
		methods: {
			async getTopic() {
				let data = await api.getTopic(this.$route.params.topicId)

				this.topic = data.data

				this.loading = false

				this.$dispatch("loaded")
			},
			async like(id, item) {
				let token = JSON.parse(localStorage.getItem("user")).token
				let data = await api.like(id, token)

				if (data.success && data.action === "up") {
					item.ups.push(JSON.parse(localStorage.getItem("user")).id)

					return
				}

				if (data.success && data.action === "down") {
					item.ups.$remove(JSON.parse(localStorage.getItem("user")).id)

					return
				}

			},
			toReply() {
				if (! this.replyContent) {
					return
				}

				let content = `${this.replyContent} <br> <br> ${this.user.tail}`

				this.reply(content)
			},
			toSubReply(item) {
				if (! item.replyContent) {
					return
				}

				let replyName = `<a href="/profile/${item.author.loginname}">@${item.author.loginname}</a>`,
					replyContent = item.replyContent

				let content = `${replyName} ${item.replyContent} <br> <br> ${this.user.tail}`

				this.reply(content, item)
			},
			async reply(content, item) {
				let token = this.user.token

				this.topic.replies.push({
					author: {
						loginname: this.user.loginname,
						avatar_url: this.user.avatar_url
					},
					create_at: filters.ISOTimeFormat(+ new Date),
					content: `<div class="markdown-text">${content}</div>`,
					ups: []
				})

				if (! item) {
					this.replyContent = ""
					this.replyState = false

					let data = await api.reply(token, this.$route.params.topicId, content)

					return
				}

				item.replyContent = ""
				item.replyState = false

				let data = await api.reply(token, this.$route.params.topicId, content, item.id)
			},
			forLike() {
				this.showLoginModal = true
			},
			del() {
				alert("点了也木有用 还没做~~")
			},
			subReply(item) {
				Vue.set(item, "replyState", true)
				Vue.set(item, "replyContent", "")
			}
		}
	}
</script>