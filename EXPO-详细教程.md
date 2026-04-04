# 🎯 Expo 生成 APK 超详细教程（手把手版）

## 📱 什么是 Expo？

**Expo** 是一个让 React Native 开发变得简单的工具。你可以理解为：
- 不需要安装 Android Studio
- 不需要配置复杂的原生开发环境
- 在浏览器里写代码，一键生成 APK

---

## 🚀 第一步：访问 Expo Snack（在线编辑器）

### 1.1 打开浏览器
在电脑上打开浏览器（Chrome、Edge、Firefox 都可以）

### 1.2 访问网址
在地址栏输入：
```
https://snack.expo.dev
```

按回车键，等待页面加载（大约 10-30 秒）

### 1.3 你会看到什么？
- 左边是代码编辑器（黑色背景）
- 右边是手机预览界面
- 顶部有 `Project`、`Libraries` 等菜单

---

## 📝 第二步：粘贴代码

### 2.1 找到 App.js 文件
在左侧文件列表中，找到 `App.js` 文件（默认已打开）

### 2.2 删除原有代码
- 按 `Ctrl + A`（全选）
- 按 `Delete` 或 `Backspace`（删除）

### 2.3 粘贴新代码
复制下面的完整代码，粘贴到编辑器中：

```javascript
import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet, ActivityIndicator, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://gas-liquid-app.loca.lt' }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#1890ff" />
            <Text style={styles.loadingText}>加载中...</Text>
          </View>
        )}
        onError={(e) => {
          console.log('WebView Error:', e.nativeEvent.description);
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        mixedContentMode="always"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
```

### 2.4 保存
代码会自动保存，如果没有自动保存：
- 按 `Ctrl + S`（Windows）
- 或 `Cmd + S`（Mac）

---

## 🔧 第三步：安装依赖包

### 3.1 点击顶部菜单
在页面顶部，找到 `Libraries` 按钮，点击它

### 3.2 添加 react-native-webview
在弹出的搜索框中输入：
```
react-native-webview
```

点击搜索结果中的 `Install` 按钮，等待安装（大约 10 秒）

---

## ▶️ 第四步：预览应用（可选）

### 4.1 在浏览器预览
右侧的预览窗口会自动刷新，显示你的应用

### 4.2 用手机预览
1. 在手机上下载 **Expo Go** App
   - Android: 在应用商店搜索 "Expo Go"
   - iOS: 在 App Store 搜索 "Expo Go"

2. 扫描屏幕上的二维码
   - 二维码在右侧预览窗口上方
   - 点击 `Run on device` 按钮
   - 选择 `Android` 或 `iOS`

---

## 📦 第五步：生成 APK 文件

### 5.1 找到构建按钮
在页面顶部菜单栏，点击 **↓ (下载图标)** 或 **Export** 按钮

### 5.2 选择构建类型
会弹出几个选项：
- **Export to GitHub**：导出到 GitHub（需要账号）
- **Download Project**：下载项目 ZIP 文件
- **Build for Android**：构建 Android APK ✅ **选这个**

### 5.3 点击 "Build for Android"
系统会开始构建，页面会显示：
```
Building your project...
This may take a few minutes
```

### 5.4 等待构建完成
构建时间通常：
- **快速构建**：3-5 分钟
- **完整构建**：10-15 分钟

期间可以关闭浏览器，稍后回来查看

### 5.5 下载 APK
构建完成后，页面会显示：
```
Your build is ready!
[Download APK]
```

点击 **Download APK** 按钮，下载 APK 文件

---

## 📲 第六步：安装到手机

### 6.1 传输文件
将下载的 APK 文件传到手机：
- **方法 1**：通过微信/QQ 文件传输
- **方法 2**：通过数据线连接电脑
- **方法 3**：通过网盘（百度网盘、阿里云盘等）

### 6.2 安装应用
1. 在手机上找到 APK 文件
2. 点击文件
3. 如果提示"禁止安装未知应用"：
   - 点击"设置"
   - 找到"允许来自此来源的应用"
   - 开启权限
4. 返回，再次点击 APK 文件
5. 点击"安装"
6. 等待安装完成（几秒钟）
7. 点击"打开"

---

## ❓ 常见问题

### Q1: Expo Snack 打不开怎么办？
**A:** 
- 检查网络连接
- 换一个浏览器试试（推荐 Chrome）
- 清除浏览器缓存
- 使用 VPN（如果在中国大陆）

### Q2: 构建失败怎么办？
**A:** 
- 检查代码是否有错误（红色波浪线）
- 确保已安装 `react-native-webview` 依赖
- 点击 `Problems` 标签查看错误详情
- 复制错误信息发给我

### Q3: 生成的 APK 安装后闪退怎么办？
**A:** 
- 检查 WebView 的 URL 是否正确
- 确保网址可以在手机浏览器正常打开
- 查看手机系统版本（需要 Android 5.0 以上）

### Q4: 能不能修改应用的图标和名称？
**A:** 
- Expo Snack 的免费版本不支持自定义图标
- 如需自定义，需要使用 Expo CLI（需要安装开发环境）
- 或者使用在线 APK 包装工具（如 WebIntoApp）

---

## 🎨 进阶：自定义应用信息

如果你想修改应用名称和图标，需要在 `app.json` 文件中配置：

```json
{
  "expo": {
    "name": "液气价格统计",
    "slug": "gas-liquid-stats",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "android": {
      "package": "com.yourcompany.gasliquid",
      "versionCode": 1
    }
  }
}
```

---

## 📞 需要帮助？

如果遇到任何问题：
1. 截图错误信息
2. 告诉我具体在哪一步卡住了
3. 我会帮你逐一解决

---

## 🔄 备用方案

如果 Expo Snack 无法使用，还有以下方案：

### 方案 1: WebIntoApp（在线工具）
网址：https://webintoapp.com
步骤：
1. 输入网址：`https://gas-liquid-app.loca.lt`
2. 填写应用名称
3. 点击"Create App"
4. 下载生成的 APK

### 方案 2: Gonative（专业工具）
网址：https://gonative.io
步骤：
1. 输入网址
2. 选择功能
3. 构建 APK

### 方案 3: 找朋友帮忙
如果你有朋友是程序员：
1. 把项目代码发给他
2. 让他用 Android Studio 构建
3. 或者用 Expo CLI 构建

---

**祝你好运！🎉**
