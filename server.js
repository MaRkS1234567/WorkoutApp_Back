import authRoutes from './app/auth/auth.routes.js'
import express from 'express'
import 'colors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { prisma } from './app/prisma.js'

dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'))
	}

	const PORT = process.env.PORT || 3000

	app.use(express.json())
	app.use('/api/auth', authRoutes)

	app.listen(
		PORT,
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
				.bold
		)
	)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
