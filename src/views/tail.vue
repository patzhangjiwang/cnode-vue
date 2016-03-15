<style src="../css/login.css"></style>

<template>
	<!-- <div> -->
		<header class="header topic-hd">
			<h2 class="title">设置尾巴</h2>
		</header>
		<div class="login-box">
			<input type="text" placeholder="造个尾巴玩玩吧" required v-model="tail" v-focus="tail" @keydown.enter="resetTail">
			<a class="login-btn" href="javascript:;" @click="resetTail">保存</a>
		</div>
	<!-- </div> -->
</template>

<script>
	export default {
		data() {
			return {
				tail: "",
				errorMessage: ""
			}
		},
		route: {
			canActivate(transition) {
				if (! localStorage.getItem("user")) {
					transition.redirect("/login?redirect=/tail")
					return false
				}

				return true
			}
		},
		created() {
			//this.$dispatch("loaded")
		},
		methods: {
			resetTail() {
				let user = JSON.parse(localStorage.getItem("user"))

				user.tail = this.tail

				localStorage.setItem("user", JSON.stringify(user))

				//this.tail = ""
				this.$dispatch("tailChanged", "小尾巴修改成功~~")

				this.$route.router.go("/")
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