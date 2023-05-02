import makeRequest from "./makeRequest"

/**
 * to get a single post with all related properties
 * @param {string} id 
 * @returns 
 */
async function getPostById(id) {
	console.log("id in getPost bedore", id)
	return makeRequest(`/posts/${id}`, { method: "GET" }).then(function (res) {
		return res
	}).catch(function (err) {
		return err
	})

}

export default getPostById