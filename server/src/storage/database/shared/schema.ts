import { pgTable, serial, timestamp, varchar, integer, numeric, text, uuid, boolean, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// 用户角色表
export const userRoles = pgTable(
  "user_roles",
  {
    id: serial().primaryKey(),
    user_id: uuid("user_id").notNull().default(sql`auth.uid()`),
    role: varchar("role", { length: 20 }).notNull().default("user"), // admin 或 user
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("user_roles_user_id_idx").on(table.user_id),
  ]
);

// 液气进出记录表
export const gasLiquidRecords = pgTable(
  "gas_liquid_records",
  {
    id: serial().primaryKey(),
    date: timestamp("date", { withTimezone: true }).notNull(), // 日期
    category: varchar("category", { length: 50 }).notNull(), // 类别（氧气、氮气、液体等）
    type: varchar("type", { length: 20 }).notNull(), // 类型：进货/出货
    quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(), // 数量
    unit_price: numeric("unit_price", { precision: 10, scale: 2 }).notNull(), // 单价
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(), // 金额
    remark: text("remark"), // 备注
    
    // 新增字段
    sales_unit: varchar("sales_unit", { length: 100 }), // 销货单位
    loading_date: timestamp("loading_date", { withTimezone: true }), // 装车日期
    truck_number: varchar("truck_number", { length: 50 }), // 车号
    pickup_quantity: numeric("pickup_quantity", { precision: 10, scale: 2 }), // 提货量（吨）
    one_ticket_price: numeric("one_ticket_price", { precision: 12, scale: 2 }), // 一票制总价
    sales_amount: numeric("sales_amount", { precision: 12, scale: 2 }), // 销售金额
    liquid_unit_price: numeric("liquid_unit_price", { precision: 10, scale: 2 }), // 液单价
    service_fee_unit_price: numeric("service_fee_unit_price", { precision: 10, scale: 2 }), // 服务费单价
    payment_date: timestamp("payment_date", { withTimezone: true }), // 付款日期
    advance_payment: numeric("advance_payment", { precision: 12, scale: 2 }), // 预付款金额
    
    user_id: uuid("user_id").default(sql`auth.uid()`), // 创建用户ID（可为空，未登录时为 NULL）
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("gas_liquid_records_user_id_idx").on(table.user_id),
    index("gas_liquid_records_date_idx").on(table.date),
    index("gas_liquid_records_category_idx").on(table.category),
    index("gas_liquid_records_type_idx").on(table.type),
    index("gas_liquid_records_loading_date_idx").on(table.loading_date),
    index("gas_liquid_records_payment_date_idx").on(table.payment_date),
  ]
);

export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});
