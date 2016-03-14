<template>
	<div class="tips" v-text="errorMessage" transition="tips" v-if="errorMessage"></div>
</template>

<script>
	export default {
		props: ["errorMessage"]
	}
</script>