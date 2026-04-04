# 🚀 快速开始指南

## 📋 你需要做的事情（3步，共15分钟）

### 第一步：部署H5应用到公网（10分钟）

#### 方式A：使用Vercel（推荐，永久免费）

1. 注册账号：
   - GitHub: https://github.com
   - Vercel: https://vercel.com（用GitHub登录）

2. 在项目目录运行：
   ```bash
   # 安装Vercel CLI
   npm install -g vercel
   
   # 登录Vercel
   vercel login
   
   # 部署（使用我准备好的脚本）
   bash deploy-vercel.sh
   ```

3. 记下显示的网址，例如：
   ```
   https://gas-liquid-app-xxxx.vercel.app
   ```

#### 方式B：使用内网穿透（临时测试）

如果你只是想快速测试，可以用内网穿透：

```bash
# 安装ngrok
npm install -g ngrok

# 启动开发服务（如果没启动）
pnpm dev

# 在另一个终端运行内网穿透
ngrok http 5000
```

记下ngrok显示的地址，例如：
```
https://abc123.ngrok.io
```

**注意**：内网穿透地址每次都会变化，且需要电脑一直开机。

---

### 第二步：修改uni-app配置（2分钟）

1. 打开文件：`uniapp-webview/pages/index/index.vue`

2. 找到第11行：
   ```vue
   h5Url: 'https://your-domain.vercel.app'
   ```

3. 替换为你的网址：
   ```vue
   h5Url: 'https://gas-liquid-app-xxxx.vercel.app'
   ```

4. 保存文件

---

### 第三步：打包APK（10分钟）

1. 下载 HBuilderX：
   - 官网：https://www.dcloud.io/hbuilderx.html
   - 选择 **正式版**（App开发版）

2. 安装并打开 HBuilderX

3. 导入项目：
   - `文件` → `导入` → `从本地目录导入`
   - 选择 `uniapp-webview` 文件夹

4. 打包APK：
   - 右键项目名称
   - `发行` → `原生App-云打包`
   - 勾选 Android
   - 使用 DCloud 公共证书
   - 点击 `打包`

5. 等待5-10分钟，自动下载APK

6. 传输APK到手机并安装

---

## ✅ 完成！

你现在可以：
- 在手机上打开APK使用
- 发送APK给别人安装使用
- 数据自动保存到云端，永不丢失

---

## 🆘 遇到问题？

### 部署失败
- 检查网络连接
- 确保已登录Vercel：`vercel login`
- 查看错误日志

### APK白屏
- 检查H5地址是否正确
- 在浏览器中测试H5地址能否访问
- 确保修改了 `pages/index/index.vue`

### 数据丢失
- 数据存储在Supabase云端
- 即使删除APK，数据也不会丢失
- 登录Supabase控制台可以查看数据

---

## 📖 详细教程

如需更多细节，请查看：
- `UNIAPP-DEPLOY-GUIDE.md` - 完整部署教程
- `HBUILDERX-GUIDE.md` - HBuilderX使用指南
- `uniapp-webview/README.md` - 项目说明

---

## 💡 提示

### 数据安全
- ✅ 数据存储在Supabase云端
- ✅ 每日自动备份
- ✅ 加密传输和存储
- ✅ 权限控制（管理员/普通用户）

### 长期使用
- ✅ H5应用部署在Vercel，永久免费
- ✅ APK安装后永久可用
- ✅ 更新H5代码后，APK自动同步

### 分发方式
- 直接发送APK文件
- 无需应用商店
- 无用户数量限制

---

**祝你使用愉快！** 🎉
