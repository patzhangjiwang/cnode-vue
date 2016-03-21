var express = require("express")
var mime = require("mime")
var app = express()
var path = require("path")
var fs = require("fs")

app.get("*", (req, res) => {
	var paths = path.join(__dirname, req.path)

	if (req.path === "/") {
		res.set("html")
		fs.createReadStream("./index.html").pipe(res)

		return
	}

	fs.exists(paths, (exists) => {
		if (exists) {
			res.set({
				"Content-Type": mime.lookup(paths)
			})
			fs.createReadStream(paths).pipe(res)

			return
		}

		if (! exists) {
			res.set("html")
			fs.createReadStream("./index.html").pipe(res)
		}
	})
})

app.listen(process.env.PORT || 8080)