import cors from "cors"
import express from "express"
import { config } from "dotenv"
import { PrismaClient } from "@prisma/client"
import corsOptions from "./cors.js"
config()

const COMMENT_EXPORT_PROPS = {
	id: true,
	message: true,
	updatedAt: true,
	createAt: true,
	parentId: true,
	user: {
		select: { id: true, name: true }
	}
}

const prisma = new PrismaClient()
const PORT = process.env.PORT || 3500
const app = express()

/**
 * //TODO for now every comment will have it as a username
 */
const USER_NAME = "Ivan01-tech"
let currentUser

(async function () {
	const user = await prisma.user.findFirst({
		where: {
			name: USER_NAME
		}
	})
	currentUser = user.id
	console.log("cur : ", currentUser);
})()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cors
app.use(cors(corsOptions))
app.use(function (req, res, next) {
	console.log("cookies : ", req.cookies)
	next()
})
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)
	next()
})

app.get("/posts", async function (req, res) {
	try {
		console.log("hitted")
		const data = await prisma.post.findMany()
		if (data.length == 0) {
			return res.status(404).json({ message: "Comments Not Found ! " })
		}
		console.log("data : ", data)

		res.clearCookie("userId")

		res.cookie("userId", currentUser)
		return res.json(data)
	} catch (err) {
		console.log("err : ", err);
		return res.status(500).json({ message: "something went wrong !" })
	}
})

app.get("/posts/:id", async function (req, res) {
	try {
		const { id } = req.params
		// res.setHeader("Access-Control-Allow-Origin", "*")

		const data = await prisma.post.findUnique({
			where: { id },
			select: {
				title: true,
				body: true,
				comments: {
					orderBy: {
						createAt: "desc"
					},
					select: {
						...COMMENT_EXPORT_PROPS,
						// to select all likes for the current comment : 
						_count: { select: { likes: true } },
					}
				}
			}
		})//TODO come back here
			.then(async post => {
				// to find all comment that we like and which appear on this comment
				const likes = await prisma.like.findMany({
					where: {
						userId: currentUser,
						commentId: { in: post.comments.map(com => com.id) }
					}
				})
				return {
					...post,
					comments: post.comments.map(comment => {
						const { _count, ...rest } = comment
						return {
							...rest,
							likesCount: _count.likes,
							likeByMe: Boolean(likes.find(prev => prev.commentId == comment.id))
						}
					})
				}

			})
		console.log("data : ", data)
		if (!data) return res.status(404).json({ message: "Not found !" })

		return res.json(data)

	} catch (err) {
		console.log("err : ", err);
		return res.status(500).json({ message: "something went wrong !" })
	}
})

app.post("/posts/:id/comments", async (req, res) => {
	try {
		const { id } = req.params
		const { message, parentId } = req.body

		console.log("mes : ", req.body);
		// console.log("id : ", id);

		if (!Boolean(message)) {
			return res.status(403).json({ message: "message is required" })
		}
		const currentPost = await prisma.post.findUnique({
			where: {
				id
			}
		})

		// console.log("post : ", currentPost);

		if (!currentPost) {
			return res.status(404).json({ message: "post not found !" })
		}

		const comment = await prisma.comment.create({
			data: {
				message,
				userId: currentUser,
				postId: id,
				parentId: parentId || null
			},
			select: COMMENT_EXPORT_PROPS
		})
			.then(com => {
				return {
					...com,
					likeByMe: false,
					likesCount: 0
				}
			})

		console.log("com1 : ", comment);

		return res.json(comment)
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong !" })
	}
})

app.post("/posts/:postId/comments/:commentId/toggleLike", async function (req, res) {
	try {
		const { postId, commentId } = req.params
		// TODO with  check the cuurentID with cookie
		const data = {
			userId: currentUser, commentId
		}

		const like = await prisma.like.findUnique({
			where: { userId_commentId: data },
		})

		console.log("like : ", like)

		if (like) {
			await prisma.like.delete({ where: { userId_commentId: data } })
			return res.json({
				addLike: false
			})
		} else {
			await prisma.like.create({ data })
			return res.json({ addLike: true })
		}

	} catch (err) {
		return res.status(500).json({ message: "Something went wrong !" })
	}
})

app.delete("/posts/:id/comments/:commentId", async (req, res) => {
	try {
		const { id: postId, commentId: cmtId } = req.params
		// const { postId, commentId: cmtId } = req.params
		const { commentId: sendId, postId: post } = req.body

		console.log(postId, cmtId, sendId, post)

		if (sendId !== cmtId) {
			return res.status(403).json({ message: "The given Ids does not match !" })
		}

		const comment = await prisma.comment.findUnique({
			where: { id: sendId }, select: {
				parentId: true, id: true, userId: true
			}
		})
		console.log("comment : ", comment, currentUser)

		if (!comment) {
			return res.status(404).json({ message: "comment not found" })
		}

		// TODO set it correctly
		if (comment.userId !== currentUser) {
			return res.status(403).json({ message: "you do not have permission to delete this post" })
		}

		return res.json({ commentId: comment.id })

	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "something went wrong !" })
	}

})

app.put("/posts/comments/:id", async (req, res) => {
	try {
		const { id } = req.params
		const { message } = req.body

		console.log("mes : ", req.body);

		if (!Boolean(message)) {
			return res.status(403).json({ message: "message is required" })
		}

		// TODO check the user who is update it first

		const currentComment = await prisma.comment.findUnique({
			where: { id }
		})

		console.log("post : ", currentComment);

		if (!currentComment?.id) {
			return res.status(404).json({ message: "Comment not Found !" })
		}

		const comment = await prisma.comment.update({
			where: { id },
			data: { message },
			select: COMMENT_EXPORT_PROPS
		})

		// TODO set it correctly
		if (comment.user.id != currentUser) {
			return res.status(403).json({ message: "You do not have permission to update this post" })
		}

		console.log("com : ", comment);

		return res.json(comment)
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong !" })
	}
})

app.all("*", function (req, res) {
	if (req.accepts("json")) {
		console.log("here ago")
		return res.status(404).json({ "message": "Not found !" })
	}
	else return res.send(`Not found !`)
})

app.listen(PORT, function () {
	console.log("Server up and running on port : ", PORT);
})
