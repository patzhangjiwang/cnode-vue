<style src="../css/message.css"></style>

<template>
	<header class="header topic-hd">
		<h2 class="title">消息</h2>
	</header>
	<router-view></router-view>
</template>

<script>
	export default {
		data() {
			return {
				items: ["未读消息", "已读消息"]
			}
		}
	}
</script>