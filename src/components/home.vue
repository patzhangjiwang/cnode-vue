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
			<li class="item" v-for="item in list" :data-src="item.author.avatar_url" :data-id="item.id">
				<div class="item-user-bar">
					<!-- <img class="avatar" src="../images/loading.png"> -->
					<div class="avatar-cover" :class="{'avatar-loaded': itemss.includes(item.id)}" v-if="! item.lazy">
						<div class="avatar" :style="{backgroundImage: 'url(' + item.author.avatar_url + ')'}" transition="avatar" v-if="itemss.includes(item.id)"></div>
					</div>
					<div class="avatar-cover" :class="{'avatar-loaded': itemss.includes(item.id)}" v-if="item.lazy">
						<div class="avatar" :style="{backgroundImage: 'url(' + item.author.avatar_url + ')'}" v-if="itemss.includes(item.id)"></div>
					</div>
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
				$items: [],
				itemss: [],
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
					let data = JSON.parse(localStorage.getItem("list"))
					this.list = data.map((item) => {
						item.lazy = true

						return item
					})

					this.itemss = JSON.parse(localStorage.getItem("itemss"))

					this.$nextTick(() => {
						this.loading = false

						document.body.scrollTop = + localStorage.getItem("scrollTop")
						localStorage.removeItem("scrollTop")

						this.forLazy()
					})

					return
				}

				this.getList()
			},
			deactivate() {
				window.removeEventListener("scroll", this.scroll, false)

				localStorage.setItem("scrollTop", window.pageYOffset)
				localStorage.setItem("itemss", JSON.stringify(this.itemss))
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
			},
			hideSlideNav() {
				this.show = false

				document.body.classList.remove("show")
			}
		},
		methods: {
			async getList() {
				let data = await api.getList(this.page, this.tag)

				this.list = this.list.concat(data.data)

				this.locked = false
				this.loading = false

				this.forLazy()
				//this.$dispatch("loaded")

				// 存储数据
				localStorage.setItem("list", JSON.stringify(this.list))

				//this.transform = "translate(0, -0.3rem)"
			},
			forLazy() {
				this.$nextTick(() => {
					this.$items = Array.from(document.querySelectorAll(".item"), (v) => {
						// this.$imgs.push({
						// 	img: v,
						// 	position: v.getBoundingClientRect().top
						// })

						return {
							item: v,
							//img: v.querySelector(".avatar"),
							position: v.getBoundingClientRect().top
						}
					})

					this.lazy()
				})
			},
			lazy() {
				this.$items =  this.$items.filter((item) => {
					let top = item.item.getBoundingClientRect().top
					let height = item.item.getBoundingClientRect().height

					if (top >= 0 && top <= window.innerHeight + height) {
						//console.log(this.$itemss)

						this.itemss.push(item.item.dataset.id)
						item.item.removeAttribute("data-src")
						item.item.removeAttribute("data-id")

						// this.$nextTick(() => {
						// 	item.img.style.backgroundImage = `url(${item.item.dataset.src})`
						// })

						return false
					}

					return true
				})

				console.log(this.$items.length)
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
				this.$items.length && this.lazy()

				document.body.scrollTop >= 500 && (this.scrollTop = true)

				document.body.scrollTop < 500 && (this.scrollTop = false)

				// 滚动加载
				if (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) >= 0.7) {
					 if (! this.locked) {
					 	this.locked = true;

					 	this.loadMore()
					 }
				}
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