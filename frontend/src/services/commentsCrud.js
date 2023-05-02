import makeRequest from "./makeRequest"

/**
 * to create a single commment on a post
 * @param {*} param0 
 * @returns 
 */
export async function createComment({ parentId, postId, message }) {
	try {
		console.log({ message, parentId, postId });
		const res = await makeRequest(`posts/${postId}/comments`, {
			method: "POST",
			data: JSON.stringify({
				message,
			}),
			header: {
				"Access-Control-Allow-Origin": "*"
			},
		})
		return res
	} catch (err) {
		throw new Error(err)
	}
}

/**
 * to create a single commment on a post
 * @param {*} param0 
 * @returns 
 */
export async function replyComment({ parentId, postId, message }) {
	try {
		console.log({ message, parentId, postId });
		const res = await makeRequest(`posts/${postId}/comments`, {
			method: "POST",
			data: JSON.stringify({
				message, parentId
			}),
			header: {
				"Access-Control-Allow-Origin": "*"
			},
		})
		return res
	} catch (err) {
		throw new Error(err)
	}
}

/**
 * to update a single commment on a post
 * @param {*} param0 
 * @returns 
 */
export async function updateComment({ message, id }) {
	try {
		// console.log({ message, parentId, postId });
		const res = await makeRequest(`posts/comments/${id}`, {
			method: "PUT",
			data: JSON.stringify({ message }),
			header: { "Access-Control-Allow-Origin": "*" },
		})
		return res
	} catch (err) {
		throw new Error(err)
	}
}

/**
 * to delete a single commment on a post
 * @param {*} param0 
 * @returns 
 */
export async function deleteComment({ commentId, postId }) {
	try {
		const res = await makeRequest(`posts/${postId}/comments/${commentId}`, {
			// const res = await makeRequest(`posts/comments/delete`, {
			method: "DELETE",
			data: JSON.stringify({ commentId, postId }),
			// header: { "Access-Control-Allow-Origin": "*" },
		})
		return res
	} catch (err) {
		throw new Error(err)
	}
}

/**
 * //TODO to hanndle like on a comment :  the userId should be get with cookie
 * @param {*} param0 
 * @returns 
 */
export async function toogleLikeComment({ commentId, postId }) {
	try {
		const res = await makeRequest(`posts/${postId}/comments/${commentId}/toggleLike`, {
			method: "POST",
		})
		return res
	} catch (err) {
		throw new Error(err)
	}
}
