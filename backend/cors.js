import dot from "dotenv"
dot.config()
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000"]
console.log(allowedOrigins)
/**
 * 
 */
const corsOptions = {
	origin(ori, callback) {
		console.log("ori : ", ori);
		if (allowedOrigins.indexOf(ori) !== -1 || !ori) {
			callback(null, true)
		} else
			callback(new Error("Not Allowed by CORS"))
	},
	optionsSuccessStatus: 200,
	credentials: true,
}

export default corsOptions