#!/bin/bash

# 液气进出管理 - 永久部署脚本
# 使用方法：bash deploy-permanent.sh

set -e

echo "=========================================="
echo "🌟 永久部署 - 液气进出管理系统"
echo "=========================================="
echo ""

# 检查Supabase环境变量
if [ -z "$COZE_SUPABASE_URL" ] || [ -z "$COZE_SUPABASE_ANON_KEY" ]; then
    echo "❌ 错误：请先设置Supabase环境变量"
    echo ""
    echo "请运行以下命令："
    echo "  export COZE_SUPABASE_URL='你的Supabase URL'"
    echo "  export COZE_SUPABASE_ANON_KEY='你的anon key'"
    echo "  export COZE_SUPABASE_SERVICE_ROLE_KEY='你的service role key'"
    echo ""
    echo "然后重新运行此脚本"
    exit 1
fi

echo "✅ Supabase环境变量已设置"
echo ""

# 步骤1: 构建后端
echo "📌 步骤1: 构建后端"
echo "----------------------------------------"
cd /workspace/projects/server
npm run build
echo "✅ 后端构建完成"
echo ""

# 步骤2: 构建前端
echo "📌 步骤2: 构建前端"
echo "----------------------------------------"
cd /workspace/projects
pnpm build:web
echo "✅ 前端构建完成"
echo ""

# 步骤3: 部署前端到Netlify
echo "📌 步骤3: 部署前端到Netlify"
echo "----------------------------------------"
npx netlify-cli deploy --prod --dir=dist-web
echo ""

echo "=========================================="
echo "🎉 前端部署完成！"
echo "=========================================="
echo ""
echo "📋 接下来的步骤："
echo ""
echo "1. 部署后端到Render："
echo "   - 访问 https://render.com"
echo "   - 创建新的Web Service"
echo "   - 配置环境变量（见 server/.env.example）"
echo ""
echo "2. 修改前端配置："
echo "   - 打开 config/index.ts"
echo "   - 将 PROJECT_DOMAIN 改为你的Render地址"
echo ""
echo "3. 重新构建并部署前端："
echo "   - pnpm build:web"
echo "   - npx netlify-cli deploy --prod --dir=dist-web"
echo ""
echo "4. 生成APK："
echo "   - 访问 https://webintoapp.com"
echo "   - 输入你的Netlify地址"
echo "   - 下载APK"
echo ""
echo "📖 详细教程请查看：PERMANENT-DEPLOY-GUIDE.md"
echo ""
