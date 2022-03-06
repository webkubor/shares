/*
 * @Date: 2022-03-06 08:51:38
 * @LastEditTime: 2022-03-06 09:19:22
 */
import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(
	Object.entries(
		import.meta.globEager("../../locales/*.yml")
	).map(([key, value]) => {
		const yaml = key.endsWith('.yaml')
		return [key.slice(14, yaml ? -5 : -4), value.default]
	})
)

export default function (app) {
	const i18n = createI18n({
		legacy: false,
		locale: 'en',
		messages
	})
	app.use(i18n)
}
