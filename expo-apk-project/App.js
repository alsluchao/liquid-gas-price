import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet, ActivityIndicator, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';

export default function App() {
  // 使用内联 HTML，直接加载应用
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>液气价格统计</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 20px;
          padding: 40px 30px;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          text-align: center;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }
        .subtitle {
          font-size: 16px;
          color: #666;
          margin-bottom: 30px;
          line-height: 1.6;
        }
        .button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 15px 40px;
          border-radius: 30px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        .button:active {
          transform: scale(0.95);
        }
        .info {
          margin-top: 30px;
          padding: 20px;
          background: #f7f7f7;
          border-radius: 10px;
          font-size: 14px;
          color: #666;
          line-height: 1.8;
        }
        .link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="title">液气价格统计</div>
        <div class="subtitle">请使用浏览器访问完整功能</div>
        <button class="button" onclick="window.open('http://9.129.250.171:5000', '_blank')">在浏览器中打开</button>
        <div class="info">
          <p>📱 应用地址：</p>
          <p><strong>http://9.129.250.171:5000</strong></p>
          <p style="margin-top: 15px;">💡 使用说明：</p>
          <p>1. 确保手机和电脑在同一 WiFi</p>
          <p>2. 在浏览器中打开上述地址</p>
          <p>3. 点击验证按钮（如有）</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url.startsWith('http')) {
            Linking.openURL(request.url);
            return false;
          }
          return true;
        }}
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
});
