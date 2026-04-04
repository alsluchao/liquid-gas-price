# 液气价格统计 - APK 构建指南

## 🎯 项目说明

这是一个 React Native + Expo 项目，用于将液气价格统计系统打包成 Android APK。

---

## 📱 方法 1：使用 Expo 在线构建（推荐，最简单）

### 步骤：

#### 1. 注册 Expo 账号
访问：https://expo.dev/signup
- 填写邮箱和密码
- 验证邮箱

#### 2. 安装 Expo CLI（在电脑上）
打开命令行/终端，输入：
```bash
npm install -g expo-cli
```

#### 3. 登录 Expo
```bash
expo login
```
输入你的用户名和密码

#### 4. 进入项目目录
```bash
cd expo-apk-project
```

#### 5. 安装依赖
```bash
npm install
```

#### 6. 构建 APK
```bash
expo build:android -t apk
```

#### 7. 等待构建完成
- 构建时间：5-15 分钟
- 可以在 https://expo.dev/accounts/[你的用户名]/projects/gas-liquid-stats/builds 查看进度

#### 8. 下载 APK
- 构建完成后会提供下载链接
- 或者运行：`expo build:status` 查看下载链接

---

## 📱 方法 2：使用 EAS Build（新版推荐）

### 步骤：

#### 1. 安装 EAS CLI
```bash
npm install -g eas-cli
```

#### 2. 登录 Expo
```bash
eas login
```

#### 3. 构建 APK
```bash
cd expo-apk-project
eas build -p android --profile preview
```

#### 4. 下载 APK
构建完成后，终端会显示下载链接

---

## 📱 方法 3：使用本地构建（需要 Android Studio）

### 前提条件：
- 安装 Android Studio
- 安装 JDK 11 或更高版本
- 配置 ANDROID_HOME 环境变量

### 步骤：

#### 1. 安装依赖
```bash
cd expo-apk-project
npm install
```

#### 2. 生成原生代码
```bash
expo prebuild
```

#### 3. 构建 APK
```bash
cd android
./gradlew assembleRelease
```

#### 4. 找到 APK
APK 文件位置：
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📱 方法 4：使用在线工具（无需安装软件）

### 选项 1：WebIntoApp
网址：https://webintoapp.com

步骤：
1. 输入网址：`https://gas-liquid-app.loca.lt`
2. 应用名称：`液气价格统计`
3. 点击 `Create App`
4. 下载 APK

### 选项 2：Gonative
网址：https://gonative.io

步骤：
1. 输入网址
2. 选择功能
3. 构建 APK

### 选项 3：Appgeyser
网址：https://appsgeyser.com

步骤：
1. 选择 "Website" 模板
2. 输入网址
3. 自定义应用
4. 生成 APK

---

## 🎨 自定义应用图标

### 方法 1：替换 assets 文件夹中的图片
- `assets/icon.png` - 应用图标（1024x1024）
- `assets/splash.png` - 启动画面（1284x2778）
- `assets/adaptive-icon.png` - Android 自适应图标（1024x1024）

### 方法 2：使用在线工具生成
访问：https://icon.kitchen
1. 设计图标
2. 下载 PNG 格式
3. 替换 `assets/icon.png`

---

## 🔧 修改应用配置

编辑 `app.json` 文件：

```json
{
  "expo": {
    "name": "你的应用名称",
    "android": {
      "package": "com.yourcompany.appname",
      "versionCode": 1
    }
  }
}
```

---

## ❓ 常见问题

### Q1: 构建失败怎么办？
**A:** 检查错误信息，常见原因：
- 网络问题（使用 VPN）
- Expo 账号未验证
- 项目配置错误

### Q2: APK 安装后闪退？
**A:** 检查：
- WebView 网址是否正确
- 手机网络是否正常
- 手机系统版本（需要 Android 5.0+）

### Q3: 如何更新应用？
**A:** 
- 修改 `app.json` 中的 `versionCode`（加 1）
- 重新构建 APK
- 卸载旧版本，安装新版本

---

## 📞 需要帮助？

如果遇到问题：
1. 查看错误信息
2. 访问 Expo 文档：https://docs.expo.dev
3. 或者使用方法 4 的在线工具

---

## 📦 项目文件说明

```
expo-apk-project/
├── App.js           # 主应用代码（WebView）
├── app.json         # 应用配置（名称、图标等）
├── package.json     # 依赖配置
├── assets/          # 图标和启动画面
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
└── README.md        # 本说明文件
```

---

**推荐：使用方法 4 的 WebIntoApp，最简单快捷！** 🚀
