/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly SMTP_HOST: string | undefined
	readonly SMTP_USER: string | undefined
	readonly SMTP_PASS: string | undefined
	readonly SMTP_FROM: string | undefined
}
