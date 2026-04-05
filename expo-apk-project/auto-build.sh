#!/bin/bash

echo "================================================"
echo "   液气价格统计 APK v2.0 自动构建脚本"
echo "================================================"
echo ""
echo "版本：2.0.0 (永久可用版)"
echo "特性：支持动态配置服务器地址"
echo ""

cd /workspace/projects/expo-apk-project

# 使用用户提供的token认证
export EXPO_TOKEN="exp_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VySWQ6MTg3NTAwMjIzNDMwIiwic2NvcGUiOiJyZWFkLWNvbGxlY3Rpb25zLCByZWFkLWFzc2V0cywgcmVhZC11cGRhdGVzLCB3cml0ZS1hc3NldHMsIHdyaXRlLWNvbGxlY3Rpb25zLCB3cml0ZS11cGRhdGVzIiwidGV4dCI6Ikp3VCIsImlhdCI6MTcxMjI3NjM4NSwiZXhwIjoxNzQzODEyMzg1fQ.8P-8JS-k_J-uZ4W1dR-IeWvT-0oGCKgLz_QJq_Nw1eM"

echo "步骤 1/4: 检查认证状态..."
npx eas whoami

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 认证失败，Token可能已过期"
    echo ""
    echo "请按以下步骤操作："
    echo "1. 访问：https://expo.dev/accounts/alsluchao/settings/access-tokens"
    echo "2. 创建新的 Access Token"
    echo "3. 将新 Token 发送给我"
    echo ""
    exit 1
fi

echo ""
echo "✅ 认证成功"
echo ""

echo "步骤 2/4: 开始构建 APK..."
echo ""

npx eas build --platform android --profile preview --no-wait

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 构建启动失败"
    exit 1
fi

echo ""
echo "✅ 构建已启动"
echo ""

echo "步骤 3/4: 等待构建完成..."
echo "您也可以访问以下链接查看进度："
echo "https://expo.dev/accounts/alsluchao/projects/liquid-gas-app/builds"
echo ""

# 等待并获取构建状态
for i in {1..60}; do
    sleep 10
    STATUS=$(npx eas build:list --platform android --limit 1 --json 2>/dev/null | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4)
    
    if [ "$STATUS" = "FINISHED" ]; then
        echo "✅ 构建完成！"
        echo ""
        echo "步骤 4/4: 获取下载链接..."
        DOWNLOAD_URL=$(npx eas build:list --platform android --limit 1 --json 2>/dev/null | grep -o '"artifacts":{[^}]*}' | grep -o '"buildUrl":"[^"]*"' | cut -d'"' -f4)
        
        echo ""
        echo "==========================================="
        echo "   🎉 APK 下载链接"
        echo "==========================================="
        echo ""
        echo "$DOWNLOAD_URL"
        echo ""
        echo "==========================================="
        echo ""
        exit 0
    fi
    
    echo "[$i/60] 构建状态: $STATUS"
done

echo ""
echo "构建时间较长，请稍后访问："
echo "https://expo.dev/accounts/alsluchao/projects/liquid-gas-app/builds"
