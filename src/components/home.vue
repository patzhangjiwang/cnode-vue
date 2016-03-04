<style src="../css/home.css"></style>

<template>
	<header>
		<div class="nav-btn-wrap">
			<div class="nav-btn"></div>
		</div>
		<h2 class="title" v-text="title"></h2>
		<div class="login-btn"></div>
	</header>
	<section class="side-nav"></section>
	<div class="page">
		<div class="loading" v-if="! loading"></div>
		<ul v-if="loading">
			<li class="item" v-for="item in list">
				<div class="item-cate" :style="{color: cates[item.tab] ? cates[item.tab].color : 'teal'}" v-text="cates[item.tab] ? cates[item.tab].text : '暂无'"></div>
				<a class="item-detail" v-link="{path: '/topic/' + item.id}">
					<img class="avatar" :src="item.author.avatar_url">
					<div>
						<h4 v-text="item.title"></h4>
						<span class="nickname" v-text="item.author.loginname"></span>
					</div>
				</a>
				<div class="reply-count" v-text="item.visit_count | format"></div>
			</li>
		</ul>
		<div class="load-more" @click="loadMore" v-if="loading">查看更多</div>
	</div>
	<div class="back-top" @click="backTop" v-if="scrollTop"></div>
</template>

<script>
	import api from "../api"

	export default {
		data() {
			return {
				title: "全部",
				//loading: true,
				tag: "all",
				page: 1,
				scrollTop: false,
				//locked: false,
				list: [],
				cates: {
					share: {
						text: "分享",
						color: "#1ABC9C"
					},
					job: {
						text: "招聘",
						color: "#9B59B6"
					},
					ask: {
						text: "问答",
						color: "#3498DB"
					},
					good: {
						text: "精华",
						color: "#E67E22"
					}
				},
				tags: ["全部", "精华", "分享", "问答", "招聘"]
			}
		},
		created() {
			this.getList()
		},
		computed: {
			loading() {
				return !! this.list.length
			}
		},
		filters: {
			format(value) {
				return value > 100 ?  `${(value / 1000).toFixed(1)}k` : value
			}
		},
		methods: {
			async getList() {
				let data = await api.getList(this.page, this.tag)

				this.list = this.list.concat(data.data)
			},
			loadMore() {
				this.page++

				this.getList()
			},
			scroll() {
				document.body.scrollTop >= 500 && (this.scrollTop = true)

				document.body.scrollTop < 500 && (this.scrollTop = false)
			},
			backTop() {
				document.body.scrollTop = 0
				//requestAnimationFrame(this.backTop)
			}
		},
		ready() {
			window.addEventListener("scroll", this.scroll, false)
		}
	}
</script>