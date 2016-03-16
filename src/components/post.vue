<style src="../css/post.css"></style>

<template>
	<header class="header topic-hd">
		<h2 class="title">发表</h2>
	</header>
	<ul class="post-list">
		<li class="post-item">
			<input type="text" placeholder="表做标题党啊" v-model="title" />
		</li>
		<li class="post-item">选择一个标签</li>
	</ul>
	<div class="post-container">
		<textarea class="post-content" placeholder="这一刻的想法..." v-model="content"></textarea>
		<p v-if="count">
			已输入
			<span v-text="count"></span>
			字
		</p>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				title: "",
				tag: "ask",
				content: "",
				count: 0
			}
		},
		route: {
			canActivate(transition) {
				if (! localStorage.getItem("user")) {
					transition.redirect("/login?redirect=/post")
					return false
				}

				return true
			},
			activate() {
				this.$dispatch("addBgClass")
			},
			deactivate(transition) {
				this.$dispatch("removeBgClass")

				transition.next()
			}
		}
	}
</script>