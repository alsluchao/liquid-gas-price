# 📱 如何获取 Supabase 信息

## 🔍 详细步骤

### 第一步：登录 Supabase

1. 打开浏览器
2. 访问：https://supabase.com/dashboard
3. 登录你的账号

---

### 第二步：选择项目

在项目列表中，找到你的液气进出管理系统项目，点击进入。

---

### 第三步：打开设置

1. 看页面左侧的菜单
2. 找到 **⚙️ Settings**（通常在底部）
3. 点击 **API**

---

### 第四步：复制信息

你需要复制3个信息：

#### 1️⃣ Project URL
```
位置：API 页面顶部
格式：https://xxx.supabase.co
操作：点击旁边的复制按钮
```

#### 2️⃣ anon public key
```
位置：Project API keys 部分
标签：anon public
格式：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
操作：点击复制按钮
```

#### 3️⃣ service_role key
```
位置：Project API keys 部分
标签：service_role
操作：先点击 "Reveal" 按钮，然后复制显示的内容
```

---

### 第五步：发送给我

将复制的信息按以下格式发送：

```
Supabase URL: https://xxx.supabase.co
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🎯 关键位置图示

```
Supabase 控制台
│
├─ 左侧菜单
│   ├─ 📊 Table Editor
│   ├─ 🔗 SQL Editor
│   └─ ⚙️ Settings ← 点这里
│       └─ API ← 再点这里
│
└─ 主内容区
    ├─ Project URL ← 第一个要复制
    │   https://xxx.supabase.co
    │
    └─ Project API keys
        ├─ anon public ← 第二个要复制
        │   eyJhbGciOiJ...
        │
        └─ service_role ← 第三个要复制（点Reveal显示）
            eyJhbGciOiJ...
```

---

## ❓ 常见问题

### Q1: 找不到 Settings 菜单？
**A**: Settings 通常在左侧菜单的底部，图标是 ⚙️

### Q2: 找不到 API 选项？
**A**: 点击 Settings 后，会看到子菜单，API 在列表中

### Q3: service_role 显示为 ****？
**A**: 点击 "Reveal" 按钮才会显示完整内容

### Q4: 有多个项目，选哪个？
**A**: 选择你的液气进出管理系统项目，通常会有相关命名或最近创建的时间

### Q5: 忘记账号密码？
**A**: 点击登录页面的 "Forgot password" 重置

---

## 🔐 安全说明

- ✅ 这些信息用于连接数据库，是必需的
- ✅ 我只用于部署应用，不会用于其他用途
- ✅ 不会影响你的其他项目
- ❌ 不要分享给不信任的人

---

## 📞 需要帮助？

如果还是找不到，请告诉我：
1. 你能看到 Supabase 控制台吗？
2. 能看到几个项目？
3. 项目的名称是什么？

我会进一步指导你！
