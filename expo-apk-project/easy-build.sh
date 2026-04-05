#!/bin/bash

echo "========================================="
echo "   液气价格统计 APK v2.0 构建助手"
echo "========================================="
echo ""
echo "步骤说明："
echo "1. 登录 Expo 账号"
echo "2. 启动 APK 构建"
echo "3. 获取下载链接"
echo ""
echo "========================================="
echo ""

cd /workspace/projects/expo-apk-project

echo "第一步：登录 Expo"
echo "账号：alsluchao"
echo "邮箱：33998278@qq.com"
echo ""
echo "请输入您的 Expo 密码："
echo ""

npx eas login

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 登录失败，请检查账号密码"
    exit 1
fi

echo ""
echo "✅ 登录成功"
echo ""
echo "========================================="
echo ""
echo "第二步：开始构建 APK"
echo ""
echo "构建预计需要 5-10 分钟"
echo "请耐心等待..."
echo ""

npx eas build --platform android --profile preview

echo ""
echo "========================================="
echo ""
echo "第三步：下载 APK"
echo ""
echo "访问以下链接下载 APK："
echo "https://expo.dev/accounts/alsluchao/projects/liquid-gas-app/builds"
echo ""
echo "或查看上方的下载链接"
echo ""
echo "========================================="
