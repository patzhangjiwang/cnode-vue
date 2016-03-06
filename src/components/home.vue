<style src="../css/home.css"></style>

<template>
	<header>
		<h2 class="title">
			<span class="select-bar" v-text="title" @click="selectTag"></span>
		</h2>
		<a href="https://github.com/ihanyang/cnode-vue" class="github-icon" target="_blank"></a>
	</header>
	<div class="container">
		<!-- <div class="loading" v-if="! loading"></div> -->
		<div class="loading-wrap loading-list" v-if="! loading">
			<div class="loading">正在加载 客官骚等哈~~</div>
		</div>
		<ul v-if="loading">
			<li class="item" v-for="item in list">
				<!-- <div class="item-cate" :style="{color: cates[item.tab] ? cates[item.tab].color : 'teal'}" v-text="cates[item.tab] ? cates[item.tab].text : '暂无'"></div>
				<a class="item-detail" v-link="{path: '/topic/' + item.id}">
					<img class="avatar" :src="item.author.avatar_url">
					<div>
						<h4 v-text="item.title"></h4>
						<span class="nickname" v-text="item.author.loginname"></span>
					</div>
				</a>
				<div class="reply-count" v-text="item.visit_count | format"></div> -->

				<div class="item-user-bar">
					<img class="avatar" :src="item.author.avatar_url">
					<div class="item-detail">
						<span class="username" :data-label="'置顶'" v-text="item.author.loginname" v-if="item.top"></span>
						<span class="username" :data-label="'精华'" v-text="item.author.loginname" v-if="item.good && ! item.top"></span>
						<span class="username" :data-label="item.tab | textFormat" v-text="item.author.loginname" v-if="! item.good && ! item.top && item.tab"></span>
						<!-- <span></span> -->
						<p class="item-time" v-text="item.create_at | timeFormat"></p>
					</div>
				</div>
				<div class="item-content">
					<a class="item-link" v-link="{path: '/topic/' + item.id}">
						<p class="item-content-title" v-text="item.title"></p>
						<div class="item-content-img" :class="{'img-layout-1': 1 < 2, 'img-layout-2': 22 < 3, 'img-layout-3': 32 < 4}">
							<!-- <img :src="item.img"> -->
							<!-- <img src="http://dn-cnode.qbox.me/Fr36jZOkRHMqzvzlhTBg4znH3kIG">
							<img src="http://dn-cnode.qbox.me/FlBqgBTXyCuiwGAjZN_HH0BU8-z6">
							<img src="http://dn-cnode.qbox.me/FkZjTOLKfYlWbZN6s1VNHUS2Emkq"> -->
							<!-- <template v-if="1 < 2">
								<img src="http://dn-cnode.qbox.me/FlBqgBTXyCuiwGAjZN_HH0BU8-z6" width="135" height="180">
							</template> -->
						</div>
					</a>
				</div>
				<div class="item-btn-wrap">
					<div class="btn visit-btn">
						<span>
							<i class="iconfont">&#xe767;</i>
							{{item.visit_count}}
						</span>
					</div>
					<div class="btn reply-btn">
						<a v-link="{path: '/topic/' + item.id}">
							<span>
								<i class="iconfont">&#xe744;</i>
								{{item.reply_count}}
							</span>
						</a>
					</div>
					<div class="btn share_btn">
						<i class="iconfont">&#xe739;</i>
						分享
					</div>
				</div>
			</li>
		</ul>
		<div class="loading-wrap" v-if="locked">
			<div class="loading">正在加载 客官骚等哈~~</div>
		</div>
	</div>
	<nav class="nav">
		<div class="nav-btn">
			<i class="iconfont">&#xe62d;</i>
			首页
		</div>
		<a class="nav-btn" href="#">
			<i class="iconfont">&#xe640;</i>
			消息
		</a>
		<div class="nav-btn add-btn">
			<i class="iconfont">&#xe6b9;</i>
		</div>
		<a class="nav-btn" href="#">
			<i class="iconfont">&#xe6ac;</i>
			发现
		</a>
		<a class="nav-btn" href="#">
			<i class="iconfont">&#xe6b8;</i>
			我
		</a>
	</nav>
	<div class="pop" :style="{height: height}" v-if="pop">
		<ul class="tag-list">
			<li v-for="tag in tags" v-text="tag"></li>
		</ul>
	</div>
	<div class="back-top" @click="backTop" v-if="scrollTop"></div>
</template>

<script>
	import api from "../api"
	import filters from "../filters"

	export default {
		data() {
			return {
				title: "泰山小霸王",
				//loading: true,
				tag: "all",
				page: 1,
				scrollTop: false,
				locked: false,
				pop: false,
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
		route: {
			deactivate() {
				window.removeEventListener("scroll", this.scroll, false)
			}
		},
		created() {
			this.getList()
		},
		computed: {
			loading() {
				return !! this.list.length
			},
			height() {
				return window.innerHeight + "px"
			}
		},
		filters: {
			format(value) {
				return value > 100 ?  `${(value / 1000).toFixed(1)}k` : value
			},
			timeFormat(value) {
				return filters.timeFormat(value)
			},
			textFormat(value) {
				let str,
					map = {
						// good: 1,
						share: 2,
						ask: 3,
						job: 4
					}

					str = this.tags[map[value]]

				return str
			}
		},
		methods: {
			async getList() {
				let data = await api.getList(this.page, this.tag)

				this.list = this.list.concat(data.data)

				this.locked = false
			},
			selectTag() {
				this.pop = true
			},
			loadMore() {
				this.page++

				this.getList()
			},
			scroll() {
				document.body.scrollTop >= 500 && (this.scrollTop = true)

				document.body.scrollTop < 500 && (this.scrollTop = false)

				// 滚动加载
				if (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) >= 0.6) {
					 if (! this.locked) {
					 	this.locked = true;

					 	this.loadMore()

					// 	this.getList();

					// 	this.loadCount++;
					 }
					//console.log(534523423)
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