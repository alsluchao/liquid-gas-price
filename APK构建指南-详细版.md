# 📱 APK v2.0 构建指南

## ⚡ 快速构建（3步完成）

### 第一步：执行构建脚本

在终端中执行：

```bash
cd /workspace/projects/expo-apk-project
./easy-build.sh
```

### 第二步：输入密码

脚本会提示您输入 Expo 密码：

```
请输入您的 Expo 密码：
```

输入您的 Expo 账号密码（输入时不会显示字符）

### 第三步：等待并下载

- 构建时间：约 5-10 分钟
- 构建完成后会显示下载链接
- 或访问：https://expo.dev/accounts/alsluchao/projects/liquid-gas-app/builds

---

## 🔐 账号信息

- **用户名**：alsluchao
- **邮箱**：33998278@qq.com
- **密码**：（您设置的密码）

如果忘记密码，请访问：https://expo.dev/password-reset

---

## 📋 详细步骤

### 方式一：使用脚本（推荐）

```bash
cd /workspace/projects/expo-apk-project
./easy-build.sh
```

按提示操作即可

### 方式二：手动操作

**1. 登录**

```bash
cd /workspace/projects/expo-apk-project
npx eas login
```

输入邮箱和密码

**2. 构建**

```bash
npx eas build --platform android --profile preview
```

**3. 下载**

访问：https://expo.dev/accounts/alsluchao/projects/liquid-gas-app/builds

---

## 💡 如果密码不正确

### 重置密码

1. 访问：https://expo.dev/password-reset
2. 输入邮箱：33998278@qq.com
3. 查收邮件并重置密码
4. 使用新密码重新构建

---

## 🎯 v2.0 特性

构建完成后，APK具有以下特性：

- ✅ **支持动态配置服务器地址**
- ✅ **首次打开可输入服务器地址**
- ✅ **点击"设置"按钮随时更新地址**
- ✅ **IP 变化时无需重新安装**

---

## 📱 使用说明

### 首次打开

1. APK 安装后打开
2. 显示配置页面
3. 输入服务器地址：`http://9.128.54.29:5000`
4. 点击"连接服务器"

### 当 IP 变化时

1. 打开 APP
2. 点击右上角"⚙️ 设置"
3. 输入新的服务器地址
4. 点击"连接服务器"

**无需重新安装 APK！**

---

## 🚨 常见问题

### Q: 密码错误怎么办？

**A**:
1. 确认密码是否正确
2. 或访问 https://expo.dev/password-reset 重置密码
3. 使用新密码重新执行构建脚本

### Q: 构建失败怎么办？

**A**:
1. 查看错误信息
2. 告诉我具体错误内容
3. 我会立即修复

### Q: 下载链接打不开？

**A**:
1. 确保已登录 Expo 账号
2. 或尝试复制链接到浏览器下载
3. 或使用无痕模式打开

---

## ✅ 总结

**执行步骤**：
1. 执行 `./easy-build.sh`
2. 输入 Expo 密码
3. 等待构建完成
4. 下载 APK

**预计时间**：10-15 分钟

**永久可用，一次安装！** 🎊

---

## 📞 需要帮助？

如果遇到任何问题，请告诉我：
- 具体的错误信息
- 在哪一步遇到问题
- 我会立即协助解决
