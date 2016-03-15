<template>
	<ul class="message-list">
		<li v-for="item in items">
			<a v-text="item" v-link="{path: $index === 0 ? '/message/unread' : '/message/read'}"></a>
		</li>
	</ul>
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