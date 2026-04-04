import { View, Text } from '@tarojs/components';
import Taro, { useReady } from '@tarojs/taro';
import { useState } from 'react';
import { Network } from '@/network';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Download, Trash, Pencil, TrendingUp, TrendingDown, DollarSign, Shield } from 'lucide-react-taro';
import './index.css';

interface GasLiquidRecord {
  id: number;
  date: string;
  category: string;
  type: '进货' | '出货';
  quantity: string;
  unit_price: string;
  amount: string;
  remark: string | null;
  sales_unit?: string | null;
  loading_date?: string | null;
  truck_number?: string | null;
  pickup_quantity?: string | null;
  one_ticket_price?: string | null;
  sales_amount?: string | null;
  liquid_unit_price?: string | null;
  service_fee_unit_price?: string | null;
  payment_date?: string | null;
  advance_payment?: string | null;
  created_at: string;
}

interface Statistics {
  total_in: number;
  total_out: number;
  profit: number;
  total_in_quantity: number;
  total_out_quantity: number;
}

const USER_ID_KEY = 'gas_liquid_user_id';
const ADMIN_PASSWORD = 'admin123'; // 管理员密码，实际项目中应该从后端验证

const IndexPage = () => {
  const [records, setRecords] = useState<GasLiquidRecord[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [statistics, setStatistics] = useState<Statistics>({
    total_in: 0,
    total_out: 0,
    profit: 0,
    total_in_quantity: 0,
    total_out_quantity: 0,
  });
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<GasLiquidRecord | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    type: '进货' as '进货' | '出货',
    quantity: '',
    unit_price: '',
    remark: '',
    sales_unit: '',
    loading_date: '',
    truck_number: '',
    pickup_quantity: '',
    one_ticket_price: '',
    sales_amount: '',
    liquid_unit_price: '',
    service_fee_unit_price: '',
    payment_date: '',
    advance_payment: '',
  });
  const [editFormData, setEditFormData] = useState({
    date: '',
    category: '',
    type: '进货' as '进货' | '出货',
    quantity: '',
    unit_price: '',
    remark: '',
    sales_unit: '',
    loading_date: '',
    truck_number: '',
    pickup_quantity: '',
    one_ticket_price: '',
    sales_amount: '',
    liquid_unit_price: '',
    service_fee_unit_price: '',
    payment_date: '',
    advance_payment: '',
  });

  useReady(() => {
    initUser();
  });

  const initUser = async () => {
    // 获取或创建用户ID
    let storedUserId = Taro.getStorageSync(USER_ID_KEY);
    if (!storedUserId) {
      // 生成一个简单的用户ID（实际项目中应该使用更安全的方式）
      storedUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      Taro.setStorageSync(USER_ID_KEY, storedUserId);
    }
    setUserId(storedUserId);

    // 检查是否是管理员
    try {
      const res = await Network.request({
        url: '/api/gas-liquid/check-admin',
        header: { 'x-user-id': storedUserId }
      });
      setIsAdmin(res.data.data.isAdmin);
    } catch (error) {
      console.error('检查权限失败:', error);
    }

    loadData();
  };

  const handleAdminLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowPasswordDialog(false);
      setPassword('');
      Taro.showToast({ title: '管理员登录成功', icon: 'success' });
    } else {
      Taro.showToast({ title: '密码错误', icon: 'error' });
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [recordsRes, statsRes, categoriesRes] = await Promise.all([
        Network.request({ url: '/api/gas-liquid' }),
        Network.request({ url: '/api/gas-liquid/statistics' }),
        Network.request({ url: '/api/gas-liquid/categories' }),
      ]);
      
      setRecords(recordsRes.data.data || []);
      setStatistics(statsRes.data.data || statistics);
      setCategories(categoriesRes.data.data || []);
    } catch (error) {
      console.error('加载数据失败:', error);
      Taro.showToast({ title: '加载失败', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.category || !formData.quantity || !formData.unit_price) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }

    setLoading(true);
    try {
      const submitData: any = {
        date: formData.date,
        category: formData.category,
        type: formData.type,
        quantity: parseFloat(formData.quantity),
        unit_price: parseFloat(formData.unit_price),
      };

      // 添加可选字段
      if (formData.remark) submitData.remark = formData.remark;
      if (formData.sales_unit) submitData.sales_unit = formData.sales_unit;
      if (formData.loading_date) submitData.loading_date = formData.loading_date;
      if (formData.truck_number) submitData.truck_number = formData.truck_number;
      if (formData.pickup_quantity) submitData.pickup_quantity = parseFloat(formData.pickup_quantity);
      if (formData.one_ticket_price) submitData.one_ticket_price = parseFloat(formData.one_ticket_price);
      if (formData.sales_amount) submitData.sales_amount = parseFloat(formData.sales_amount);
      if (formData.liquid_unit_price) submitData.liquid_unit_price = parseFloat(formData.liquid_unit_price);
      if (formData.service_fee_unit_price) submitData.service_fee_unit_price = parseFloat(formData.service_fee_unit_price);
      if (formData.payment_date) submitData.payment_date = formData.payment_date;
      if (formData.advance_payment) submitData.advance_payment = parseFloat(formData.advance_payment);

      await Network.request({
        url: '/api/gas-liquid',
        method: 'POST',
        data: submitData,
      });

      Taro.showToast({ title: '添加成功', icon: 'success' });
      setFormData({
        date: new Date().toISOString().split('T')[0],
        category: '',
        type: '进货',
        quantity: '',
        unit_price: '',
        remark: '',
        sales_unit: '',
        loading_date: '',
        truck_number: '',
        pickup_quantity: '',
        one_ticket_price: '',
        sales_amount: '',
        liquid_unit_price: '',
        service_fee_unit_price: '',
        payment_date: '',
        advance_payment: '',
      });
      loadData();
    } catch (error) {
      console.error('添加记录失败:', error);
      Taro.showToast({ title: '添加失败', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: GasLiquidRecord) => {
    if (!isAdmin) {
      Taro.showToast({ title: '需要管理员权限', icon: 'none' });
      return;
    }
    setSelectedRecord(record);
    setEditFormData({
      date: record.date.split('T')[0],
      category: record.category,
      type: record.type,
      quantity: record.quantity,
      unit_price: record.unit_price,
      remark: record.remark || '',
      sales_unit: record.sales_unit || '',
      loading_date: record.loading_date ? record.loading_date.split('T')[0] : '',
      truck_number: record.truck_number || '',
      pickup_quantity: record.pickup_quantity || '',
      one_ticket_price: record.one_ticket_price || '',
      sales_amount: record.sales_amount || '',
      liquid_unit_price: record.liquid_unit_price || '',
      service_fee_unit_price: record.service_fee_unit_price || '',
      payment_date: record.payment_date ? record.payment_date.split('T')[0] : '',
      advance_payment: record.advance_payment || '',
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedRecord) return;

    setLoading(true);
    try {
      const updateData: any = {
        date: editFormData.date,
        category: editFormData.category,
        type: editFormData.type,
        quantity: parseFloat(editFormData.quantity),
        unit_price: parseFloat(editFormData.unit_price),
      };

      // 添加可选字段
      if (editFormData.remark) updateData.remark = editFormData.remark;
      if (editFormData.sales_unit) updateData.sales_unit = editFormData.sales_unit;
      if (editFormData.loading_date) updateData.loading_date = editFormData.loading_date;
      if (editFormData.truck_number) updateData.truck_number = editFormData.truck_number;
      if (editFormData.pickup_quantity) updateData.pickup_quantity = parseFloat(editFormData.pickup_quantity);
      if (editFormData.one_ticket_price) updateData.one_ticket_price = parseFloat(editFormData.one_ticket_price);
      if (editFormData.sales_amount) updateData.sales_amount = parseFloat(editFormData.sales_amount);
      if (editFormData.liquid_unit_price) updateData.liquid_unit_price = parseFloat(editFormData.liquid_unit_price);
      if (editFormData.service_fee_unit_price) updateData.service_fee_unit_price = parseFloat(editFormData.service_fee_unit_price);
      if (editFormData.payment_date) updateData.payment_date = editFormData.payment_date;
      if (editFormData.advance_payment) updateData.advance_payment = parseFloat(editFormData.advance_payment);

      await Network.request({
        url: `/api/gas-liquid/${selectedRecord.id}`,
        method: 'PUT',
        data: updateData,
      });

      Taro.showToast({ title: '更新成功', icon: 'success' });
      setEditDialogOpen(false);
      setSelectedRecord(null);
      loadData();
    } catch (error) {
      console.error('更新记录失败:', error);
      Taro.showToast({ title: '更新失败', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (record: GasLiquidRecord) => {
    if (!isAdmin) {
      Taro.showToast({ title: '需要管理员权限', icon: 'none' });
      return;
    }
    setSelectedRecord(record);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRecord) return;

    setLoading(true);
    try {
      await Network.request({
        url: `/api/gas-liquid/${selectedRecord.id}`,
        method: 'DELETE',
      });

      Taro.showToast({ title: '删除成功', icon: 'success' });
      setDeleteDialogOpen(false);
      setSelectedRecord(null);
      loadData();
    } catch (error) {
      console.error('删除记录失败:', error);
      Taro.showToast({ title: '删除失败', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      Taro.showToast({ title: '正在导出...', icon: 'loading' });
      
      // 在小程序端，使用 Network.downloadFile 下载文件
      if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
        const res = await Network.downloadFile({
          url: '/api/gas-liquid/export',
        });
        
        if (res.statusCode === 200) {
          // 打开文档
          await Taro.openDocument({
            filePath: res.tempFilePath,
            fileType: 'xlsx',
          });
          Taro.showToast({ title: '导出成功', icon: 'success' });
        }
      } else {
        // H5 端直接打开下载链接
        window.open('/api/gas-liquid/export', '_blank');
        Taro.showToast({ title: '导出成功', icon: 'success' });
      }
    } catch (error) {
      console.error('导出失败:', error);
      Taro.showToast({ title: '导出失败', icon: 'error' });
    }
  };

  // 渲染输入字段
  const renderInputField = (
    label: string, 
    key: keyof typeof formData, 
    placeholder: string, 
    type?: 'text' | 'number' | 'idcard' | 'digit' | 'safe-password' | 'nickname'
  ) => {
    const value = formData[key];
    return (
      <View className="mb-3">
        <Label className="block text-sm font-medium mb-1 text-gray-700">{label}</Label>
        <View className="bg-gray-50 rounded-lg px-3 py-2">
          <Input
            type={type}
            placeholder={placeholder}
            value={value as string}
            onInput={(e) => setFormData({ ...formData, [key]: e.detail.value })}
            className="w-full bg-transparent text-sm"
          />
        </View>
      </View>
    );
  };

  // 渲染编辑输入字段
  const renderEditInputField = (
    label: string, 
    key: keyof typeof editFormData, 
    placeholder: string, 
    type?: 'text' | 'number' | 'idcard' | 'digit' | 'safe-password' | 'nickname'
  ) => {
    const value = editFormData[key];
    return (
      <View className="mb-3">
        <Label className="block text-sm font-medium mb-1 text-gray-700">{label}</Label>
        <View className="bg-gray-50 rounded-lg px-3 py-2">
          <Input
            type={type}
            placeholder={placeholder}
            value={value as string}
            onInput={(e) => setEditFormData({ ...editFormData, [key]: e.detail.value })}
            className="w-full bg-transparent text-sm"
          />
        </View>
      </View>
    );
  };

  return (
    <View className="w-full min-h-screen bg-gray-50 pb-20">
      {/* 顶部统计卡片 */}
      <View className="bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-6 text-white">
        <View className="flex justify-between items-center mb-4">
          <Text className="text-lg font-bold">液气进出管理</Text>
          <View className="flex items-center gap-2">
            {isAdmin && (
              <Badge variant="default" className="bg-green-500">
                <Shield size={14} color="#fff" />
                <Text className="ml-1">管理员</Text>
              </Badge>
            )}
            {!isAdmin && (
              <Button
                variant="outline"
                size="sm"
                className="bg-white bg-opacity-20 border-white border-opacity-40 text-white"
                onClick={() => setShowPasswordDialog(true)}
              >
                <Text className="text-xs">管理员登录</Text>
              </Button>
            )}
          </View>
        </View>
        <View className="grid grid-cols-3 gap-4">
          <View className="text-center">
            <TrendingDown size={24} className="mx-auto mb-1 opacity-80" color="#fff" />
            <Text className="block text-xs opacity-80">进货总额</Text>
            <Text className="block text-xl font-bold">¥{statistics.total_in.toFixed(2)}</Text>
          </View>
          <View className="text-center">
            <TrendingUp size={24} className="mx-auto mb-1 opacity-80" color="#fff" />
            <Text className="block text-xs opacity-80">出货总额</Text>
            <Text className="block text-xl font-bold">¥{statistics.total_out.toFixed(2)}</Text>
          </View>
          <View className="text-center">
            <DollarSign size={24} className="mx-auto mb-1 opacity-80" color="#fff" />
            <Text className="block text-xs opacity-80">利润</Text>
            <Text className={`block text-xl font-bold ${statistics.profit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              ¥{statistics.profit.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* 主要内容区域 */}
      <View className="px-4 py-4">
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="input">录入</TabsTrigger>
            <TabsTrigger value="list">记录</TabsTrigger>
            <TabsTrigger value="stats">详情</TabsTrigger>
          </TabsList>

          {/* 录入页面 */}
          <TabsContent value="input">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus size={20} color="#1890ff" />
                  <Text>添加记录</Text>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* 基础信息 */}
                <View className="mb-4">
                  <Text className="block text-base font-semibold mb-2 text-gray-800">基础信息</Text>
                  {renderInputField('日期', 'date', 'YYYY-MM-DD')}
                  
                  <View className="mb-3">
                    <Label className="block text-sm font-medium mb-1 text-gray-700">类别</Label>
                    <View className="bg-gray-50 rounded-lg px-3 py-2">
                      <Input
                        placeholder="如：氧气、氮气、液氧等"
                        value={formData.category}
                        onInput={(e) => setFormData({ ...formData, category: e.detail.value })}
                        className="w-full bg-transparent text-sm"
                      />
                    </View>
                    {categories.length > 0 && (
                      <View className="flex flex-wrap gap-2 mt-2">
                        {categories.slice(0, 5).map((cat) => (
                          <Badge
                            key={cat}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => setFormData({ ...formData, category: cat })}
                          >
                            {cat}
                          </Badge>
                        ))}
                      </View>
                    )}
                  </View>

                  <View className="mb-3">
                    <Label className="block text-sm font-medium mb-1 text-gray-700">类型</Label>
                    <View className="flex gap-2">
                      <Button
                        variant={formData.type === '进货' ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                        onClick={() => setFormData({ ...formData, type: '进货' })}
                      >
                        进货
                      </Button>
                      <Button
                        variant={formData.type === '出货' ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                        onClick={() => setFormData({ ...formData, type: '出货' })}
                      >
                        出货
                      </Button>
                    </View>
                  </View>

                  {renderInputField('数量', 'quantity', '请输入数量', 'digit')}
                  {renderInputField('单价', 'unit_price', '请输入单价', 'digit')}
                </View>

                {/* 销售信息 */}
                <View className="mb-4">
                  <Text className="block text-base font-semibold mb-2 text-gray-800">销售信息</Text>
                  {renderInputField('销货单位', 'sales_unit', '销货单位名称')}
                  {renderInputField('装车日期', 'loading_date', 'YYYY-MM-DD')}
                  {renderInputField('车号', 'truck_number', '车牌号')}
                  {renderInputField('提货量（吨）', 'pickup_quantity', '提货量', 'digit')}
                </View>

                {/* 金额信息 */}
                <View className="mb-4">
                  <Text className="block text-base font-semibold mb-2 text-gray-800">金额信息</Text>
                  {renderInputField('一票制总价', 'one_ticket_price', '一票制总价', 'digit')}
                  {renderInputField('销售金额', 'sales_amount', '销售金额', 'digit')}
                  {renderInputField('液单价', 'liquid_unit_price', '液单价', 'digit')}
                  {renderInputField('服务费单价', 'service_fee_unit_price', '服务费单价', 'digit')}
                </View>

                {/* 付款信息 */}
                <View className="mb-4">
                  <Text className="block text-base font-semibold mb-2 text-gray-800">付款信息</Text>
                  {renderInputField('付款日期', 'payment_date', 'YYYY-MM-DD')}
                  {renderInputField('预付款金额', 'advance_payment', '预付款金额', 'digit')}
                </View>

                {/* 备注 */}
                {renderInputField('备注', 'remark', '备注信息')}

                <Button
                  className="w-full mt-4"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? '提交中...' : '提交'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 记录列表 */}
          <TabsContent value="list">
            <View className="mb-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download size={16} color="#1890ff" />
                <Text>导出Excel</Text>
              </Button>
            </View>

            {records.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <Text>暂无记录</Text>
                </CardContent>
              </Card>
            ) : (
              <View className="space-y-3">
                {records.map((record) => (
                  <Card key={record.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <View className="flex justify-between items-start mb-2">
                        <View className="flex-1">
                          <View className="flex items-center gap-2 mb-1">
                            <Text className="font-semibold">{record.category}</Text>
                            <Badge variant={record.type === '进货' ? 'secondary' : 'default'}>
                              {record.type}
                            </Badge>
                          </View>
                          <Text className="text-sm text-gray-500">
                            {new Date(record.date).toLocaleDateString('zh-CN')}
                          </Text>
                        </View>
                        {/* 只有管理员才显示编辑删除按钮 */}
                        {isAdmin && (
                          <View className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(record)}
                            >
                              <Pencil size={16} color="#1890ff" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(record)}
                            >
                              <Trash size={16} color="#ff4d4f" />
                            </Button>
                          </View>
                        )}
                      </View>
                      
                      <View className="grid grid-cols-3 gap-2 text-sm mb-2">
                        <View>
                          <Text className="text-gray-500">数量</Text>
                          <Text className="font-medium">{record.quantity}</Text>
                        </View>
                        <View>
                          <Text className="text-gray-500">单价</Text>
                          <Text className="font-medium">¥{record.unit_price}</Text>
                        </View>
                        <View>
                          <Text className="text-gray-500">金额</Text>
                          <Text className="font-semibold text-blue-600">¥{record.amount}</Text>
                        </View>
                      </View>

                      {/* 显示扩展信息 */}
                      {(record.sales_unit || record.truck_number || record.pickup_quantity) && (
                        <View className="pt-2 border-t border-gray-100 mt-2">
                          {record.sales_unit && (
                            <Text className="text-xs text-gray-600">销货单位: {record.sales_unit}</Text>
                          )}
                          {record.truck_number && (
                            <Text className="text-xs text-gray-600 ml-2">车号: {record.truck_number}</Text>
                          )}
                          {record.pickup_quantity && (
                            <Text className="text-xs text-gray-600 ml-2">提货量: {record.pickup_quantity}吨</Text>
                          )}
                        </View>
                      )}

                      {record.remark && (
                        <View className="mt-2 pt-2 border-t border-gray-100">
                          <Text className="text-sm text-gray-600">备注: {record.remark}</Text>
                        </View>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </View>
            )}
          </TabsContent>

          {/* 统计详情 */}
          <TabsContent value="stats">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>详细统计</CardTitle>
              </CardHeader>
              <CardContent>
                <View className="space-y-4">
                  <View className="flex justify-between items-center py-2 border-b">
                    <Text className="text-gray-600">进货总数量</Text>
                    <Text className="font-semibold">{statistics.total_in_quantity}</Text>
                  </View>
                  <View className="flex justify-between items-center py-2 border-b">
                    <Text className="text-gray-600">进货总金额</Text>
                    <Text className="font-semibold text-red-500">¥{statistics.total_in.toFixed(2)}</Text>
                  </View>
                  <View className="flex justify-between items-center py-2 border-b">
                    <Text className="text-gray-600">出货总数量</Text>
                    <Text className="font-semibold">{statistics.total_out_quantity}</Text>
                  </View>
                  <View className="flex justify-between items-center py-2 border-b">
                    <Text className="text-gray-600">出货总金额</Text>
                    <Text className="font-semibold text-green-500">¥{statistics.total_out.toFixed(2)}</Text>
                  </View>
                  <View className="flex justify-between items-center py-3 bg-blue-50 rounded px-3">
                    <Text className="font-semibold">利润</Text>
                    <Text className={`font-bold text-lg ${statistics.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ¥{statistics.profit.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>

            {/* 用户信息 */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>用户信息</CardTitle>
              </CardHeader>
              <CardContent>
                <View className="space-y-2">
                  <View className="flex justify-between items-center">
                    <Text className="text-gray-600">用户ID</Text>
                    <Text className="text-xs text-gray-500">{userId}</Text>
                  </View>
                  <View className="flex justify-between items-center">
                    <Text className="text-gray-600">权限</Text>
                    <Badge variant={isAdmin ? 'default' : 'secondary'}>
                      {isAdmin ? '管理员' : '普通用户'}
                    </Badge>
                  </View>
                </View>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </View>

      {/* 管理员登录对话框 */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>管理员登录</DialogTitle>
          </DialogHeader>
          <View className="py-4">
            <Label className="block text-sm font-medium mb-2">请输入管理员密码</Label>
            <Input
              type="safe-password"
              placeholder="管理员密码"
              value={password}
              onInput={(e) => setPassword(e.detail.value)}
              className="w-full"
            />
          </View>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              取消
            </Button>
            <Button onClick={handleAdminLogin}>
              登录
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑对话框 */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑记录</DialogTitle>
          </DialogHeader>
          
          {/* 基础信息 */}
          <View className="mb-3">
            <Text className="block text-sm font-semibold mb-2 text-gray-800">基础信息</Text>
            {renderEditInputField('日期', 'date', 'YYYY-MM-DD')}
            
            <View className="mb-3">
              <Label className="block text-sm font-medium mb-1 text-gray-700">类别</Label>
              <View className="bg-gray-50 rounded-lg px-3 py-2">
                <Input
                  value={editFormData.category}
                  onInput={(e) => setEditFormData({ ...editFormData, category: e.detail.value })}
                  className="w-full bg-transparent text-sm"
                />
              </View>
            </View>

            <View className="mb-3">
              <Label className="block text-sm font-medium mb-1 text-gray-700">类型</Label>
              <View className="flex gap-2">
                <Button
                  variant={editFormData.type === '进货' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setEditFormData({ ...editFormData, type: '进货' })}
                >
                  进货
                </Button>
                <Button
                  variant={editFormData.type === '出货' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setEditFormData({ ...editFormData, type: '出货' })}
                >
                  出货
                </Button>
              </View>
            </View>

            {renderEditInputField('数量', 'quantity', '数量', 'digit')}
            {renderEditInputField('单价', 'unit_price', '单价', 'digit')}
          </View>

          {/* 销售信息 */}
          <View className="mb-3">
            <Text className="block text-sm font-semibold mb-2 text-gray-800">销售信息</Text>
            {renderEditInputField('销货单位', 'sales_unit', '销货单位')}
            {renderEditInputField('装车日期', 'loading_date', 'YYYY-MM-DD')}
            {renderEditInputField('车号', 'truck_number', '车牌号')}
            {renderEditInputField('提货量（吨）', 'pickup_quantity', '提货量', 'digit')}
          </View>

          {/* 金额信息 */}
          <View className="mb-3">
            <Text className="block text-sm font-semibold mb-2 text-gray-800">金额信息</Text>
            {renderEditInputField('一票制总价', 'one_ticket_price', '一票制总价', 'digit')}
            {renderEditInputField('销售金额', 'sales_amount', '销售金额', 'digit')}
            {renderEditInputField('液单价', 'liquid_unit_price', '液单价', 'digit')}
            {renderEditInputField('服务费单价', 'service_fee_unit_price', '服务费单价', 'digit')}
          </View>

          {/* 付款信息 */}
          <View className="mb-3">
            <Text className="block text-sm font-semibold mb-2 text-gray-800">付款信息</Text>
            {renderEditInputField('付款日期', 'payment_date', 'YYYY-MM-DD')}
            {renderEditInputField('预付款金额', 'advance_payment', '预付款金额', 'digit')}
          </View>

          {renderEditInputField('备注', 'remark', '备注')}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? '更新中...' : '更新'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认对话框 */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <Text className="py-4 text-gray-600">确定要删除这条记录吗？此操作不可撤销。</Text>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={loading}>
              {loading ? '删除中...' : '删除'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default IndexPage;
