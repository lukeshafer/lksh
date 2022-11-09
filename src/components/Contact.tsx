import { Component, createSignal, ParentProps, Show } from 'solid-js'
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
	DialogOverlay,
} from 'solid-headless'
import { z } from 'zod'

const [isOpen, setIsOpen] = createSignal(false)

export const OpenContactDialogButton: Component<ParentProps> = ({
	children,
}) => {
	const openModal = () => {
		setIsOpen(true)
	}

	return <button onClick={openModal}>{children}</button>
}

export const ContactDialog: Component<ParentProps> = ({ children }) => {
	const [isSubmitted, setIsSubmitted] = createSignal(false)
	const [errorMessage, setErrorMessage] = createSignal('')

	const closeModal = () => {
		setIsOpen(false)
		setIsSubmitted(false)
	}

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
		<>
			{children}

			<Transition appear show={isOpen()}>
				<Dialog
					isOpen
					class="fixed inset-0 z-10 overflow-y-auto"
					onClose={closeModal}>
					<div class="flex min-h-screen items-center justify-center px-4">
						<TransitionChild
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<DialogOverlay class="fixed inset-0 bg-gray-900 bg-opacity-50" />
						</TransitionChild>
						<TransitionChild
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<DialogPanel class="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-50 p-6 text-left align-middle shadow-xl transition-all dark:border dark:border-gray-50 dark:bg-gray-900">
								<DialogTitle
									as="h3"
									class="visibly-hidden text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">
									Contact
								</DialogTitle>

								<Show
									when={!isSubmitted()}
									fallback={
										<p>Thank you! I will respond within 3 business days.</p>
									}>
									<p>
										Fill the form or email me directly at{' '}
										<a
											href="mailto:hello@lukeshafer.com"
											class="text-sky-600 dark:text-sky-400">
											hello@lukeshafer.com
										</a>
									</p>
									<form
										method="post"
										action="/contact"
										onSubmit={async (e) => {
											e.preventDefault()
											const form = e.currentTarget
											const result = await submitForm(form)
											console.log('Result:', result)
										}}
										class="mt-2 grid gap-4 bg-gray-50 p-6 dark:bg-gray-900">
										<input
											type="text"
											name="userName"
											id="userName"
											placeholder="Your name"
											class="bg-gray-100 px-4 pt-2 pb-1 focus-visible:outline-none focus-visible:ring dark:bg-gray-800"
											required
										/>
										<input
											type="email"
											name="email"
											id="email"
											placeholder="Your email"
											class="bg-gray-100 px-4 pt-2 pb-1 focus-visible:outline-none focus-visible:ring dark:bg-gray-800"
											required
										/>
										<textarea
											name="message"
											id="message"
											placeholder="Your message"
											class="w-full bg-gray-100 px-4 pt-2 pb-1 focus-visible:outline-none focus-visible:ring dark:bg-gray-800"
											required
										/>
										<p class="visibly-hidden">
											The next checkbox, called "agreement" is present to stop
											spam bots. If you are a human, please don't check it, or I
											won't receive your message!
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

								<div class="mt-4">
									<button
										type="button"
										onClick={closeModal}
										class="mx-auto w-max rounded bg-white px-3 pb-1 pt-2 hover:bg-white/75 focus:bg-white/75 focus-visible:bg-white/75 dark:bg-black dark:hover:bg-black/75 dark:focus:bg-black/75 dark:focus-visible:bg-black/75">
										Close
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
