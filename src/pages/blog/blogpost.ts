import { z } from 'zod'

const frontmatterSchema = z.object({
	title: z.string(),
	datePublished: z.string().regex(/[0-9]{4}(-[0-9]{1,2}){2}/g),
	author: z.string(),
	authorLink: z.string(),
	description: z.string(),
})

export const validateFrontmatter = frontmatterSchema.safeParse
