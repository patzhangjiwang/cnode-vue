<style src="../css/login.css"></style>

<template>
	<header class="topic-hd">
		<h2 class="title">登录</h2>
	</header>
	<div class="login-box">
		<input type="text" placeholder="Access Token" required v-model="token" v-focus="token">
		<a class="login-btn" href="javascript:;" @click="loginValidate">登录</a>
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
					data.token = this.token

					path === "/profile/" && (path = path + data.loginname)

					localStorage.setItem("user", JSON.stringify(data))

					this.$route.router.go(path)
				}
			}
		},
		directives: {
			focus(value) {
				if (! value) {
					return
				}

				this.vm.$nextTick(() => {
					this.el.focus()
				})
			}
		}
	}
</script>