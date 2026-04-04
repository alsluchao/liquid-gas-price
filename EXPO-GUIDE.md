# 📱 使用 Expo 生成 APK（最简单方案）

## ✅ 为什么选择 Expo？

- ✅ **免费使用**：无需付费账号
- ✅ **无需配置**：自动处理打包
- ✅ **在线构建**：云端自动生成APK
- ✅ **永久可用**：不依赖你的电脑

---

## 🚀 两种方式生成APK

### 方式A：使用 Expo 在线构建（推荐，无需安装）

**步骤**：

1. 访问 Expo Snack：https://snack.expo.dev

2. 创建新项目：
   - 点击 "Create a Snack"
   - 选择 "Blank (TypeScript)"

3. 替换代码：
   - 删除所有现有代码
   - 复制我提供的代码（见下方）

4. 构建 APK：
   - 点击右上角 "My Projects"
   - 选择你的项目
   - 点击 "Build"
   - 选择 "Android"
   - 等待构建完成（约5分钟）
   - 下载 APK

---

### 方式B：使用本地 Expo CLI（更快）

#### 1. 安装 Expo CLI

```bash
npm install -g expo-cli
```

#### 2. 进入项目目录

```bash
cd /workspace/projects/expo-app
npm install
```

#### 3. 构建 APK

```bash
# 使用 EAS Build（推荐）
npx eas-cli build --platform android --profile preview

# 或使用旧的 expo build（已弃用但仍可用）
# expo build:android -t apk
```

#### 4. 下载 APK

构建完成后，会显示下载链接。

---

## 📝 Expo Snack 代码

在 Expo Snack 中粘贴以下代码：

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

**package.json 添加依赖**：
```json
{
  "dependencies": {
    "react-native-webview": "13.8.6"
  }
}
```

---

## ⚠️ 重要说明

### 关于后端 API

当前使用的是临时后端地址，需要你的电脑一直开机。

**如果需要永久可用**：

1. 提供你的 Supabase 信息
2. 我帮你部署后端到云端
3. 更新 Expo 代码中的地址
4. 重新构建 APK

---

## 🎯 推荐方案

### 方案1：临时使用（现在就可以）
- 使用当前的 Netlify 前端地址
- 需要电脑一直开机
- 适合快速测试

### 方案2：永久使用（推荐）
1. 提供 Supabase 信息
2. 我帮你部署后端
3. 更新地址并重新构建 APK
4. 永久可用，无需电脑开机

---

## 📦 项目文件

我已经为你创建了完整的 Expo 项目：

```
/workspace/projects/expo-app/
├── app/
│   ├── index.tsx      # 主页面（WebView）
│   └── _layout.tsx    # 布局配置
├── app.json           # 应用配置
├── package.json       # 依赖配置
└── tsconfig.json      # TypeScript配置
```

---

## 🚀 立即开始

### 选择你的方式：

#### 选项1：在线构建（最简单）
1. 访问：https://snack.expo.dev
2. 创建项目并粘贴代码
3. 构建 APK 并下载

#### 选项2：本地构建
```bash
cd /workspace/projects/expo-app
npm install
npx eas-cli build --platform android --profile preview
```

#### 选项3：我帮你构建
如果你选择提供 Supabase 信息，我会：
1. 部署后端到云端
2. 更新 Expo 项目
3. 提供永久可用的 APK

---

## 💡 Expo vs 其他方案对比

| 特性 | Expo | HBuilderX | WebView套壳 |
|------|------|-----------|-------------|
| 费用 | 免费 | 免费 | 免费 |
| 账号 | 不需要 | 需要DCloud账号 | 不需要 |
| 打包速度 | 5-10分钟 | 5-10分钟 | 1-2分钟 |
| 需要环境 | 不需要 | 需要HBuilderX | 不需要 |
| 推荐度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

**Expo 是最推荐的方案！现在就可以开始构建 APK 了！** 🎉
