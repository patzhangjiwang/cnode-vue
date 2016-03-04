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
		}
	}
</script>