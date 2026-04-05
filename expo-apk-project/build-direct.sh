#!/bin/bash

echo "========================================="
echo "   APK v2.1 直接可用版构建"
echo "========================================="
echo ""
echo "服务器地址：http://115.191.1.173:5000"
echo "版本：2.1.0"
echo "特性：打开即用，无需配置"
echo ""
echo "========================================="
echo ""

cd /workspace/projects/expo-apk-project

echo "正在构建 APK..."
echo ""

npx eas build --platform android --profile preview

echo ""
echo "========================================="
echo "构建完成！"
echo ""
echo "下载地址："
echo "https://expo.dev/accounts/alsluchao/projects/gas-liquid-stats/builds"
echo ""
echo "========================================="
