import axios from "axios"

const url = import.meta.env.VITE_SERVER_URL
console.log("url : ", url)

const api = axios.create({
	baseURL: url,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
})

export default api