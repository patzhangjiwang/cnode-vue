<template>
	<div>
		<router-view></router-view>
		<nav class="nav" v-if="showNav">
			<div class="nav-btn" @click="refresh">
				<i class="iconfont">&#xe62d;</i>
				首页
			</div>
			<a class="nav-btn" href="#">
				<i class="iconfont">&#xe640;</i>
				消息
			</a>
			<div class="nav-btn add-btn">
				<i class="iconfont">&#xe6b9;</i>
			</div>
			<a class="nav-btn" href="#">
				<i class="iconfont">&#xe6ac;</i>
				发现
			</a>
			<a class="nav-btn" href="#">
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
				showNav: true
			}
		},
		created() {
			let deviceWidth = Math.min(640, document.documentElement.clientWidth)

			document.documentElement.style.fontSize = `${deviceWidth / 6.4}px`

			localStorage.setItem("info", JSON.stringify({
				token: "509b6e94-53ae-495a-a08c-bba78fc1f5d7",
				id: "5617694c2fb53d5b4f2329bd"
			}))
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
				this.$route.path === "/" ? this.$broadcast("refresh") : this.$route.router.go("/")
			}
		}
	}
</script>