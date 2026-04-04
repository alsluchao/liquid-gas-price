import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet, ActivityIndicator, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';

export default function App() {
  const [error, setError] = useState(false);

  const url = 'https://tricky-states-double.loca.lt';

  const handleOpenInBrowser = () => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('错误', '无法打开浏览器');
      }
    });
  };

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorTitle}>加载失败</Text>
        <Text style={styles.errorText}>应用需要网络连接才能使用</Text>
        <Text style={styles.errorHint}>请在浏览器中打开以下网址：</Text>
        <TouchableOpacity onPress={handleOpenInBrowser} style={styles.button}>
          <Text style={styles.buttonText}>在浏览器中打开</Text>
        </TouchableOpacity>
        <Text style={styles.urlText}>{url}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#1890ff" />
            <Text style={styles.loadingText}>加载中...</Text>
          </View>
        )}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        mixedContentMode="always"
        onError={() => setError(true)}
        onHttpError={() => setError(true)}
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
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorHint: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1890ff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  urlText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
