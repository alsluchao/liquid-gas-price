import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

// 服务器地址（直接硬编码）
const SERVER_URL = 'http://115.191.1.173:5000';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hasError: false,
      errorMessage: ''
    };
  }

  handleLoadStart = () => {
    this.setState({ isLoading: true, hasError: false });
  };

  handleLoadEnd = () => {
    this.setState({ isLoading: false });
  };

  handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
    
    this.setState({
      isLoading: false,
      hasError: true,
      errorMessage: `连接失败：${nativeEvent.description || '服务器无响应'}`
    });

    Alert.alert(
      '连接失败',
      '无法连接到服务器，请检查网络连接或联系管理员',
      [{ text: '知道了' }]
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        
        <WebView
          source={{ uri: SERVER_URL }}
          style={styles.webview}
          startInLoadingState={true}
          onLoadStart={this.handleLoadStart}
          onLoadEnd={this.handleLoadEnd}
          onError={this.handleError}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1890ff" />
              <Text style={styles.loadingText}>正在连接服务器...</Text>
              <Text style={styles.hintText}>服务器地址：{SERVER_URL}</Text>
            </View>
          )}
        />

        {this.state.hasError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>❌ {this.state.errorMessage}</Text>
            <Text style={styles.hintText}>请检查网络连接或联系管理员</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
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
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
  hintText: {
    marginTop: 10,
    fontSize: 12,
    color: '#999',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 77, 79, 0.9)',
    borderRadius: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
