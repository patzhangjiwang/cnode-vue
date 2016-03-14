<template>
	<section class="slide-nav-wrap" :class="{'show': show}">
		<div class="slide-nav">
			<div class="user">
				<template v-if="! user.loginname">
					<span class="user-avatar-no"></span>
					<span @click="goLogin">登录</span>
				</template>
				<template v-if="user.loginname">
					<img :src="user.avatar_url">
					<span v-text="user.loginname"></span>
				</template>
			</div>
			<ul class="tag-list">
				<li v-for="tag in tags" v-text="tag" @click="switchTag($index)"></li>
			</ul>
			<ul class="other-list">
				<li v-for="item in items" v-text="item"></li>
			</ul>
		</div>
	</section>
</template>

<script>
	export default {
		props: ["show"],
		data() {
			return {
				items: ["设置尾巴", "消息", "关于"],
				tags: ["全部", "精华", "分享", "问答", "招聘"],
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
			}
		},
		methods: {
			goLogin() {
				this.slide = false
				//this.show = false
				this.$emit("hideSlideNav")

				this.$route.router.go("/login")
			},
			switchTag(index) {
				this.show = false

				//this.loading = true

				document.body.classList.remove("show")

				this.$dispatch("switchTag", index)
			}
		}
	}
</script>