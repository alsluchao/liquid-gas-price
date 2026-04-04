# 📱 APK 打包完整教程（WebView模式）

## 🎯 方案说明

**WebView模式** = APK 内嵌浏览器加载你的H5应用

**优势**：
- ✅ 最简单，只需3步
- ✅ 更新功能无需重装APK
- ✅ 数据存储在Supabase云端，永久安全

**流程图**：
```
你的电脑 → 部署H5到Vercel → 修改uni-app地址 → 打包APK → 安装使用
```

---

## 📋 准备工作

### 需要的账号（都是免费的）

1. **GitHub 账号**（用于代码托管）
   - 注册地址：https://github.com
   - 已有账号可跳过

2. **Vercel 账号**（用于部署H5应用）
   - 注册地址：https://vercel.com
   - 建议用GitHub账号登录

3. **DCloud 账号**（用于APK打包）
   - 注册地址：https://dev.dcloud.net.cn
   - 打包时需要登录

---

## 第一步：部署H5应用到Vercel（10分钟）

### 1.1 安装 Vercel CLI

在你的项目目录打开终端，运行：

```bash
npm install -g vercel
```

### 1.2 登录 Vercel

```bash
vercel login
```

按照提示选择登录方式（推荐用GitHub）

### 1.3 部署前端（H5应用）

```bash
# 进入项目目录
cd /workspace/projects

# 构建H5应用
pnpm build:web

# 部署到Vercel
vercel --prod
```

**首次部署会询问**：
- Set up and deploy? → 输入 `Y`
- Which scope? → 选择你的账号
- Link to existing project? → 输入 `N`
- What's your project's name? → 输入 `gas-liquid-app`
- In which directory is your code located? → 按 Enter（默认）
- Want to modify these settings? → 输入 `N`

**部署成功后**，会显示类似这样的地址：
```
https://gas-liquid-app-xxxx.vercel.app
```

**这就是你的H5应用地址！** 🎉

### 1.4 部署后端（API服务）

**重要**：你的应用需要后端API才能工作，有两种选择：

#### 方案A：使用Vercel部署后端（推荐）

创建 `vercel.json` 配置文件：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/dist/main.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/dist/main.js"
    }
  ]
}
```

#### 方案B：使用内网穿透（临时测试）

如果你只是临时测试，可以使用内网穿透：

```bash
# 安装 ngrok
npm install -g ngrok

# 启动后端服务（如果没启动）
pnpm dev:server

# 在另一个终端运行内网穿透
ngrok http 3000
```

ngrok 会给你一个公网地址，例如：
```
https://abc123.ngrok.io
```

---

## 第二步：修改 uni-app 项目配置（2分钟）

### 2.1 找到项目文件

我已为你创建好了 uni-app 项目：
```
/workspace/projects/uniapp-webview/
```

### 2.2 修改H5地址

打开文件：`uniapp-webview/pages/index/index.vue`

找到第11行：
```vue
h5Url: 'https://your-domain.vercel.app'
```

替换为你部署的H5地址：
```vue
h5Url: 'https://gas-liquid-app-xxxx.vercel.app'
```

**保存文件**。

---

## 第三步：打包APK（10分钟）

### 3.1 下载安装 HBuilderX

1. 访问官网：https://www.dcloud.io/hbuilderx.html
2. 下载 **正式版**（App开发版）
3. 解压后直接运行（Windows/Mac都支持）

### 3.2 导入项目

1. 打开 HBuilderX
2. 点击菜单：`文件` → `导入` → `从本地目录导入`
3. 选择文件夹：`/workspace/projects/uniapp-webview`
4. 点击`选择`

### 3.3 配置应用图标（可选）

1. 在左侧项目列表，双击 `manifest.json`
2. 点击 `App图标`
3. 点击 `浏览` 上传一张图片（建议512x512）
4. 点击 `生成并替换`

### 3.4 云打包APK

1. 在项目名称上右键
2. 选择：`发行` → `原生App-云打包`
3. 在弹出的窗口中：
   - **Android**：勾选
   - **iOS**：不勾选（需要付费开发者账号）
   - **证书**：选择 `使用DCloud公共证书`（测试用）
4. 点击 `打包`

**等待打包**（约5-10分钟）：
- 打包进度会显示在控制台
- 完成后自动下载APK文件

---

## 第四步：安装使用（2分钟）

### 4.1 传输APK到手机

**方式一：微信传输（推荐）**
1. 找到下载的APK文件（通常在 `Downloads` 文件夹）
2. 通过微信发送给自己
3. 在手机微信中点击APK文件
4. 选择 `用其他应用打开` → `安装`

**方式二：数据线传输**
1. 用数据线连接手机和电脑
2. 将APK文件复制到手机存储
3. 在手机文件管理器中找到APK
4. 点击安装

### 4.2 安装APK

1. 点击APK文件
2. 允许 `安装未知来源应用`
3. 点击 `安装`
4. 安装完成后点击 `打开`

### 4.3 开始使用

- 输入管理员密码：`admin123`
- 开始录入数据
- 数据自动保存到云端

---

## 🎉 完成！你现在拥有：

✅ **H5应用**：部署在Vercel，永久免费访问
✅ **APK文件**：可以发给任何人安装使用
✅ **云端数据**：存储在Supabase，自动备份，永不丢失

---

## 🔄 如何更新功能？

**WebView模式的最大优势**：更新H5代码后，APK自动同步！

### 更新步骤：

1. 修改你的代码
2. 重新部署到Vercel：
   ```bash
   cd /workspace/projects
   pnpm build:web
   vercel --prod
   ```
3. 完成！用户无需重新安装APK

---

## ❓ 常见问题

### Q1：部署到Vercel失败怎么办？

**A**：检查以下几点：
- 是否已登录Vercel：`vercel login`
- 网络是否正常（可能需要科学上网）
- 查看 `dist` 目录是否生成了构建文件

### Q2：APK安装后打开白屏？

**A**：可能是H5地址配置错误：
1. 检查 `uniapp-webview/pages/index/index.vue` 中的 `h5Url`
2. 确保地址能正常访问（在浏览器中测试）
3. 重新打包APK

### Q3：数据会丢失吗？

**A**：不会！数据存储在Supabase云端：
- 每日自动备份
- 99.9% SLA保证
- 即使删除APK，数据也在云端

### Q4：APK可以发给多少人用？

**A**：无限制！
- 直接发送APK文件
- 对方安装即可使用
- 不需要应用商店

### Q5：如何给应用换图标？

**A**：在HBuilderX中：
1. 打开 `manifest.json`
2. 点击 `App图标`
3. 上传新图片
4. 重新打包APK

---

## 🆘 需要帮助？

如果遇到问题，请提供以下信息：
1. 具体在哪一步出错
2. 错误提示截图
3. 控制台日志

我会立即帮你解决！

---

## 📚 进阶教程（可选）

### 自定义域名

如果你有自己的域名，可以在Vercel中绑定：
1. 打开项目设置
2. 点击 `Domains`
3. 添加你的域名
4. 按照提示配置DNS

### 使用正式证书

如果要上架应用商店，需要使用正式签名证书：
1. 生成签名证书（使用keytool）
2. 在HBuilderX中选择 `使用自有证书`
3. 上传证书文件

### 添加推送通知

uni-app支持推送通知功能：
1. 在 `manifest.json` 中配置推送模块
2. 集成UniPush或其他推送服务
3. 需要重新打包APK

---

**祝你使用愉快！** 🎉
