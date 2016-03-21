var express = require("express")
var app = express()
var path = require("path")
var fs = require("fs")

app.get("*", (req, res) => {
	var paths = path.join(__dirname, req.path)

	if (req.path === "/") {
		fs.createReadStream("./index.html").pipe(res)

		return
	}

	fs.exists(paths, (exists) => {
		if (exists) {
			fs.createReadStream(paths).pipe(res)

			return
		}

		if (! exists) {
			fs.createReadStream("./index.html").pipe(res)
		}
	})
})

app.listen(process.env.PORT || 8080)