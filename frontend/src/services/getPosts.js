import makeRequest from "./makeRequest";

export async function getPosts() {
	return makeRequest("/posts", { method: "GET" })
		.then(res => res)
		.catch(err => err)
}