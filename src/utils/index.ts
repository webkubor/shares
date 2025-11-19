/*
 * @Date: 2022-03-29 11:33:22
 * @LastEditTime: 2022-09-08 10:19:15
 * @Author:webkubor
 */
import {
  DEFAULT_PLUGIN_OPTIONS,
  IRippleDirectiveOptions,
  IRippleDirectiveOptionWithBinding
} from './options'
import { getHooks } from './utils/hooks'
import { ripple } from './v-ripple'
const optionMap = new WeakMap<
  HTMLElement,
  Partial<IRippleDirectiveOptions> | false
>()
const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS }
export default {
  install: (app) => {
  const hooks = getHooks(app)

    app.directive('ripple', {
      [hooks.mounted](
        el: HTMLElement,
        binding: IRippleDirectiveOptionWithBinding
      ) {
      optionMap.set(el, binding.value ?? {})
      el.addEventListener('pointerdown', (event) => {
        const options = optionMap.get(el)
        if (binding.value?.disabled) return
        if (options === false) return
        ripple(event, el, {
          ...globalOptions,
          ...options
        })
      })
      },
      [hooks.updated](
        el: HTMLElement,
        binding: IRippleDirectiveOptionWithBinding
      ) {
        optionMap.set(el, binding.value ?? {})
      }
    })
  }
}
