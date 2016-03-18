export default {
	bind() {
		let time, startX, startY, endX, endY

		this.el.addEventListener("touchstart", (e) => {
			startX = e.touches[0].clientX
			startY = e.touches[0].clientY

			time = Date.now()
		})

		this.el.addEventListener("touchend", (e) => {
			endX = e.changedTouches[0].clientX
			endY = e.changedTouches[0].clientY

			if (Date.now() - time < 200 && Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6) {
				console.log(this.arg)
				this.arg ? this.vm[this.expression](this.arg) : this.vm[this.expression]()
				//this.vm[this.expression]()
			}
		})
	}
}