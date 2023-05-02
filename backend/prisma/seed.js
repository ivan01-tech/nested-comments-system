import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seed() {
	await prisma.user.deleteMany()
	await prisma.post.deleteMany()

	const ivan = await prisma.user.create({ data: { name: "Ivan01-tech", } })
	const sally = await prisma.user.create({ data: { name: "Sally" } })

	const post1 = await prisma.post.create({
		data: {
			title: "Post 1",
			body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod magni cupiditate earum doloresamet consectetur adipisicing elit. Quod magni cupiditate earum dolores"
		}
	})

	const post2 = await prisma.post.create({
		data: {
			title: "Post 2",
			body: "Lorem ipsum amet consectetur adipisicing elit. Quod magni cupiditate earum dolores dolor sit, amet consectetur adipisicing elit. Quod magni cupiditate earum dolores"
		}
	})

	const comment1 = await prisma.comment.create({
		data: {
			message: "I'm a comment !the first",
			userId: ivan.id,
			postId: post1.id
		}
	})

	const comment2 = await prisma.comment.create({
		data: {
			message: "I'm a comment !the second",
			userId: sally.id,
			postId: post1.id,
			parentId: comment1.id
		}
	})

	const comment3 = await prisma.comment.create({
		data: {
			message: "I'm a comment !the third",
			userId: sally.id,
			postId: post1.id,
			parentId: comment2.id
		}
	})

	const comment4 = await prisma.comment.create({
		data: {
			message: "I'am a comment !the third",
			userId: ivan.id,
			postId: post1.id,
			parentId: comment3.id
		}
	})

	const comment5 = await prisma.comment.create({
		data: {
			message: `I'am a comment $`,
			userId: sally.id,
			postId: post1.id,
			parentId: comment4.id
		}
	})
	const comment6 = await prisma.comment.create({
		data: {
			message: `I'am a comment 6`,
			userId: ivan.id,
			postId: post1.id,
			parentId: comment5.id
		}
	})


}

seed()