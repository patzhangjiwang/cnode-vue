<template>
	<div class="modal-mask" v-if="show" transition="modal" @click="close"></div>
</template>

<script>
	export default {
		props: ["show"],
		data() {
			return {

			}
		},
		methods: {
			close() {
				this.show = false
			}
		}
	}
</script>