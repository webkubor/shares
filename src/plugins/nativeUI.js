/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-07-31 18:45:44
 */
import {
  // create naive ui
  create,
  // component
  NButton
} from 'naive-ui'

const naive = create({
  components: [NButton]
})

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

export default function(app) {
  app.use(naive)
}