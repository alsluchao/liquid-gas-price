#!/bin/bash

# APK v2.0 构建脚本
# 永久可用版本 - 支持动态配置服务器地址

echo "==================================="
echo "液气价格统计 APK v2.0 构建脚本"
echo "==================================="
echo ""

# 进入项目目录
cd /workspace/projects/expo-apk-project

# 检查 EAS CLI
if ! command -v eas &> /dev/null; then
    echo "正在安装 EAS CLI..."
    npm install -g eas-cli
fi

# 检查登录状态
echo "检查登录状态..."
eas whoami

if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  需要登录 Expo 账号"
    echo "账号：alsluchao"
    echo "密码：33998278@qq.com"
    echo ""
    echo "请运行: eas login"
    echo "然后重新运行此脚本"
    exit 1
fi

# 开始构建
echo ""
echo "开始构建 APK v2.0..."
echo "版本特性：支持动态配置服务器地址"
echo ""

eas build --platform android --profile preview

echo ""
echo "构建完成后，可以在这里下载 APK："
echo "https://expo.dev/accounts/alsluchao/projects/liquid-gas-app/builds"
