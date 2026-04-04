# 权限管理系统使用指南

## 权限说明

系统现在支持管理员和普通用户两种角色：

### 👤 普通用户权限
- ✅ 查看所有记录
- ✅ 录入新数据
- ✅ 导出Excel
- ❌ 编辑记录
- ❌ 删除记录

### 👑 管理员权限
- ✅ 查看所有记录
- ✅ 录入新数据
- ✅ 导出Excel
- ✅ 编辑记录
- ✅ 删除记录
- ✅ 管理用户权限

## 设置管理员

### 方法一：通过数据库直接设置（推荐）

1. 获取用户的 User ID（首次访问系统时会显示）
2. 在数据库中执行：

```sql
INSERT INTO user_roles (user_id, role) 
VALUES ('用户的UUID', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

### 方法二：使用 API 接口

需要已经是管理员才能调用此接口：

```bash
curl -X POST http://localhost:3000/api/gas-liquid/set-admin \
  -H "Content-Type: application/json" \
  -H "x-user-id: 当前管理员的用户ID" \
  -d '{"userId": "要设置为管理员的用户ID"}'
```

## 前端集成说明

### 检查是否是管理员

```typescript
const checkAdmin = async (userId: string) => {
  const res = await Network.request({
    url: '/api/gas-liquid/check-admin',
    header: { 'x-user-id': userId }
  });
  return res.data.data.isAdmin;
};
```

### 根据权限显示/隐藏功能

```typescript
const [isAdmin, setIsAdmin] = useState(false);

// 在组件中根据 isAdmin 决定是否显示编辑/删除按钮
{isAdmin && (
  <Button onClick={() => handleEdit(record)}>编辑</Button>
)}
```

## 权限验证流程

### 数据库层面（RLS）
1. 所有用户都可以 SELECT 和 INSERT
2. 只有管理员可以 UPDATE 和 DELETE
3. 通过 `is_admin()` 函数判断用户角色
4. RLS 策略自动拦截非管理员操作

### 应用层面
1. 用户首次访问时生成唯一 ID（存储在本地）
2. 后端通过 `x-user-id` header 识别用户
3. 前端根据权限显示不同界面

## 快速开始

### 1. 首次使用
- 打开系统，记录显示的用户 ID
- 联系管理员将自己设置为管理员

### 2. 日常使用
- 普通用户：直接录入数据
- 管理员：输入管理员密码后可编辑删除

## 安全建议

1. **定期审计权限**：定期检查 `user_roles` 表，移除不必要的管理员
2. **使用强密码**：如果使用密码验证，确保密码强度
3. **日志记录**：所有敏感操作都会记录在日志中
4. **备份数据**：定期备份重要数据

## 升级到完整认证系统

如果需要更完善的用户管理，可以升级到 Supabase Auth：
- 用户注册/登录
- 密码找回
- 多因素认证
- 社交账号登录

## 技术实现细节

### RLS 策略配置
```sql
-- 判断是否为管理员
CREATE FUNCTION is_admin() RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 记录表权限
CREATE POLICY "所有人可读" ON gas_liquid_records FOR SELECT USING (true);
CREATE POLICY "所有人可插入" ON gas_liquid_records FOR INSERT WITH CHECK (true);
CREATE POLICY "仅管理员可更新" ON gas_liquid_records FOR UPDATE USING (is_admin());
CREATE POLICY "仅管理员可删除" ON gas_liquid_records FOR DELETE USING (is_admin());
```

### 前端权限判断
- 使用 `localStorage` 存储用户 ID 和登录状态
- 每次操作前检查权限
- 根据权限动态渲染 UI

## 常见问题

**Q: 我忘记了自己的 User ID 怎么办？**
A: User ID 存储在浏览器本地存储中，清除浏览器数据后会生成新的 ID。

**Q: 如何查看所有管理员？**
A: 执行 SQL: `SELECT * FROM user_roles WHERE role = 'admin';`

**Q: 管理员密码在哪里设置？**
A: 简化版使用固定密码，修改 `.env` 文件中的 `ADMIN_PASSWORD` 环境变量。

**Q: 如何撤销管理员权限？**
A: 执行 SQL: `DELETE FROM user_roles WHERE user_id = '用户ID';`
