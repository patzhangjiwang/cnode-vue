<style src="../css/login.css"></style>

<template>
	<header class="header topic-hd">
		<h2 class="title">登录</h2>
	</header>
	<div class="login-box">
		<input type="text" placeholder="Access Token" required v-model="token" v-focus="token" @keydown.enter="loginValidate">
		<a class="login-btn" href="javascript:;" v-touch="loginValidate">登录</a>
	</div>
	<tips :message.sync="message"></tips>
</template>

<script>
	import {login} from "../api"
	import tips from "../components/tips.vue"

	export default {
		data() {
			return {
				token: "",
				message: ""
			}
		},
		route: {
			canActivate() {
				if (localStorage.getItem("user")) {
					return false
				}
			}
		},
		components: {
			tips
		},
		methods: {
			loginValidate() {
				if (! this.token) {
					return
				}

				this.login()
			},
			async login() {
				let data = await login(this.token)
				let path = this.$route.query.redirect ? this.$route.query.redirect : "/"

				if (data.success) {
					// 记录 token
					data.token = this.token

					// 自定义小尾巴
					data.tail = "来自花见花开 人见人爱的南风~~"

					localStorage.setItem("user", JSON.stringify(data))

					this.$route.router.go(path)

					return
				}

				if (! data.success) {
					this.message = data.error_msg
				}
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
		}
	}
</script>