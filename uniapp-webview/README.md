# uni-app WebView 项目

这是一个使用 WebView 模式打包的 uni-app 项目，用于将 H5 应用打包成 APK。

## 📁 项目结构

```
uniapp-webview/
├── pages/
│   └── index/
│       └── index.vue          # 主页面（WebView）
├── App.vue                    # 应用入口
├── main.js                    # 主入口文件
├── manifest.json              # 应用配置
├── pages.json                 # 页面配置
└── uni.scss                   # 全局样式变量
```

## 🚀 快速开始

### 1. 修改H5地址

打开 `pages/index/index.vue`，找到第11行：

```vue
h5Url: 'https://your-domain.vercel.app'
```

替换为你部署的H5应用地址。

### 2. 用 HBuilderX 打开项目

1. 下载 HBuilderX：https://www.dcloud.io/hbuilderx.html
2. 导入项目：`文件` → `导入` → `从本地目录导入`
3. 选择 `uniapp-webview` 文件夹

### 3. 云打包APK

1. 右键项目名称
2. 选择 `发行` → `原生App-云打包`
3. 选择 Android，使用公共证书
4. 等待打包完成

## ⚙️ 配置说明

### manifest.json

主要配置项：
- `name`: 应用名称
- `versionName`: 版本名称
- `versionCode`: 版本号
- `android.permissions`: Android权限

### pages.json

页面配置：
- `navigationBarTitleText`: 页面标题
- `navigationBarBackgroundColor`: 导航栏背景色

## 📱 功能特点

- ✅ WebView 加载 H5 应用
- ✅ 自定义导航栏
- ✅ 加载状态提示
- ✅ 错误处理

## 🔧 自定义

### 修改应用图标

1. 打开 `manifest.json`
2. 点击 `App图标` 标签
3. 上传512x512的图片
4. 自动生成各尺寸图标

### 修改启动页

1. 打开 `manifest.json`
2. 点击 `App启动界面` 标签
3. 上传启动图

### 修改主题色

1. 打开 `uni.scss`
2. 修改 `$uni-color-primary` 变量

## 📖 完整教程

详见：`UNIAPP-DEPLOY-GUIDE.md`

## ❓ 常见问题

### Q: 白屏怎么办？

检查H5地址是否正确，在浏览器中测试是否能正常访问。

### Q: 如何更新？

修改H5地址后，重新打包APK即可。

### Q: 数据会丢失吗？

不会，数据存储在 Supabase 云端。

## 📄 License

MIT
