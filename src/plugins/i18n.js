/*
 * @Date: 2022-03-06 08:51:38
 * @LastEditTime: 2022-03-06 09:42:04
 */
import { createI18n } from 'vue-i18n'
import en from "../../locales/en.json"
import zh from "../../locales/zh-CN.json"


export default function (app) {
	const i18n = createI18n({
		legacy: false,
		locale: 'en',
		messages: {
			en,
			zh
		}
	})
	console.log(en, zh);
	app.use(i18n)
}