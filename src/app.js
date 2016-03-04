require("./css/normalize.css")
require("./css/app.css")

// import Vue from "vue"
// import APP from "./app.vue"

// var app = new Vue(APP).$mount("#app")

import router from "./router"
import APP from "./app.vue"

router.start(APP, "#app")