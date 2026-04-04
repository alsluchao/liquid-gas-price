import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={styles.container}>
      {loading && !error && (
        <View style={styles.loadingContainer}>
          <Text style={styles.title}>液气进出管理</Text>
          <ActivityIndicator size="large" color="#1890ff" />
          <Text style={styles.loadingText}>正在加载...</Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>⚠️ 加载失败</Text>
          <Text style={styles.errorText}>请检查网络连接</Text>
          <Text style={styles.errorText}>确保电脑保持开机</Text>
        </View>
      )}
      
      <WebView
        source={{ 
          uri: 'https://gas-liquid-final.loca.lt'
        }}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1890ff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1890ff',
    zIndex: 999,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  loadingText: {
    fontSize: 16,
    color: 'white',
    marginTop: 20,
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 999,
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5222d',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  webview: {
    flex: 1,
  },
});
