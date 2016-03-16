<template>
	<ul class="message-list">
		<li class="mg-item" v-for="item in items">
			<a v-text="item" v-link="{path: $index === 0 ? '/message/unread' : '/message/read'}"></a>
			<span class="arrow"></span>
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