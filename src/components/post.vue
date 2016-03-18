<style src="../css/post.css"></style>

<template>
	<header class="header">
		<a class="back-btn-wrap post-btn-wrap" v-link="{path: '/'}">
			<i class="back-btn"></i>
		</a>
		<h1 class="title">发表</h1>
		<a class="go-post-btn" href="javascript:;" :class="{highlight: highlight}" v-touch="post">发布</a>
	</header>
	<ul class="post-list">
		<li class="post-item">
			<input type="text" placeholder="表做标题党啊" v-focus="title" v-model="title" />
		</li>
		<li class="post-item">选择一个标签</li>
	</ul>
	<div class="post-container">
		<textarea class="post-content" placeholder="这一刻的想法..." v-model="content" @keyup.enter="toPost"></textarea>
		<p v-if="count">
			已输入
			<span v-text="count"></span>
			字
		</p>
	</div>

</template>

<script>
	import {post} from "../api"

	export default {
		data() {
			return {
				title: "",
				tag: "ask",
				content: "",
				count: 0,
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
			}
		},
		route: {
			canActivate(transition) {
				if (! localStorage.getItem("user")) {
					transition.redirect("/login?redirect=/post")
					return false
				}

				return true
			},
			activate() {
				this.$dispatch("addBgClass")
			},
			deactivate(transition) {
				this.$dispatch("removeBgClass")

				transition.next()
			}
		},
		directives: {
			focus(value) {
				if (value) {
					return
				}

				this.vm.$nextTick(() => {
					this.el.focus()
				})
			}
		},
		computed: {
			highlight() {
				return !! this.title && !! this.content ? true : false
			}
		},
		methods: {
			toPost(e) {
				if (! e.ctrlKey) {
					return
				}

				this.post()
			},
			async post() {
				if (! this.title || ! this.content) {
					return
				}

				if (this.title.length < 10) {
					this.$dispatch("tailChanged", "标题太少啊 要够10个字啊")

					return
				}

				let data = await post({
					token: this.user.token,
					title: this.title,
					tab: this.tag,
					content: this.content
				})

				if (data.success) {
					this.$route.router.go("/")
				}
			}
		}
	}
</script>