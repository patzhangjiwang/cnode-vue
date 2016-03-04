import promise from "es6-promise"
import "whatwg-fetch"

export default {
	async getList(page, tag) {
		var response = await fetch(`https://cnodejs.org/api/v1/topics?page=${page}&limit=30&tab=${tag}`, {
			//credentials: "include",
			mode: "cors",
			headers: {
				"X-Requested-With": "XMLHttpRequest"
			}
		}).catch((error) => {
			console.log(error)
		})
		
		return await response.json().catch((error) => {
			console.log(error)
		})
	},
	async getTopic(topicId) {
		var response = await fetch(`https://cnodejs.org/api/v1/topic/${topicId}`, {
			//credentials: "include",
			mode: "cors",
			headers: {
				"X-Requested-With": "XMLHttpRequest"
			}
		}).catch((error) => {
			console.log(error)
		})
		
		return await response.json().catch((error) => {
			console.log(error)
		})
	}
}