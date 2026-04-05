#!/bin/bash

echo "========================================="
echo "   开始构建 APK v2.1"
echo "   服务器: http://115.191.1.173:5000"
echo "========================================="
echo ""

cd /workspace/projects/expo-apk-project

# 显示当前代码中的服务器地址
echo "当前服务器地址配置："
grep "SERVER_URL" App.js
echo ""
echo "========================================="
echo ""

echo "正在启动构建..."
echo "请输入您的 Expo 密码："
echo ""

npx eas build --platform android --profile preview

echo ""
echo "========================================="
echo "构建已完成！"
echo ""
echo "请访问以下链接下载 APK："
echo "https://expo.dev/accounts/alsluchao/projects/gas-liquid-stats/builds"
echo ""
echo "========================================="
