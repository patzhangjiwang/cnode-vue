<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created() {
			let deviceWidth = Math.min(640, document.documentElement.clientWidth)

			document.documentElement.style.fontSize = `${deviceWidth / 6.4}px`

			localStorage.setItem("info", JSON.stringify({
				token: "509b6e94-53ae-495a-a08c-bba78fc1f5d7",
				id: "5617694c2fb53d5b4f2329bd"
			}))
		}
	}
</script>