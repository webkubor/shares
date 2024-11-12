/*
 * @Date: 2022-03-06 08:51:38
 * @LastEditTime: 2024-11-12 14:19:02
 */
import { createI18n } from 'vue-i18n'
import en from "@/locales/en.json"
import zh from "@/locales/zh-CN.json"

export default function (app) {
	const i18n = createI18n({
		legacy: false,
		locale: 'en',
		messages: {
			en,
			zh
		}
	})
	app.use(i18n)
}
