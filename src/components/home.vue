<style src="../css/home.css"></style>

<template>
	<header class="header" :class="{show: show}">
		<div class="side-btn-wrap" @click="showSlideNav">
			<div class="side-btn"></div>
		</div>
		<h1 class="title" v-text="tagText"></h1>
		<div class="post-btn">发表</div>
	</header>
	<div class="container" :class="{show: show}">
		<ul>
			<li class="item" v-for="item in list">
				<div class="item-user-bar">
					<img class="avatar" src="../images/loading.png" :data-src="item.author.avatar_url">
					<div class="item-detail">
						<span class="username" v-text="item.author.loginname"></span>
						<span class="label" v-if="item.top">置顶</span>
						<span class="label" v-if="item.good">精华</span>
						<span class="label" v-text="item.tab | textFormat"></span>
						<p class="item-time" v-text="item.create_at | timeFormat"></p>
					</div>
				</div>
				<div class="item-content">
					<a class="item-link" v-link="{path: '/topic/' + item.id}">
						<p class="item-content-title" v-text="item.title"></p>
					</a>
				</div>
				<div class="item-btn-wrap">
					<div class="btn visit-btn">
						<span>
							<i class="iconfont">&#xe69d;</i>
							{{item.visit_count}}
						</span>
					</div>
					<div class="btn reply-btn">
						<a v-link="{path: '/topic/' + item.id}">
							<span>
								<i class="iconfont">&#xf0217;</i>
								{{item.reply_count}}
							</span>
						</a>
					</div>
					<div class="btn share_btn">
						<i class="iconfont">&#xf01ba;</i>
						分享
					</div>
				</div>
			</li>
		</ul>
		<div class="loading-wrap" v-if="locked">
			<div class="loading-text">(´・ω・｀)正在加载...</div>
		</div>
	</div>
	<slide :show.sync="show"></slide>
	<loading :loading="loading"></loading>
	<div class="mask" v-if="show" @click="hideSlideNav"></div>
	<div class="back-top" @click="backTop" v-if="scrollTop">
		<i class="iconfont">&#xe758;</i>
	</div>
</template>

<script>
	import api from "../api"
	import filters from "../filters"
	import loading from "./loading.vue"
	import slide from "./slide.vue"

	export default {
		data() {
			return {
				page: 1,
				scrollTop: false,
				locked: false,
				loading: true,
				show: false,
				list: [],
				$imgs: [],
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
				tags: [
					{
						tag: "all",
						text: "全部"
					},
					{
						tag: "good",
						text: "精华"
					},
					{
						tag: "share",
						text: "分享"
					},
					{
						tag: "ask",
						text: "问答"
					},
					{
						tag: "job",
						text: "招聘"
					}
				],
				tag: localStorage.getItem("tag") ? localStorage.getItem("tag") : "all",
				tagText: localStorage.getItem("tagText") ? localStorage.getItem("tagText") : "全部"
			}
		},
		route: {
			data(transition) {
				if (transition.from.name === "topic") {
					this.list = JSON.parse(localStorage.getItem("list"))

					this.$nextTick(() => {
						this.loading = false

						document.body.scrollTop = + localStorage.getItem("scrollTop")
						localStorage.removeItem("scrollTop")
					})

					return
				}

				this.getList()
			},
			deactivate() {
				window.removeEventListener("scroll", this.scroll, false)

				localStorage.setItem("scrollTop", window.pageYOffset)
			}
		},
		components: {
			slide,
			loading
		},
		computed: {
			height() {
				return window.innerHeight + "px"
			}
		},
		filters: {
			timeFormat(value) {
				return filters.timeFormat(value)
			},
			textFormat(value) {
				let str,
					map = {
						share: 2,
						ask: 3,
						job: 4
					}

				if (! value) {
					return "暂无"
				}

				str = this.tags[map[value]].text

				return str
			}
		},
		events: {
			switchTag(index) {
				this.tag = this.tags[index].tag
				this.tagText = this.tags[index].text

				this.page = 1
				this.list = []

				this.getList()

				localStorage.setItem("tag", this.tag)
				localStorage.setItem("tagText", this.tagText)
			}
		},
		methods: {
			async getList() {
				let data = await api.getList(this.page, this.tag)

				this.list = this.list.concat(data.data)

				this.locked = false
				this.loading = false

				this.$nextTick(() => {
					this.$imgs = Array.from(document.querySelectorAll(".avatar"), (v) => {
						// this.$imgs.push({
						// 	img: v,
						// 	position: v.getBoundingClientRect().top
						// })

						return {
							img: v,
							position: v.getBoundingClientRect().top
						}
					})

					this.lazy()
				})

				//this.$dispatch("loaded")

				// 存储数据
				localStorage.setItem("list", JSON.stringify(this.list))

				//this.transform = "translate(0, -0.3rem)"
			},
			lazy() {
				this.$imgs =  this.$imgs.filter((img) => {
					let top = img.img.getBoundingClientRect().top
					let height = img.img.getBoundingClientRect().height

					if (top >= 0 && top <= window.innerHeight - height) {
						//console.log(top)
						img.img.src = img.img.dataset.src

						return false
					}

					return true
				})

				console.log(this.$imgs.length)
			},
			showSlideNav() {
				this.show = true

				document.body.classList.add("show")
			},
			hideSlideNav() {
				this.show = false

				document.body.classList.remove("show")
				//this.$dispatch("hideSlideNav")
			},
			loadMore() {
				this.page++

				this.getList()
			},
			scroll() {
				this.$imgs.length && this.lazy()

				document.body.scrollTop >= 500 && (this.scrollTop = true)

				document.body.scrollTop < 500 && (this.scrollTop = false)

				// 滚动加载
				// if (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) >= 0.7) {
				// 	 if (! this.locked) {
				// 	 	this.locked = true;

				// 	 	this.loadMore()
				// 	 }
				// }
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