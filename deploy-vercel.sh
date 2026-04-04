#!/bin/bash

# 液气进出管理 - 一键部署脚本
# 使用方法：bash deploy-vercel.sh

set -e

echo "=========================================="
echo "🚀 开始部署液气进出管理系统到 Vercel"
echo "=========================================="
echo ""

# 检查是否安装了 vercel
if ! command -v vercel &> /dev/null
then
    echo "❌ 未检测到 Vercel CLI，正在安装..."
    npm install -g vercel
    echo "✅ Vercel CLI 安装完成"
fi

echo ""
echo "📌 步骤1: 登录 Vercel"
echo "----------------------------------------"
vercel login

echo ""
echo "📌 步骤2: 构建H5应用"
echo "----------------------------------------"
echo "正在构建..."
pnpm build:web
echo "✅ 构建完成"

echo ""
echo "📌 步骤3: 部署到 Vercel"
echo "----------------------------------------"
echo "正在部署..."
vercel --prod

echo ""
echo "=========================================="
echo "🎉 部署完成！"
echo "=========================================="
echo ""
echo "📋 接下来的步骤："
echo "1. 复制上面显示的网址（例如：https://gas-liquid-app-xxx.vercel.app）"
echo "2. 打开文件：uniapp-webview/pages/index/index.vue"
echo "3. 修改第11行的 h5Url 为你的网址"
echo "4. 用 HBuilderX 打开 uniapp-webview 文件夹"
echo "5. 右键项目 → 发行 → 原生App-云打包"
echo "6. 等待打包完成，下载APK安装"
echo ""
echo "📖 详细教程请查看：UNIAPP-DEPLOY-GUIDE.md"
echo ""
