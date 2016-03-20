var express = require("express")
var serve = require("serve-static")

var app = express()

//console.log(__dirname)
app.use(serve(__dirname))

app.listen(process.env.PORT || 8080)