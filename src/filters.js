export default {
	timeFormat(value) {
	let timestamp = + new Date - + new Date(value),
		year = ~~ (timestamp / (12 * 30 * 24 * 60 * 60 * 1000)),
		month = ~~ (timestamp / (30 * 24 * 60 * 60 * 1000)),
		day = ~~ (timestamp / (24 * 60 * 60 * 1000)),
		hour = ~~ (timestamp / (60 * 60 * 1000)),
		minute = ~~ (timestamp / (60 * 1000)),
		second = ~~ (timestamp / 1000)

	if (year) {
		return `${year} 年前`
	}

	if (month) {
		return `${month} 个月前`
	}

	if (day) {
		return `${day} 天前`
	}

	if (hour) {
		return `${hour} 小时前`
	}

	if (minute) {
		return `${minute} 分钟前`
	}

	if (second) {
		if (second && second < 10) {
			return "刚刚"
		}

		return `${second} 秒前`
	}

	//return `${~~ (timestamp / (30 * 24 * 60 * 60 * 1000))}个月前`

}
}