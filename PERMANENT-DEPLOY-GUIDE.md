# 🌟 永久部署完整指南

## 📋 部署概述

我们将把应用完全部署到云端，实现：
- ✅ 永久可用，不需要电脑开机
- ✅ 免费使用（使用免费平台）
- ✅ 数据存储在Supabase，永不丢失

## 🎯 部署架构

```
手机APP → 前端(Netlify) → 后端API(Render) → Supabase数据库
```

---

## 第一步：获取Supabase凭证（5分钟）

### 1. 登录Supabase

访问：https://supabase.com/dashboard

### 2. 获取项目凭证

1. 选择你的项目
2. 点击左侧菜单 `Settings` → `API`
3. 复制以下信息：
   - **Project URL** (类似: `https://xxx.supabase.co`)
   - **anon public** (anon key)
   - **service_role** (service role key，点击"Reveal"显示)

### 3. 保存凭证

将以下信息保存好，后面会用到：
```
COZE_SUPABASE_URL=https://your-project.supabase.co
COZE_SUPABASE_ANON_KEY=eyJhbGciOiJ...
COZE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJ...
```

---

## 第二步：部署后端API到Render（10分钟）

### 方式A：使用Render（推荐，免费）

#### 1. 注册Render账号

访问：https://render.com → Sign Up（用GitHub登录）

#### 2. 创建新的Web Service

1. 点击 `New` → `Web Service`
2. 选择 `Build and deploy from a Git repository`
3. 连接你的GitHub仓库

**如果没有GitHub仓库，我可以帮你创建一个！**

#### 3. 配置服务

填写以下信息：
- **Name**: `gas-liquid-api`
- **Region**: 选择离你最近的区域
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`
- **Plan**: Free

#### 4. 添加环境变量

点击 `Advanced` → `Add Environment Variable`，添加：

| Key | Value |
|-----|-------|
| COZE_SUPABASE_URL | 你的Supabase URL |
| COZE_SUPABASE_ANON_KEY | 你的anon key |
| COZE_SUPABASE_SERVICE_ROLE_KEY | 你的service role key |

#### 5. 部署

点击 `Create Web Service`，等待5-10分钟。

部署完成后，你会得到一个地址：
```
https://gas-liquid-api.onrender.com
```

**这就是你的后端API地址！**

---

## 第三步：配置前端指向云端API（2分钟）

### 1. 修改配置文件

打开文件：`/workspace/projects/config/index.ts`

找到第93-96行，修改为：
```typescript
PROJECT_DOMAIN: JSON.stringify(
  process.env.PROJECT_DOMAIN ||
    'https://gas-liquid-api.onrender.com'  // 替换为你的Render地址
),
```

### 2. 重新构建前端

```bash
cd /workspace/projects
pnpm build:web
```

---

## 第四步：部署前端到Netlify（5分钟）

### 方式A：使用Netlify CLI（最简单）

```bash
cd /workspace/projects
npx netlify-cli deploy --prod --dir=dist-web
```

记录显示的地址，例如：
```
https://gas-liquid-app-xxx.netlify.app
```

### 方式B：使用Netlify网站

1. 访问：https://app.netlify.com
2. 拖拽 `dist-web` 文件夹到页面
3. 获取部署地址

---

## 第五步：生成APK下载链接（5分钟）

### 方式A：使用在线工具（最快）

#### 1. 访问 WebIntoApp

网址：https://webintoapp.com

#### 2. 填写信息

- **App Name**: 液气进出管理
- **Website URL**: 你的Netlify地址（如：https://gas-liquid-app-xxx.netlify.app）
- **Icon**: 上传应用图标（可选）

#### 3. 生成APK

点击 `Create App`，等待1-2分钟。

#### 4. 下载APK

点击 `Download APK` 获取下载链接。

### 方式B：使用HBuilderX（更专业）

详见：`UNIAPP-DEPLOY-GUIDE.md`

---

## 🎉 完成！

你现在拥有：
- ✅ **后端API**: https://gas-liquid-api.onrender.com
- ✅ **前端应用**: https://gas-liquid-app-xxx.netlify.app
- ✅ **APK下载链接**: 从WebIntoApp获取
- ✅ **数据存储**: Supabase云端，永久安全

---

## 📱 分发给别人使用

### 方式1：发送APK文件
直接将APK文件发送给他人安装即可。

### 方式2：发送下载链接
将APK下载链接分享给他人。

### 方式3：发送H5地址
直接分享H5应用地址，用户可在浏览器中使用。

---

## 🔄 如何更新？

### 更新前端
1. 修改代码
2. 重新构建：`pnpm build:web`
3. 部署：`npx netlify-cli deploy --prod --dir=dist-web`

### 更新后端
1. 修改代码
2. 提交到GitHub
3. Render会自动重新部署

---

## ❓ 常见问题

### Q1: Render部署失败？
检查：
- 环境变量是否正确配置
- Build Command是否正确
- 查看Render日志排查问题

### Q2: 应用无法访问？
检查：
- 后端API是否正常运行（访问 https://你的API地址/api/hello）
- 前端配置的API地址是否正确
- 浏览器控制台是否有错误

### Q3: APK无法使用？
检查：
- H5地址是否能正常访问
- APK中的H5地址配置是否正确

---

## 🆘 需要帮助？

如果你遇到问题，请提供：
1. 具体在哪一步出错
2. 错误提示截图
3. Render或Netlify的日志

我会立即帮你解决！

---

## 📚 相关文档

- `UNIAPP-DEPLOY-GUIDE.md` - HBuilderX打包详细教程
- `HBUILDERX-GUIDE.md` - HBuilderX使用指南
- `server/.env.example` - 后端环境变量示例
