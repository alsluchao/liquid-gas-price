<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style>
/* 注意：App.vue 中不能写 Tailwind CSS，只能写普通 CSS */
page {
  background-color: #f5f5f5;
}
</style>
