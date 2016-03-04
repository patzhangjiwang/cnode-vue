<style src="../css/topic.css"></style>

<template>
	<header class="topic-hd">
		<div class="back-btn"></div>
		<h2 class="title">主题</h2>
		<div class="login-btn"></div>
	</header>
	<div class="container">
		<div class="content" v-html="topic.content"></div>
		<div class="reply"></div>
	</div>
</template>

<script>
	import api from "../api"

	export default {
		data() {
			return {
				topic: {}
			}
		},
		created() {
			this.getTopic()
		},
		methods: {
			async getTopic() {
				let data = await api.getTopic(this.$route.params.topicId)

				this.topic = data.data
			}
		}
	}
</script>