<template>
	<div>
		<router-view :user="user"></router-view>
		<nav class="nav" v-if="showNav">
			<div class="nav-btn" @click="refresh">
				<i class="iconfont">&#xe62d;</i>
				首页
			</div>
			<a class="nav-btn" v-link="{path: '/message'}">
				<i class="iconfont">&#xe640;</i>
				消息
			</a>
			<a class="nav-btn add-btn" v-link="{path: 'post'}">
				<i class="iconfont">&#xe6b9;</i>
			</a>
			<div class="nav-btn">
				<i class="iconfont">&#xe6ac;</i>
				发现
			</div>
			<!-- <div class="nav-btn" @click="goUser">
				<i class="iconfont">&#xe6b8;</i>
				我
			</div> -->
			<a class="nav-btn" v-link="{path: '/profile/' + user.loginname}">
				<i class="iconfont">&#xe6b8;</i>
				我
			</a>
		</nav>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showNav: true,
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
		events: {
			showNav() {
				this.showNav = true
			},
			hideNav() {
				this.showNav = false
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
			goUser() {
				//let username = JSON.parse(localStorage.getItem("info")).username

				this.sureDirection("/profile/", "loginname")
			}
		}
	}
</script>