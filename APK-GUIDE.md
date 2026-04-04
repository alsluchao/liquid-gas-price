# APK 打包指南

## 方案一：使用 HBuilderX 云打包（推荐，最简单）

### 步骤：

1. **安装 HBuilderX**
   - 下载地址：https://www.dcloud.io/hbuilderx.html
   
2. **创建 uni-app 项目**
   - 打开 HBuilderX
   - 新建项目 → uni-app → 默认模板
   - 项目名称：液气进出管理

3. **迁移代码**
   - 将 Taro 页面代码复制到 uni-app 项目
   - 调整 API 调用方式（使用 uni.request）
   
4. **云打包 APK**
   - 在 HBuilderX 中右键项目
   - 发行 → 原生App-云打包
   - 选择 Android
   - 使用公共证书（测试用）
   - 等待打包完成（约5-10分钟）
   - 下载 APK 文件

### 优势：
- ✅ 无需配置开发环境
- ✅ 自动处理证书和签名
- ✅ 支持热更新
- ✅ 可以直接安装到手机

---

## 方案二：使用 React Native 重写

Taro 支持 React Native，但需要额外配置：

### 步骤：

1. **安装依赖**
```bash
pnpm add @tarojs/plugin-platform-react-native
```

2. **配置 RN**
```typescript
// config/index.ts
const config = {
  plugins: ['@tarojs/plugin-platform-react-native']
}
```

3. **打包 APK**
- 需要配置 Android Studio
- 需要 Java 开发环境
- 生成签名证书

### 劣势：
- ❌ 配置复杂
- ❌ 需要 Android 开发环境
- ❌ 首次配置耗时约 2-4 小时

---

## 方案三：使用 WebView 套壳（最快）

将 H5 应用包装成 APK：

### 推荐工具：
1. **AndroWebView**（在线生成）
   - 网址：https://androphp.net/androwebview/
   - 输入你的 H5 地址
   - 生成 APK 下载

2. **WebIntoApp**（在线生成）
   - 网址：https://webintoapp.com/
   - 免费生成基础版 APK

3. **Gonative**（专业版）
   - 网址：https://gonative.io/
   - 支持 push 推送、支付等功能

### 步骤：
1. 将你的 H5 应用部署到服务器
2. 在打包网站输入网址
3. 下载生成的 APK
4. 直接安装到手机

### 优势：
- ✅ 5分钟完成
- ✅ 无需任何开发
- ✅ H5 更新后 APK 自动更新

---

## 推荐选择

### 快速体验 → 方案三（WebView 套壳）
- 时间：5分钟
- 难度：⭐
- 功能：完整保留 H5 功能

### 正式使用 → 方案一（HBuilderX）
- 时间：1-2小时
- 难度：⭐⭐
- 功能：原生体验，性能更好

### 企业级应用 → React Native
- 时间：2-4小时
- 难度：⭐⭐⭐⭐
- 功能：完全原生体验

---

## 当前可用的访问方式

### 1. H5 版本（立即可用）
```
http://localhost:5000
```
- 在手机浏览器打开
- 添加到主屏幕即可

### 2. 微信小程序（已构建）
- 在右侧预览区配置 AppID
- 扫码体验小程序版本

---

## 需要帮助？

如果你决定使用某个方案，我可以帮你：
1. 提供 H5 部署指南
2. 协助迁移到 uni-app
3. 配置 React Native 环境
