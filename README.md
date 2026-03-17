# Design for Vue

## 项目介绍

访问 https://admin-design-demo.vercel.app 查看项目。

## 项目结构

```
src/
├── api/         # API 定义
├── assets/      # 静态资源
├── components/  # 可复用 UI 组件
├── config/      # 配置文件
├── directive/   # 自定义指令
├── hooks/       # 自定义钩子
├── layout/      # 布局组件
├── locale/      # 国际化文件
├── mock/        # 模拟数据
├── router/      # 路由配置
├── store/       # Pinia 状态管理
├── types/       # TypeScript 类型定义
├── utils/       # 工具函数
├── views/       # 页面组件
├── App.vue      # 应用根组件
├── env.d.ts     # 环境类型定义
└── main.ts      # 应用入口
```

## 功能模块

### 1. 仪表盘 (Dashboard)
- 工作台：数据概览、快捷操作、公告等
- 监控：实时数据监控、状态展示

### 2. 表单 (Form)
- 分步表单：多步骤表单提交
- 分组表单：复杂表单的分组展示

### 3. 列表 (List)
- 搜索表格：带搜索功能的表格展示
- 卡片列表：卡片式数据展示

### 4. 个人中心 (Profile)
- 基本信息：个人资料展示与编辑

### 5. 用户管理 (User)
- 用户信息：用户详情展示
- 用户设置：账户设置、安全设置等

### 6. 可视化 (Visualization)
- 数据图表：各种类型的图表展示

### 7. 异常页面 (Exception)
- 403：权限不足
- 404：页面不存在
- 500：服务器错误

### 8. 结果页面 (Result)
- 成功页：操作成功提示
- 失败页：操作失败提示

## 开发指南

### 代码风格

- **组件命名**：PascalCase（如 `QuickOperation.vue`）
- **目录文件**：kebab-case（如 `tab-item.vue`）
- **变量/函数**：camelCase
- **常量**：UPPER_SNAKE_CASE
- **Vue 事件**：camelCase

## Mock 数据

项目在 `src/mock/` 目录下提供了模拟数据，方便开发和测试。

## 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

