export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '液气进出管理' })
  : { navigationBarTitleText: '液气进出管理' }
