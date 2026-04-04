<template>
  <view class="container">
    <!-- 加载中提示 -->
    <view v-if="loading" class="loading-container">
      <view class="loading-text">正在加载...</view>
    </view>
    
    <!-- WebView 加载H5应用 -->
    <web-view 
      :src="h5Url" 
      @message="handleMessage"
      @error="handleError"
    ></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // H5应用地址（部署后替换为你的实际地址）
      h5Url: 'https://your-domain.vercel.app',
      loading: true
    }
  },
  onLoad() {
    console.log('WebView页面加载')
    // 从本地存储读取配置的H5地址
    const savedUrl = uni.getStorageSync('h5_url')
    if (savedUrl) {
      this.h5Url = savedUrl
    }
  },
  onReady() {
    // WebView 加载完成后隐藏加载提示
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
    // 接收 WebView 发送的消息
    handleMessage(event) {
      console.log('WebView消息:', event.detail.data)
    },
    // WebView 加载错误处理
    handleError(event) {
      console.error('WebView加载错误:', event)
      uni.showModal({
        title: '加载失败',
        content: '无法连接到服务器，请检查网络连接',
        showCancel: false
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  z-index: 999;
}

.loading-text {
  font-size: 16px;
  color: #666;
}
</style>
