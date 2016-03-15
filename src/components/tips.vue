<template>
	<div class="tips" v-text="message" transition="tips" v-if="message"></div>
</template>

<script>
	export default {
		props: ["message"],
		watch: {
			message() {
				setTimeout(() => {
					this.message = ""
				}, 2000)
			}
		}
	}
</script>