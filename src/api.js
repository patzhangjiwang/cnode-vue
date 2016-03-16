import promise from "es6-promise"
import "whatwg-fetch"

export let getList = async (page, tag) => {
	let response = await fetch(`https://cnodejs.org/api/v1/topics?page=${page}&limit=20&tab=${tag}`, {
		//credentials: "include",
		mode: "cors"
		// headers: {
		// 	"X-Requested-With": "XMLHttpRequest"
		// }
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let getTopic = async (topicId) => {
	let response = await fetch(`https://cnodejs.org/api/v1/topic/${topicId}`, {
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

export let login = async (token) => {
	let response = await fetch(`https://cnodejs.org/api/v1/accesstoken `, {
		//credentials: "include",
		method: "POST",
		mode: "cors",
		headers: {
			//"X-Requested-With": "XMLHttpRequest",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: `accesstoken=${token}`
	}).catch((error) => {
		console.log(error)
		console.log(42423)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let like = async (id, token) => {
	let response = await fetch(`https://cnodejs.org/api/v1/reply/${id}/ups`, {
		//credentials: "include",
		method: "POST",
		mode: "cors",
		headers: {
			"X-Requested-With": "XMLHttpRequest",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: `accesstoken=${token}`
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let reply = async (token, topicId, content, replyId) => {
	let body = replyId ? `accesstoken=${token}&content=${content}&reply_id=${replyId}` : `accesstoken=${token}&content=${content}`
	let response = await fetch(`https://cnodejs.org/api/v1/topic/${topicId}/replies`, {
		//credentials: "include",
		method: "POST",
		mode: "cors",
		headers: {
			"X-Requested-With": "XMLHttpRequest",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: body
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let getProfile = async (nickname) => {
	let response = await fetch(`https://cnodejs.org/api/v1/user/${nickname}`, {
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

export let getMessages = async (token) => {
	let response = await fetch(`https://cnodejs.org/api/v1/messages?accesstoken=${token}`, {
		//credentials: "include",
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}

export let getMessageCount = async (token) => {
	let response = await fetch(`https://cnodejs.org/api/v1/message/count?accesstoken=${token}`, {
		//credentials: "include",
		mode: "cors"
	}).catch((error) => {
		console.log(error)
	})

	return await response.json().catch((error) => {
		console.log(error)
	})
}