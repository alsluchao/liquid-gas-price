# 液气进出管理 - Expo 应用

## 📱 这是什么？

这是一个使用 Expo 构建的 Android/iOS 应用。

## 🚀 如何生成APK？

### 方式1：使用 Expo Go（最快测试）

1. 在手机上安装 Expo Go 应用
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)

2. 在电脑上运行：
   ```bash
   cd /workspace/projects/expo-app
   npm install
   npx expo start
   ```

3. 用手机扫描二维码，即可使用应用

---

### 方式2：使用 Expo Snack 在线构建（推荐）

**无需安装任何软件！**

#### 步骤：

1. **访问 Expo Snack**
   ```
   https://snack.expo.dev
   ```

2. **创建新项目**
   - 点击 "Create a Snack"
   - 选择 "Blank"

3. **粘贴代码**
   - 删除所有现有代码
   - 复制 `App.js` 的内容（见下方）
   - 粘贴到编辑器中

4. **添加依赖**
   - 点击左侧的 "Dependencies"
   - 添加：`react-native-webview`

5. **构建APK**
   - 点击右上角的 "Build"
   - 选择 "Android"
   - 等待构建完成（约5分钟）
   - 下载APK

---

### 方式3：使用 EAS Build（需要账号）

#### 前提条件
- Expo 账号（免费注册：https://expo.dev）

#### 步骤：

1. **安装依赖**
   ```bash
   cd /workspace/projects/expo-app
   npm install
   ```

2. **登录 Expo**
   ```bash
   npx expo login
   ```
   输入你的 Expo 账号和密码

3. **配置 EAS**
   ```bash
   npx eas-cli build --configure
   ```

4. **构建APK**
   ```bash
   npx eas-cli build --platform android --profile preview
   ```

5. **下载APK**
   - 构建完成后会显示下载链接
   - 点击链接下载APK

---

## 📝 完整代码（用于 Expo Snack）

### App.js

```javascript
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.title}>液气进出管理</Text>
          <ActivityIndicator size="large" color="#1890ff" />
        </View>
      )}
      <WebView
        source={{ 
          uri: 'https://gas-liquid-final.loca.lt'
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
    backgroundColor: '#1890ff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1890ff',
    zIndex: 999,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  webview: {
    flex: 1,
  },
});
```

---

## 🎯 推荐方案

### 如果是快速测试
→ 使用 **Expo Go**（方式1）

### 如果需要APK文件
→ 使用 **Expo Snack**（方式2，推荐）

### 如果是正式发布
→ 使用 **EAS Build**（方式3）

---

## 💡 提示

- Expo Snack 最简单，无需安装任何软件
- 构建需要 5-10 分钟
- 生成的APK可以直接安装使用
- 应用地址：`https://gas-liquid-final.loca.lt`

---

## ❓ 常见问题

### Q: 构建失败怎么办？
A: 检查代码是否正确，网络是否正常

### Q: APK无法安装？
A: 允许安装未知来源应用

### Q: 应用打开白屏？
A: 检查网络连接，确保电脑保持开机

---

**现在就访问 https://snack.expo.dev 开始构建APK！** 🚀
