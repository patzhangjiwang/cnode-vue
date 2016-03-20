<style src="../css/message.css"></style>

<template>
	<header class="header">
		<h2 class="title">消息</h2>
	</header>
	<router-view></router-view>
</template>

<script>
	export default {
		data() {
			return {
				items: ["未读消息", "已读消息"]
			}
		},
		route: {
			canActivate(transition) {
				if (! localStorage.getItem("user")) {
					transition.redirect("/login?redirect=/message")
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
		}
	}
</script>