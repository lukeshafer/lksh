import type { APIRoute } from 'astro'
import { createTransport } from 'nodemailer'
import { z } from 'zod'

const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } = import.meta.env

export const post: APIRoute = async ({ request }) => {
	//const data = await request.formData()
	const data = await request.text()
	console.debug('Request test:', data)
	const formSchema = z.object({
		name: z.string(),
		email: z.string(),
		message: z.string(),
		isSpam: z.boolean().nullable(),
	})

	const formResult = formSchema.safeParse(JSON.parse(data))
	if (!formResult.success)
		return new Response(JSON.stringify({ success: false }), {
			status: 400,
			statusText: 'Invalid input',
		})
	const { name, email, message, isSpam } = formResult.data

	// create reusable transporter object using the default SMTP transport
	let transporter = createTransport({
		host: SMTP_HOST,
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS,
		},
	})

	if (isSpam) {
		await transporter.sendMail({
			from: `"${name}" <${SMTP_FROM}>`, // sender address
			to: 'hello@lukeshafer.com', // list of receivers
			subject: `SPAM DETECTED FROM ${name}`, // Subject line
			text: `SPAM DECTECTED on lksh: Name: ${name}, Email: ${email}, Message: ${message}`,
		})
		return new Response(JSON.stringify({ success: true }), { status: 200 })
	}

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: `"${name}" <${SMTP_FROM}>`, // sender address
		to: 'hello@lukeshafer.com', // list of receivers
		subject: `Form Submission from ${name} on lksh.dev`, // Subject line
		text: `Name: ${name}, Email: ${email}, Message: ${message}`, // plain text body
		html: `
	<ul>
	<li>Name: ${name}</li>
	<li>Email: ${email || 'Not provided'}</li>
	<li>Message: <br>${message}</li>
	</ul>
	`, // html body
	})

	if (info.rejected.length > 0)
		return new Response(JSON.stringify({ success: false }), { status: 500 })
	else return new Response(JSON.stringify({ success: true }), { status: 200 })
}
