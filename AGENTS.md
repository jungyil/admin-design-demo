# AGENTS.md - arco-pro-demo 开发指南

## 项目概述

- **项目名称**: Design for Vue
- **技术栈**: Vue 3 + TypeScript + Vite + Pinia + Vue Router
- **UI 框架**: Design (@arco-design/web-vue)
- **Node 版本**: >= 14.0.0

---

## 构建 / 检查 / 测试命令

### 开发

```bash
npm run dev              # 启动开发服务器 (Vite dev 配置)
```

### 构建

```bash
npm run build            # 类型检查 + 生产环境构建
npm run preview          # 构建 + 预览生产版本
npm run report           # 构建并生成打包分析报告
```

### 类型检查

```bash
npm run type:check       # 运行 vue-tsc (已启用 skipLibCheck)
```

### 代码检查

```bash
npx eslint src/ --fix    # 检查并自动修复源文件
npx prettier --write src/  # 格式化源文件
npx stylelint --fix "src/**/*.less"  # 检查样式文件
```

### 测试

**注意**: 本项目未配置测试框架。如需添加测试:

- 安装 Vitest: `npm install -D vitest @vue/test-utils`
- 在 package.json 添加脚本：`"test": "vitest"`

### 提交前钩子 (lint-staged)

Husky + lint-staged 在提交时自动格式化:

- `{js,ts,jsx,tsx}`: prettier → eslint --fix
- `.vue`: stylelint --fix → prettier → eslint --fix
- `{less,css}`: stylelint --fix → prettier

---

## 代码风格指南

### 格式化 (Prettier)

```javascript
// .prettierrc.js
{
  tabWidth: 2,
  semi: true,
  printWidth: 80,
  singleQuote: true,
  quoteProps: 'consistent',
  htmlWhitespaceSensitivity: 'strict',
  vueIndentScriptAndStyle: true,
}
```

### ESLint 配置

- **基础**: Airbnb JavaScript 风格指南
- **扩展**: TypeScript ESLint + Vue 3 推荐规则
- **解析器**: vue-eslint-parser 配合 @typescript-eslint/parser
- **导入解析器**: TypeScript project reference

### 导入顺序

导入时省略文件扩展名:

```javascript
import Foo from '@/components/Foo'; // 不要写 @/components/Foo.ts
import Bar from '@/utils/bar'; // 不要写 @/utils/bar.ts
```

### 命名规范

- **组件**: PascalCase (如 `QuickOperation.vue`)
- **components/ 目录文件**: kebab-case (如 `tab-item.vue`)
- **变量/函数**: camelCase
- **常量**: UPPER_SNAKE_CASE
- **Vue 事件**: camelCase (由 `vue/custom-event-name-casing` 强制)

### Vue 组件规则

- 新组件使用 `<script setup lang="ts">`
- 复杂场景使用 `<script lang="ts">` 配合 `defineComponent`
- 要求直接导出 (推荐命名导出)
- Props 必须有类型定义
- 禁止使用 v-text，使用 {{ }} 插值
- `<template>`、`<script>`、`<style>` 块之间必须有空行

### TypeScript 指南

- tsconfig.json 中启用 `strict: true`
- 尽可能避免使用 `any` (规则已关闭：`@typescript-eslint/no-explicit-any: 0`)
- 公共 API 优先使用 interface 而非 type alias
- 路径别名：`@/*` 映射到 `src/*`

### CSS / 样式

- 使用 Arco Design token 变量进行主题化
- 遵循 stylelint-config-rational-order 的 CSS 属性排序
- 使用 LESS 变量定义颜色、间距、排版
- `selector-pseudo-class-no-unknown` 忽略 `:deep`

### 错误处理

- 异步操作使用 try/catch
- 使用 Arco Message/Notification 组件提供用户反馈
- 使用正确的错误类型处理 API 错误

### 关键 ESLint 规则

`vue/require-default-prop`, `vue/multi-word-component-names`, `@typescript-eslint/ban-ts-comment`: 0 (关闭)
`@typescript-eslint/no-unused-vars`, `@typescript-eslint/no-empty-function`: 1 (警告)
`no-debugger`: warn (开发) / error (生产)

---

## 项目结构

```
src/
├── components/  # 可复用 UI 组件
├── views/       # 页面组件
├── layout/      # 布局组件
├── router/      # Vue Router 配置
├── store/       # Pinia 状态管理
├── api/         # API 定义
├── utils/       # 工具函数
├── locales/     # i18n 翻译文件
└── types/       # TypeScript 类型定义
```

---

## 核心依赖

Pinia, axios, echarts + vue-echarts, vue-i18n, lodash, dayjs, query-string, @arco-design/web-vue

---

## AI 助手注意事项

1. 提交前务必运行 `npm run type:check`
2. 使用 `@arco-design/web-vue` 的 Arco Design 组件
3. 图标通过 `@arco-design/web-vue/es/icon` 自动导入组件引入
4. 遵循 Vue 3 Composition API 模式，使用 `<script setup>`
5. Mock 数据放置在 `/mock/` 目录
