//自定义指令的总配置属性

interface IRippleDirectiveOptions {
  /**
   *
   * @remarks
   * Y*  你可以设置 ·currentColor· to 能够自动使用元素的文本颜色
   *
   * @default
   * 'currentColor'
   */
  color: string
  /**
   * 第一次出现的透明度
   *
   * @default
   * 0.2 默认opacity 0.2
   */
  initialOpacity: number
  /**
   * 在透明度 结束的时候 stopped 的时候 我们设置透明度的大小
   *
   * @default
   * 0.1
   */
  finalOpacity: number
  /**
   * 动画持续事件
   *
   * @default
   * 400ms
   */
  duration: number
  /**
   * css 动画 从开始到结束 以相同的时间来执行动画
   *
   * @default
   * 'ease-out'
   */
  easing: string
  /**
   * 取消延迟时间
   *
   * @note
   * 类似于 debounceTime
   * @default
   * 75ms
   */
  delay: number
  /**
   * 禁止 水波
   *
   * @note
   * 类似于 点击禁止ripple效果
   * @default
   * false
   */
  disabled: boolean
  /**
   * ripple展示方式
   *
   * @note
   * ripple在center中间开始动画
   * @default
   * false
   */
  center: boolean
}

//辅助补充配置
interface IRipplePluginOptions extends IRippleDirectiveOptions {
  /**
   * 用于覆盖指令的名称
   * 默认指令 ripple
   */
  directive: string
}

// 给可预见值 value 添加类型
interface IRippleDirectiveOptionWithBinding {
  value: IRippleDirectiveOptions
}

interface HTMLElementRectType {
  width: number
  height: number
  top: number
  left: number
  bottom: number
  right: number
}

// 初始化配置,default_plugin_options
const DEFAULT_PLUGIN_OPTIONS: IRipplePluginOptions = {
  directive: 'ripple',
  color: 'currentColor', // 可选，默认当前文本颜色
  initialOpacity: 0.1, //可选，初始交互效果透明度大小
  finalOpacity: 0.2,  //可选，结束交互效果长按透明度大小
  duration: 350, // 可选，持续时间
  easing: 'ease-out', //可选，缓动动画
  delay: 60, // 可选，延迟 debouceTime 时间后调用
  disabled: false, // 可选，禁止水波效果
  center: false // 是否从中间开始
}

export {
  DEFAULT_PLUGIN_OPTIONS,
  IRipplePluginOptions,
  HTMLElementRectType,
  IRippleDirectiveOptions,
  IRippleDirectiveOptionWithBinding
}
