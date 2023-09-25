// @desc Get user profile
// @route GET /api/users/profile
// @access Private

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'
import asyncHandler from 'express-async-handler'

export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: UserFields
	})

	res.json(user)
})
