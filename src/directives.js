export default {
	//isFn: true,
	acceptStatement: true,
	update(value) {
		//console.log(value)
		//console.log(typeof value)
		//console.log(this.expression)
		let time, startX, startY, endX, endY

		let flags = /iPhone|Android/gi
		let mobile = navigator.userAgent.match(flags)

		if (! mobile) {
			this.el.addEventListener("click", value, false)
			//console.log(11111)

			return
		}

		this.el.addEventListener("touchstart", (e) => {
			startX = e.touches[0].clientX
			startY = e.touches[0].clientY

			time = Date.now()
		}, false)

		this.el.addEventListener("touchend", (e) => {
			endX = e.changedTouches[0].clientX
			endY = e.changedTouches[0].clientY

			if (Date.now() - time < 200 && Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6) {
				//console.log(this.expression)
				value()
				//this.arg ? this.vm[this.expression](this.el.dataset[this.arg]) : this.vm[this.expression]()
				//this.vm[this.expression]()
			}

			// 阻止默认动作 防止误点
			e.preventDefault()
		}, false)
	}
}