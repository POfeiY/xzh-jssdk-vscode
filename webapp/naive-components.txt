# 固钉 Affix

Affix 可以让内容在页面滚动的时候固定在一个位置，它和 `position: sticky` 有那么点像不过可以做更多事。

## 演示

```demo
basic.vue
position.vue
```

## API

### Affix Props

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| bottom | `number` | `undefined` | 在触发底部固定后 Affix 的 CSS bottom 属性（如果没设定，会使用 `trigger-bottom` 代替) |
| listen-to | `string \| HTMLElement \| Document \| Window \| (() => HTMLElement)` | `document` | 需要监听滚动的元素 |
| trigger-bottom | `number` | `undefined` | 触发底部固定时，Affix 和目标元素元素的底部距离（如果没设定，会使用 `bottom` 代替) |
| trigger-top | `number` | `undefined` | 触发顶部固定时，Affix 和目标元素元素的顶部距离（如果没设定，会使用 `top` 代替) |
| position | `'fixed' \| 'absolute'` | `'fixed'` | Affix 的 CSS position |
| top | `number` | `undefined` | 在触发顶部固定后 Affix 的 CSS top 属性（如果没设定，会使用 `trigger-top` 代替) |

# 警示信息 Alert

根据我的经验，这东西使用最频繁的场景是让你关掉 AdBlocks。

<!-- there is a bug of chrome rendering svg, if translateZ is not set -->

## 演示

```demo
basic.vue
bordered.vue
closable.vue
icon.vue
no-icon.vue
marquee.vue
rtl-debug.vue
empty-debug.vue
```

## API

### Alert Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `true` | alert 是否显示边框 | 2.32.2 |
| closable | `boolean` | `false` | alert 信息是否可以关掉 |  |
| show-icon | `boolean` | `true` | alert 是否展示 icon |  |
| title | `string` | `undefined` | alert 的 title 信息 |  |
| type | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | alert 的类型 |  |
| on-after-leave | `Function` | `undefined` | alert 消失时执行的回调函数 |  |
| on-close | `() => boolean \| Promise<boolean> \| any` | `() => true` | 点击 close icon 时执行的回调函数 |  |

### Alert Slots

| 名称    | 参数 | 说明                           |
| ------- | ---- | ------------------------------ |
| default | `()` | alert 的内容                   |
| header  | `()` | alert 的 header 部分填充的内容 |
| icon    | `()` | alert 的 icon 部分填充的内容   |

# 按钮 Button

按钮用来触发一些操作。

## 演示

```demo
basic.vue
secondary.vue
tertiary.vue
quaternary.vue
dashed.vue
size.vue
text.vue
tag.vue
disabled.vue
icon.vue
events.vue
shape.vue
ghost.vue
loading.vue
color.vue
group.vue
icon-button.vue
popover.vue
rtl-debug.vue
debug.vue
```

## API

### Button Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| attr-type | `'button' \| 'submit' \| 'reset'` | `'button'` | 按钮的 DOM 的 `type` 属性 |  |
| block | `boolean` | `false` | 按钮是否显示为块级 |  |
| bordered | `boolean` | `true` | 按钮是否显示 border |  |
| circle | `boolean` | `false` | 按钮是否为圆形 |  |
| color | `string` | `undefined` | 按钮颜色（支持形如 `#FFF`， `#FFFFFF`， `yellow`，`rgb(0, 0, 0)` 的颜色） |  |
| dashed | `boolean` | `false` | 按钮边框是否为虚线 |  |
| disabled | `boolean` | `false` | 按钮是否禁用 |  |
| focusable | `boolean` | `true` | 按钮是否可以被聚焦 |  |
| ghost | `boolean` | `false` | 按钮是否透明 |  |
| native-focus-behavior | `boolean` | 浏览器不是 Safari | 按钮是否遵循原生的 focus 行为。Safari 原生的 button 无法通过点击被聚焦，所以默认情况下 naive-ui 做了一些处理使它可以被聚焦，如果你不需要这种行为，或者发现你需要让按钮可被拖动，可以开启这个属性 | 2.28.3 |
| icon-placement | `'left' \| 'right'` | `'left'` | 按钮中图标的位置 |  |
| keyboard | `boolean` | `true` | 是否支持键盘操作 |  |
| loading | `boolean` | `false` | 按钮是否显示加载状态 |  |
| quaternary | `boolean` | `false` | 是否是四级按钮 |  |
| render-icon | `() => VNodeChild` | `undefined` | 按钮图标的渲染函数 | 2.34.0 |
| round | `boolean` | `false` | 按钮是否显示圆角 |  |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | 按钮的尺寸 |  |
| secondary | `boolean` | `false` | 是否是次要按钮 |  |
| strong | `boolean` | `false` | 按钮文字是否加粗 |  |
| tertiary | `boolean` | `false` | 是否是三级按钮 |  |
| text | `boolean` | `false` | 是否显示为文本按钮 |  |
| text-color | `string` | `undefined` | 按钮文字颜色（支持形如 `#FFF`， `#FFFFFF`， `yellow`，`rgb(0, 0, 0)` 的颜色） |  |
| type | `'default' \| 'tertiary' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | 按钮的类型 |  |
| tag | `string` | `'button'` | 按钮需要被渲染为什么标签 |  |

### ButtonGroup Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `undefined` | 在组内的按钮的尺寸。如果设定，内部的按钮尺寸将不生效 |
| vertical | `boolean` | `false` | 组内按钮的排列方式 |

### Button Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 按钮的内容 |
| icon    | `()` | 按钮的图标 |

### ButtonGroup Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | `()` | 按钮组的内容 |

# 代码 Code

## 预备条件

<n-alert title="注意" type="warning" style="margin-bottom: 16px;" :bordered="false">
  由于包体积原因，Naive UI 不内置 highlight.js。如果你需要使用代码组件，请确保你在使用之前已经设定了 highlight.js。
</n-alert>

下面的代码展示了如何为 Code 设定 hljs。比较推荐的方式是按需引入，因为它可以极大地减小打包尺寸。

```html
<template>
  <n-config-provider :hljs="hljs">
    <my-app />
  </n-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'

  hljs.registerLanguage('javascript', javascript)

  export default defineComponent({
    setup() {
      return {
        hljs
      }
    }
  })
</script>
```

## 演示

```demo
basic.vue
inline.vue
softwrap.vue
loop-debug.vue
line-numbers.vue
```

## API

### Code Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| code | `string` | `''` | 传入的 code 字符串 |  |
| inline | `boolean` | `false` | 使用行内样式 |  |
| hljs | `Object` | `undefined` | 如果你想局部设定 hljs，可以通过这个属性传给组件 |  |
| language | `string` | `undefined` | 代码在 highlightjs 中的语言 |  |
| show-line-numbers | `boolean` | `false` | 是否显示行号，在 `inline` 或 `word-wrap` 的情况下不生效 | 2.32.0 |
| trim | `boolean` | `true` | 是否显示 trim 后的代码 |  |
| word-wrap | `boolean` | `false` | 代码过长时是否自动换行 | 2.24.0 |
