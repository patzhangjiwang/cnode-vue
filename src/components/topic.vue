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
							<span class="reply-btn" v-if="loginState">回复</span>
							<span class="like" @click="like(item.id, item)" v-text="item.ups.includes('5617694c2fb53d5b4f2329bd') ? '取消赞' : '赞'"></span>
							<span class="like-count" v-text="item.ups.length + ' 赞'"></span>
						</p>
					</div>
				</li>
			</ul>
			<!-- <div class="reply-more" @click="loadMoreReply">显示更多评论</div> -->
		</div>
	</div>
</template>

<script>
	import api from "../api"
	import filters from "../filters"

	export default {
		data() {
			return {
				loading: true,
				topic: {
					author: {
						loginname: "",
						avatar_url: ""
					},
					replies: []
				}
			}
		},
		created() {
			this.getTopic()
		},
		computed: {
			loginState() {
				return !! localStorage.getItem("info")
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
				let token = JSON.parse(localStorage.getItem("info")).token
				let data = await api.like(id, token)

				if (data.success && data.action === "up") {
					item.ups.push(JSON.parse(localStorage.getItem("info")).id)

					return
				}

				if (data.success && data.action === "down") {
					item.ups.$remove(JSON.parse(localStorage.getItem("info")).id)

					return
				}

			}
		}
	}
</script>