<style src="../css/message.css"></style>

<template>
	<ul class="message-list">
		<li v-for="item in items" v-text="item"></li>
	</ul>
	<loading :loading="loading"></loading>
</template>

<script>
	import loading from "./loading.vue"

	export default {
		data() {
			return {
				items: [],
				loading: true
			}
		},
		components: {
			loading
		}
	}
</script>