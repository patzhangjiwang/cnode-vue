import Vue from "Vue"
import Home from "./components/home.vue"
import Topic from "./components/topic.vue"
import Login from "./components/login.vue"
import Message from "./components/message.vue"
import Post from "./components/post.vue"
import Profile from "./components/profile.vue"
import Nickname from "./components/nickname.vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

var router = new VueRouter({
	history: true,
	saveScrollPosition: true
})

// router.map({
// 	"/": {
// 		name: "home",
// 		component: (resolve) => require(["./components/home.vue"], resolve)
// 	},
// 	"/topic/:topicId": {
// 		name: "topic",
// 		component: (resolve) => require(["./components/topic.vue"], resolve)
// 	},
// 	"/login": {
// 		name: "login",
// 		component: (resolve) => require(["./components/login.vue"], resolve)
// 	},
// 	"/message": {
// 		name: "message",
// 		component: (resolve) => require(["./components/message.vue"], resolve)
// 	},
// 	"/post": {
// 		name: "post",
// 		component: (resolve) => require(["./components/post.vue"], resolve)
// 	},
// 	"/profile/:username": {
// 		name: "profile",
// 		component: (resolve) => require(["./components/profile.vue"], resolve)
// 	}
// })

router.map({
	"/": {
		component: Home
	},
	"/topic/:topicId": {
		component: Topic
	},
	"/login": {
		component: Login
	},
	"/message": {
		component: Message
	},
	"/post": {
		component: Post
	},
	"/profile/:username": {
		component: Profile
	},
	"/profile/:username/nickname": {
		component: Nickname
	}
})

router.redirect({
	"*": "/"
})

export default router