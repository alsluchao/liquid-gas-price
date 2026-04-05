import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  Alert,
  AsyncStorage
} from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

// 默认服务器地址（当前 IP）
const DEFAULT_SERVER = 'http://9.128.54.29:5000';

export default function App() {
  const [serverUrl, setServerUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServerUrl();
  }, []);

  const loadServerUrl = async () => {
    try {
      const savedUrl = await AsyncStorage.getItem('serverUrl');
      if (savedUrl) {
        setServerUrl(savedUrl);
        setInputUrl(savedUrl);
      } else {
        // 首次使用，显示配置页面
        setShowConfig(true);
        setInputUrl(DEFAULT_SERVER);
      }
    } catch (error) {
      console.error('加载配置失败:', error);
      setShowConfig(true);
      setInputUrl(DEFAULT_SERVER);
    } finally {
      setIsLoading(false);
    }
  };

  const saveServerUrl = async (url) => {
    try {
      await AsyncStorage.setItem('serverUrl', url);
      setServerUrl(url);
      setShowConfig(false);
    } catch (error) {
      Alert.alert('保存失败', '无法保存服务器地址，请重试');
    }
  };

  const handleConnect = () => {
    if (!inputUrl.trim()) {
      Alert.alert('提示', '请输入服务器地址');
      return;
    }
    
    // 简单验证 URL 格式
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(inputUrl.trim())) {
      Alert.alert('格式错误', '服务器地址必须以 http:// 或 https:// 开头');
      return;
    }
    
    saveServerUrl(inputUrl.trim());
  };

  const handleReset = () => {
    Alert.alert(
      '重置配置',
      '确定要重新配置服务器地址吗？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '确定', 
          onPress: () => {
            setShowConfig(true);
          }
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  // 显示配置页面
  if (showConfig || !serverUrl) {
    return (
      <KeyboardAvoidingView 
        style={styles.configContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar style="dark" />
        <View style={styles.configContent}>
          <Text style={styles.title}>液气价格统计系统</Text>
          <Text style={styles.subtitle}>请输入服务器地址</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputUrl}
              onChangeText={setInputUrl}
              placeholder="例如: http://192.168.1.100:5000"
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handleConnect}>
            <Text style={styles.buttonText}>连接服务器</Text>
          </TouchableOpacity>
          
          <Text style={styles.hint}>
            提示：当服务器地址变化时，可重新配置{'\n'}
            当前默认地址：{DEFAULT_SERVER}
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // 显示 WebView
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* 顶部配置按钮 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleReset} style={styles.configButton}>
          <Text style={styles.configButtonText}>⚙️ 设置</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          服务器: {serverUrl.replace('http://', '').replace('https://', '')}
        </Text>
        <View style={{ width: 60 }} />
      </View>
      
      {/* WebView 内容 */}
      <WebView
        source={{ uri: serverUrl }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>正在连接服务器...</Text>
          </View>
        )}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          Alert.alert(
            '连接失败',
            `无法连接到服务器\n\n可能原因：\n1. 服务器地址已变更\n2. 网络连接异常\n\n请点击"设置"按钮更新服务器地址`,
            [{ text: '知道了' }]
          );
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('HTTP Error:', nativeEvent.statusCode);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  configButton: {
    width: 60,
    padding: 5,
  },
  configButtonText: {
    fontSize: 14,
    color: '#1890ff',
  },
  webview: {
    flex: 1,
  },
  configContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  configContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    maxWidth: 400,
    height: 50,
    backgroundColor: '#1890ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  hint: {
    marginTop: 30,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});
