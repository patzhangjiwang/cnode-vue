<style src="../css/login.css"></style>

<template>
	<div>
		<header class="topic-hd">
			<h2 class="title">登录</h2>
		</header>
		<div class="login-box">
			<input type="text" placeholder="Access Token" required v-model="token" v-focus="token" @keydown.enter="loginValidate">
			<a class="login-btn" href="javascript:;" @click="loginValidate">登录</a>
		</div>
	</div>
</template>

<script>
	import api from "../api"

	export default {
		data() {
			return {
				token: ""
			}
		},
		methods: {
			loginValidate() {
				if (! this.token) {
					return 
				}

				this.login()
			},
			async login() {
				let data = await api.login(this.token)
				let path = this.$route.query.redirect

				if (data.success) {
					// 记录 token
					data.token = this.token

					// 自定义小尾巴
					data.tail = "来自花见花开 人见人爱的南风~~"

					path === "/profile/" && (path = path + data.loginname)

					localStorage.setItem("user", JSON.stringify(data))

					this.$dispatch("reviseTitle", data.loginname)

					this.$route.router.go(path)
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