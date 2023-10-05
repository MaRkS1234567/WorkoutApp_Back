// @desc Get exercise profile
// @route POST /api/exercise
// @access Private

import { prisma } from '../prisma.js'
import asyncHandler from 'express-async-handler'

export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body

	const exercise = await prisma.exercise.create({
		data: {
			name,
			times,
			iconPath
		}
	})

	res.json(exercise)
})

// @desc Update exercises
// @route PUT /api/exercises/:id
// @access Private
export const updateExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body

	try {
		const exercise = await prisma.exercise.update({
			where: {
				id: Number(req.params.id)
			},
			data: {
				name,
				times,
				iconPath
			}
		})

		res.json(exercise)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})

// @desc Delete exercises
// @route DELETE /api/exercises/:id
// @access Private
export const deleteExercise = asyncHandler(async (req, res) => {
	try {
		const exercise = await prisma.exercise.delete({
			where: {
				id: Number(req.params.id)
			}
		})

		res.json({ message: 'Exercise deleted' })
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})

// @desc Get exercises
// @route Get /api/exercises
// @access Private

export const getExercises = asyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})

	res.json(exercises)
})
