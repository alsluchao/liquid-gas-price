# 📱 手把手教你生成 APK

## ⚠️ 重要安全提示

**请立即修改你的 Expo 账号密码！**

你刚才在聊天中暴露了账号密码，这非常危险。请立即：
1. 访问 https://expo.dev
2. 登录你的账号
3. 修改密码

---

## 🚀 两种方式生成 APK

### 方式1：使用 Expo Snack（推荐，无需账号）

**这是最简单的方式，完全免费，不需要登录！**

#### 步骤：

1. **打开 Expo Snack**
   
   访问：https://snack.expo.dev

2. **创建新项目**
   
   点击 "Create a Snack" → 选择 "Blank (TypeScript)"

3. **粘贴代码**（见下方）

4. **构建 APK**
   
   点击右上角 "Build" → 选择 "Android" → 等待 5 分钟 → 下载 APK

---

### 方式2：使用你的 Expo 账号

**如果你想用自己的账号**，请按以下步骤操作：

#### 步骤：

1. **访问 Expo**
   
   打开：https://expo.dev

2. **登录你的账号**
   
   使用邮箱和密码登录

3. **创建新项目**
   
   - 点击 "Create Project"
   - 选择 "Blank (TypeScript)"
   - 项目名称：gas-liquid-app

4. **替换代码**
   
   在项目中找到 `App.tsx`，替换为以下代码：

```typescript
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1890ff" />
        </View>
      )}
      <WebView
        source={{ 
          uri: 'https://musical-biscochitos-757598.netlify.app' 
        }}
        onLoadEnd={() => setLoading(false)}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    zIndex: 999,
  },
  webview: {
    flex: 1,
  },
});
```

5. **添加依赖**
   
   在左侧找到 `package.json`，在 `dependencies` 中添加：
   ```json
   "react-native-webview": "13.8.6"
   ```

6. **构建 APK**
   
   - 点击 "Build" 按钮
   - 选择 "Android"
   - 选择 "APK"
   - 等待构建完成（约 5-10 分钟）
   - 点击 "Download" 下载 APK

---

## 🎯 推荐选择

### 如果是快速测试

使用 **Expo Snack**（方式1），5分钟完成，无需账号。

### 如果想保存项目

使用 **你的 Expo 账号**（方式2），项目会保存在你的账号中。

---

## 📖 详细教程

- `GENERATE-APK-GUIDE.md` - APK 生成详细指南
- `EXPO-GUIDE.md` - Expo 使用完整教程

---

## ❓ 常见问题

### Q1: 构建失败怎么办？

**A**: 检查：
- 代码是否完全复制
- 依赖是否正确添加
- 网络是否正常

### Q2: APK 安装后白屏？

**A**: 检查：
- H5 地址是否正确
- 手机网络是否正常

### Q3: 需要多久？

**A**: 
- Expo Snack: 约 5 分钟
- Expo 账号构建: 约 10 分钟

---

## 🔐 再次提醒

**请立即修改你的 Expo 账号密码！**

不要在任何聊天中提供账号密码，这非常危险。

---

**现在就访问 https://snack.expo.dev 开始生成 APK 吧！** 🚀
