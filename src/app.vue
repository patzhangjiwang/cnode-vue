<template>
	<div :class="{show: show}">
		<router-view></router-view>
		<tips :message.sync="message"></tips>
	</div>
</template>

<script>
	import tips from "./components/tips.vue"

	export default {
		data() {
			return {
				tag: "全部",
				show: false,
				//loading: false,
				slide: false,
				//transform: "translateX(0)",
				message: "",
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
			}
		},
		components: {
			tips
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
			closeLoading() {
				this.loading = false
			},
			tailChanged(message) {
				this.message = message
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
			}
		}
	}
</script>