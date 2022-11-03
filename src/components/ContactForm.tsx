import { createSignal, Show } from 'solid-js'
import { z } from 'zod'

export const ContactForm = () => {
	const [isSubmitted, setIsSubmitted] = createSignal(false)
	const [errorMessage, setErrorMessage] = createSignal('')

	const submitForm = async (form: HTMLFormElement & EventTarget) => {
		const formSchema = z.object({
			userName: z.object({
				value: z.string().min(1),
			}),
			email: z.object({
				value: z.string().email(),
			}),
			message: z.object({
				value: z.string().min(1),
			}),
			agreement: z.object({
				value: z.string().nullable(),
			}),
		})

		const result = formSchema.safeParse(form)
		if (!result.success) {
			setErrorMessage('Invalid input. Please ensure all fields are filled out.')
			return
		}

		const { message, userName, email, agreement } = result.data

		const response = await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify({
				name: userName.value,
				email: email.value,
				message: message.value,
				isSpam: !!agreement.value && agreement.value.length > 0,
			}),
		})

		const body = await response.json()
		if (body.success === true) {
			setIsSubmitted(true)
			setErrorMessage('')
		} else {
			setErrorMessage(
				'There was an error on the server. Please email me directly.'
			)
		}
	}

	return (
		<Show
			when={!isSubmitted()}
			fallback={<p>Thank you! I will respond within 3 business days.</p>}>
			<form
				method="post"
				action="/contact"
				onSubmit={async (e) => {
					e.preventDefault()
					const form = e.currentTarget
					const result = await submitForm(form)
					console.log('Result:', result)
				}}
				class="mt-2 grid justify-center gap-4 p-6">
				<input
					type="text"
					name="userName"
					id="userName"
					placeholder="Your name"
					class="bg-sky-100 px-4 pt-2 pb-1 focus-visible:outline-none focus-visible:ring dark:bg-gray-900"
					required
				/>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Your email"
					class="bg-gray-100 px-4 pt-2 pb-1 focus-visible:outline-none focus-visible:ring dark:bg-gray-900"
					required
				/>
				<textarea
					name="message"
					id="message"
					placeholder="Your message"
					class="w-full bg-gray-100 px-4 pt-2 pb-1 focus-visible:outline-none focus-visible:ring dark:bg-gray-900"
					required
				/>
				<p class="visibly-hidden">
					The next checkbox, called "agreement" is present to stop spam bots. If
					you are a human, please don't check it, or I won't receive your
					message!
				</p>
				<input
					type="checkbox"
					id="agreement"
					name="agreement"
					class="visibly-hidden"
					tabindex="-1"
				/>
				<label for="agreement" class="visibly-hidden" tabindex="-1">
					Agreement
				</label>
				<button
					type="submit"
					class="mx-auto w-max rounded bg-white px-3 pb-1 pt-2 hover:bg-white/75 focus:bg-white/75 focus-visible:bg-white/75 dark:bg-black dark:hover:bg-black/75 dark:focus:bg-black/75 dark:focus-visible:bg-black/75">
					Submit
				</button>
				<div class="text-error-700">{errorMessage()}</div>
			</form>
		</Show>
	)
}
