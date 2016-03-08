<style src="../css/topic.css"></style>

<template>
	<header class="topic-hd">
		<a class="back-btn" v-link="{path: '/'}"></a>
		<h2 class="title">帖子正文</h2>
		<div class="login-btn"></div>
	</header>
	<div class="loading-wrap topic-loading" v-if="loading">
		<div class="loading">正在加载 客官骚等哈~~</div>
	</div>
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
									<span class="reply-btn" @click="item.id.endsWith('sss') ? item.id = item.id.substring(0, item.id.indexOf('sss')) : item.id = item.id + 'sss'">回复</span>
									<span class="like" @click="like(item.id, item)" v-text="item.ups.includes('5617694c2fb53d5b4f2329bd') ? '取消赞' : '赞'"></span>
								</template>
								<template v-else>
									<span class="del" @click="del">删除</span>
								</template>
							</template>
							<template v-else>
								<span class="like" @click="forLike">赞</span>
							</template>
							<span class="like-count" v-text="item.ups.length + ' 赞'"></span>
							<div class="reply-box" v-if="item.aaa">
								<div class="reply-edit-content-wrap">
									<img :src="avatar">
									<input type="text" class="reply-edit-content" placeholder="留下你的评论" v-model="replyContent">
								</div>
								<div class="reply-edit-btn-wrap">
									<span class="reply-edit-btn">取消</span>
									<span class="reply-edit-btn" @click="reply(item.author.loginname, item.id)">评论</span>
								</div>
							</div>
						</p>
					</div>
				</li>
			</ul>
			<div class="reply-box reply-box-ft" v-if="loginState">
				<div class="reply-edit-content-wrap">
					<img :src="avatar">
					<input type="text" class="reply-edit-content" placeholder="留下你的评论" v-model="replyContentFt">
				</div>
				<div class="reply-edit-btn-wrap">
					<span class="reply-edit-btn">取消</span>
					<span class="reply-edit-btn" @click="reply">评论</span>
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

	export default {
		props: ["user"],
		data() {
			return {
				loading: true,
				topic: {
					author: {
						loginname: "",
						avatar_url: ""
					},
					replies: []
				},
				replyContent: "",
				replyContentFt: "",
				showLoginModal: false
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
		methods: {
			async getTopic() {
				let data = await api.getTopic(this.$route.params.topicId)

				this.topic = data.data

				this.loading = false
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
			async reply(name, replyId) {
				let replyName = "",
					replyContent = this.replyContentFt

				if (typeof name === "string") {
					replyName = "@name"
					replyContent = this.replyContent
				}

				let content = `${replyName}${replyContent} <br> 来自宇宙超级无敌帅的南风小神仙~~`

				let token = JSON.parse(localStorage.getItem("user")).token
				let data = await api.reply(token, this.$route.params.topicId, content, replyId)
			},
			forLike() {
				this.showLoginModal = true
			},
			del() {
				alert("删除API 木有开放~~")
			}
		}
	}
</script>