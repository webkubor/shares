# Sass 升级指南：新旧写法对照

> 本项目已完成 Sass 语法升级，所有 `@import` 已迁移为 `@use`，颜色函数已升级为 `sass:color` 模块。

---

## 1. 模块导入

### ❌ 旧写法（已弃用）
```scss
@import "./variables.scss";
@import "./mixins.scss";
@import "@/styles/variables.scss";
```

### ✅ 新写法
```scss
// 导入并暴露所有成员（变量、mixin 等可直接使用）
@use "./variables.scss" as *;
@use "./mixins.scss" as *;

// 导入但不暴露成员（仅执行样式）
@use "./reset.scss";

// 导入并使用命名空间
@use "./variables.scss" as vars;
// 使用时：vars.$primary-color
```

---

## 2. 颜色函数

### ❌ 旧写法（已弃用）
```scss
$light-color: lighten($color, 20%);
$dark-color: darken($color, 10%);
$saturated: saturate($color, 15%);
```

### ✅ 新写法
```scss
@use "sass:color";

// lighten → 正数 $lightness
$light-color: color.adjust($color, $lightness: 20%);

// darken → 负数 $lightness
$dark-color: color.adjust($color, $lightness: -10%);

// saturate → 正数 $saturation
$saturated: color.adjust($color, $saturation: 15%);

// 也可以用 color.scale（按比例缩放）
$lighter: color.scale($color, $lightness: 50%);
```

---

## 3. 其他内置函数

### ❌ 旧写法
```scss
$result: percentage(0.5);
$rounded: round(3.7);
$list-len: length($my-list);
```

### ✅ 新写法
```scss
@use "sass:math";
@use "sass:list";

$result: math.percentage(0.5);
$rounded: math.round(3.7);
$list-len: list.length($my-list);
```

---

## 4. Vite 配置

### ❌ 旧写法
```ts
// vite.config.ts
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@import "@/styles/variables.scss";`
    }
  }
}
```

### ✅ 新写法
```ts
// vite.config.ts
css: {
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler',  // 消除 legacy-js-api 警告
      additionalData: `@use "@/styles/variables.scss" as *;`
    }
  }
}
```

---

## 5. 组件内样式

### ❌ 旧写法
```vue
<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.my-class {
  color: $primary-color;
  @include flex-center;
}
</style>
```

### ✅ 新写法
```vue
<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;
@use "@/styles/mixins.scss" as *;

.my-class {
  color: $primary-color;
  @include flex-center;
}
</style>
```

---

## 6. 跨文件共享（@forward）

如果你想让一个文件作为"入口"，把多个模块的成员统一暴露出去：

```scss
// _index.scss（入口文件）
@forward "./variables.scss";
@forward "./mixins.scss";
```

```scss
// 其他文件使用
@use "@/styles" as *;  // 自动找 _index.scss
```

---

## 快速迁移检查清单

- [x] 所有 `@import` 改为 `@use ... as *`
- [x] `lighten/darken` 改为 `color.adjust`
- [x] `vite.config.ts` 添加 `api: 'modern-compiler'`
- [x] 被其他文件依赖的样式文件顶部加 `@use` 引入依赖

---

## 本项目已修改的文件

| 文件 | 改动内容 |
|------|----------|
| `src/styles/index.scss` | `@import` → `@use` |
| `src/styles/base.scss` | `@import` → `@use` |
| `src/styles/components.scss` | 新增 `@use` 引入 mixins 和 variables |
| `src/styles/mixins.scss` | 新增 `@use "sass:color"`，`lighten/darken` → `color.adjust` |
| `src/views/tools/index.vue` | `@import` → `@use` |
| `src/views/tools/components/Tool.vue` | `@import` → `@use` |
| `src/views/projects/index.vue` | `@import` → `@use` |
| `src/views/list/components/card.vue` | `@import` → `@use` |
| `src/views/list/components/siderBar.vue` | `@import` → `@use` |
| `vite.config.ts` | `@import` → `@use`，新增 `api: 'modern-compiler'` |

---

## 参考链接

- [Sass 官方迁移指南](https://sass-lang.com/documentation/at-rules/use)
- [Sass 颜色函数弃用说明](https://sass-lang.com/d/color-functions)
- [Vite CSS 预处理器配置](https://vite.dev/config/shared-options.html#css-preprocessoroptions)
