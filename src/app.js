require("./css/normalize.css")
require("./css/app.css")

import router from "./router"
import APP from "./app.vue"

router.start(APP, "#app")