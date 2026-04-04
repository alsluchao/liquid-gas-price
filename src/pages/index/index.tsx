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
import { Plus, Download, Trash, Pencil, TrendingUp, TrendingDown, DollarSign } from 'lucide-react-taro';
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
  created_at: string;
}

interface Statistics {
  total_in: number;
  total_out: number;
  profit: number;
  total_in_quantity: number;
  total_out_quantity: number;
}

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
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    type: '进货' as '进货' | '出货',
    quantity: '',
    unit_price: '',
    remark: '',
  });
  const [editFormData, setEditFormData] = useState({
    date: '',
    category: '',
    type: '进货' as '进货' | '出货',
    quantity: '',
    unit_price: '',
    remark: '',
  });

  useReady(() => {
    loadData();
  });

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
      await Network.request({
        url: '/api/gas-liquid',
        method: 'POST',
        data: {
          date: formData.date,
          category: formData.category,
          type: formData.type,
          quantity: parseFloat(formData.quantity),
          unit_price: parseFloat(formData.unit_price),
          remark: formData.remark || undefined,
        },
      });

      Taro.showToast({ title: '添加成功', icon: 'success' });
      setFormData({
        date: new Date().toISOString().split('T')[0],
        category: '',
        type: '进货',
        quantity: '',
        unit_price: '',
        remark: '',
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
    setSelectedRecord(record);
    setEditFormData({
      date: record.date.split('T')[0],
      category: record.category,
      type: record.type,
      quantity: record.quantity,
      unit_price: record.unit_price,
      remark: record.remark || '',
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedRecord) return;

    setLoading(true);
    try {
      await Network.request({
        url: `/api/gas-liquid/${selectedRecord.id}`,
        method: 'PUT',
        data: {
          date: editFormData.date,
          category: editFormData.category,
          type: editFormData.type,
          quantity: parseFloat(editFormData.quantity),
          unit_price: parseFloat(editFormData.unit_price),
          remark: editFormData.remark || undefined,
        },
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

  return (
    <View className="w-full min-h-screen bg-gray-50 pb-20">
      {/* 顶部统计卡片 */}
      <View className="bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-6 text-white">
        <Text className="block text-lg font-bold mb-4">实时统计</Text>
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
              <CardContent className="space-y-4">
                <View>
                  <Label className="block text-sm font-medium mb-2">日期</Label>
                  <View className="bg-gray-50 rounded-xl px-4 py-3">
                    <Input
                      value={formData.date}
                      onInput={(e) => setFormData({ ...formData, date: e.detail.value })}
                      className="w-full bg-transparent"
                      placeholder="YYYY-MM-DD"
                    />
                  </View>
                </View>

                <View>
                  <Label className="block text-sm font-medium mb-2">类别</Label>
                  <Input
                    placeholder="如：氧气、氮气、液体等"
                    value={formData.category}
                    onInput={(e) => setFormData({ ...formData, category: e.detail.value })}
                    className="w-full"
                  />
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

                <View>
                  <Label className="block text-sm font-medium mb-2">类型</Label>
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

                <View>
                  <Label className="block text-sm font-medium mb-2">数量</Label>
                  <Input
                    type="digit"
                    placeholder="请输入数量"
                    value={formData.quantity}
                    onInput={(e) => setFormData({ ...formData, quantity: e.detail.value })}
                    className="w-full"
                  />
                </View>

                <View>
                  <Label className="block text-sm font-medium mb-2">单价</Label>
                  <Input
                    type="digit"
                    placeholder="请输入单价"
                    value={formData.unit_price}
                    onInput={(e) => setFormData({ ...formData, unit_price: e.detail.value })}
                    className="w-full"
                  />
                </View>

                <View>
                  <Label className="block text-sm font-medium mb-2">备注（可选）</Label>
                  <Input
                    placeholder="备注信息"
                    value={formData.remark}
                    onInput={(e) => setFormData({ ...formData, remark: e.detail.value })}
                    className="w-full"
                  />
                </View>

                <Button
                  className="w-full"
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
                      </View>
                      <View className="grid grid-cols-3 gap-2 text-sm">
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
          </TabsContent>
        </Tabs>
      </View>

      {/* 编辑对话框 */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>编辑记录</DialogTitle>
          </DialogHeader>
          <View className="space-y-4">
            <View>
              <Label className="block text-sm font-medium mb-2">日期</Label>
              <View className="bg-gray-50 rounded-xl px-4 py-3">
                <Input
                  value={editFormData.date}
                  onInput={(e) => setEditFormData({ ...editFormData, date: e.detail.value })}
                  className="w-full bg-transparent"
                  placeholder="YYYY-MM-DD"
                />
              </View>
            </View>
            <View>
              <Label className="block text-sm font-medium mb-2">类别</Label>
              <Input
                value={editFormData.category}
                onInput={(e) => setEditFormData({ ...editFormData, category: e.detail.value })}
                className="w-full"
              />
            </View>
            <View>
              <Label className="block text-sm font-medium mb-2">类型</Label>
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
            <View>
              <Label className="block text-sm font-medium mb-2">数量</Label>
              <Input
                type="digit"
                value={editFormData.quantity}
                onInput={(e) => setEditFormData({ ...editFormData, quantity: e.detail.value })}
                className="w-full"
              />
            </View>
            <View>
              <Label className="block text-sm font-medium mb-2">单价</Label>
              <Input
                type="digit"
                value={editFormData.unit_price}
                onInput={(e) => setEditFormData({ ...editFormData, unit_price: e.detail.value })}
                className="w-full"
              />
            </View>
            <View>
              <Label className="block text-sm font-medium mb-2">备注</Label>
              <Input
                value={editFormData.remark}
                onInput={(e) => setEditFormData({ ...editFormData, remark: e.detail.value })}
                className="w-full"
              />
            </View>
          </View>
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
