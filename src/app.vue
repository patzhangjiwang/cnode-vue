<template>
	<div :class="{show: show}">
		<section class="slide-nav-wrap" :class="{'show': show}" v-if="slide">
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
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tag: "全部",
				show: false,
				//loading: false,
				slide: false,
				items: ["设置尾巴", "消息", "关于"],
				tags: ["全部", "精华", "分享", "问答", "招聘"],
				//transform: "translateX(0)",
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
			}
		},
		created() {
			let deviceWidth = Math.min(640, document.documentElement.clientWidth)

			document.documentElement.style.fontSize = `${deviceWidth / 6.4}px`

			// localStorage.setItem("info", JSON.stringify({
			// 	token: "509b6e94-53ae-495a-a08c-bba78fc1f5d7",
			// 	id: "5617694c2fb53d5b4f2329bd"
			// }))
		},
		watch: {
			mask() {
				// this.mask ? document.documentElement.classList.add("scroll-hide") : document.documentElement.classList.remove("scroll-hide")

				// this.mask ? document.body.classList.add("scroll-hide") : document.body.classList.remove("scroll-hide")
			}
		},
		computed: {
			selectHome() {
				return this.$route.path === "/"
			},
			selectMessage() {
				return this.$route.path === "/message"
			},
			selectProfile() {
				return this.$route.path.startsWith("/profile")
			}
		},
		events: {
			loaded() {
				this.loading = false
			},
			loading() {
				this.loading = true
			},
			showNav() {
				this.showNav = true
			},
			hideNav() {
				this.showNav = false
			},
			login(data) {
				this.user = data
			},
			reviseTitle(title) {
				this.$broadcast("aaa", title)
			},
			showSlideNav() {
				this.show = true

				document.body.classList.add("show")
			},
			hideSlideNav() {
				this.show = false

				document.body.classList.remove("show")
			},
			showSlide() {
				this.slide = true
			},
			closeLoading() {
				this.loading = false
			}
		},
		methods: {
			refresh() {
				//this.$route.path === "/" && alert(5555)
				this.$route.path === "/" ? this.$broadcast("refresh") : this.$route.router.go("/")
			},
			loginState() {
				let info = localStorage.getItem("user")

				return {
					state: !! info,
					data: JSON.parse(localStorage.getItem("user"))
				}
			},
			sureDirection(path, param) {
				let {state, data} = this.loginState()

				if (state) {
					param && (path = path + data[param])

					this.$route.router.go(path)

					return
				}

				if (! state) {
					this.$route.router.go(`/login?redirect=${path}`)
				}
			},
			goMessage() {
				this.sureDirection("/message")
			},
			goPost() {
				this.sureDirection("/post")
			},
			goProfile() {
				//let username = JSON.parse(localStorage.getItem("info")).username

				this.sureDirection("/profile/", "loginname")
			},
			showSlideNav() {
				this.mask = true

				this.transform = "translateX(3.88rem)"

				this.$broadcast("showSlideNav")
			},
			hideSlideNav() {
				this.mask = false

				this.transform = "translateX(0)"

				this.$broadcast("hideSlideNav")
			},
			goLogin() {
				this.slide = false
				//this.show = false
				this.$emit("hideSlideNav")

				this.$route.router.go("/login")
			},
			switchTag(index) {
				this.show = false

				this.loading = true

				document.body.classList.remove("show")

				this.$broadcast("hideSlideNav", index)
			}
		}
	}
</script>