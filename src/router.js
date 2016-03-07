import Vue from "vue"
import Home from "./components/home.vue"
import Topic from "./components/topic.vue"
import Login from "./components/login.vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

var router = new VueRouter({
	history: true,
	saveScrollPosition: true
})

router.map({
	"/": {
		component: Home
	},
	"/topic/:topicId": {
		component: Topic
	},
	"/login": {
		component: Login
	}
})

router.redirect({
	"*": "/"
})

export default router