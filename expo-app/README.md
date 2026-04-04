# 液气进出管理 - Expo 应用

这是一个使用 Expo 构建的 WebView 应用，将 H5 应用打包成 APK。

## 🚀 快速开始

### 方式1：在线构建（推荐，无需安装）

访问 [Expo Snack](https://snack.expo.dev)，粘贴代码，构建 APK。

### 方式2：本地构建

```bash
# 安装依赖
npm install

# 构建 APK
npx eas-cli build --platform android --profile preview
```

## 📱 应用说明

- **应用名称**：液气进出管理
- **版本**：1.0.0
- **类型**：WebView 应用
- **前端地址**：https://musical-biscochitos-757598.netlify.app

## 🔧 配置

修改 `app/index.tsx` 中的 `uri` 即可更换前端地址。

## 📖 详细教程

请查看：`EXPO-GUIDE.md`

## 📦 项目结构

```
expo-app/
├── app/
│   ├── index.tsx      # 主页面
│   └── _layout.tsx    # 布局配置
├── app.json           # 应用配置
├── eas.json           # 构建配置
├── package.json       # 依赖配置
└── tsconfig.json      # TypeScript配置
```
