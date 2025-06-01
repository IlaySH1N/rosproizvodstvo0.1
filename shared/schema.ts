import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Пользователи
export const users = sqliteTable("users", {
  id: text("id").primaryKey().notNull(),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  role: text("role").notNull().default("client"), // client, company, admin
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP"),
});

// Компании
export const companies = sqliteTable("companies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  logoUrl: text("logo_url"),
  website: text("website"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  region: text("region", { length: 100 }),
  category: text("category", { length: 100 }),
  tags: text("tags"), // хранение JSON как строки
  tariffId: integer("tariff_id").references(() => tariffs.id),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
  isVerified: integer("is_verified", { mode: "boolean" }).default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(1),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP"),
});

// Заказы
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerId: text("customer_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category", { length: 100 }),
  budget: real("budget"),
  deadline: text("deadline", { mode: "date" }),
  region: text("region", { length: 100 }),
  requirements: text("requirements"),
  attachments: text("attachments"), // хранение JSON как строки
  status: text("status").default("active"),
  responseCount: integer("response_count").default(0),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP"),
});

// Отклики на заказы
export const orderResponses = sqliteTable("order_responses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("order_id").notNull(),
  companyId: integer("company_id").notNull(),
  message: text("message"),
  proposedPrice: real("proposed_price"),
  proposedDeadline: text("proposed_deadline", { mode: "date" }),
  attachments: text("attachments"), // хранение JSON как строки
  status: text("status").default("pending"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

// Отзывы
export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  companyId: integer("company_id").notNull(),
  customerId: text("customer_id").notNull(),
  orderId: integer("order_id"),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

// Тарифные планы
export const tariffs = sqliteTable("tariffs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  price: integer("price").notNull(), // цена в рублях
  features: text("features").notNull(), // хранение JSON как строки
  isActive: integer("is_active", { mode: "boolean" }).default(1),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

// ✅ Добавь таблицу `payments`
export const payments = sqliteTable("payments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  companyId: integer("company_id").notNull(),
  tariffId: integer("tariff_id").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").default("pending"), // pending, completed, failed
  paymentDate: text("payment_date").default("CURRENT_TIMESTAMP"),
  expiresAt: text("expires_at", { mode: "datetime" }),
});

// Relations

export const usersRelations = relations(users, ({ many }) => ({
  companies: many(companies),
  orders: many(orders),
  reviews: many(reviews),
}));

export const companiesRelations = relations(companies, ({ one, many }) => ({
  user: one(users, {
    fields: [companies.userId],
    references: [users.id],
  }),
  tariff: one(tariffs, {
    fields: [companies.tariffId],
    references: [tariffs.id],
  }),
  orderResponses: many(orderResponses),
  reviews: many(reviews),
  payments: many(payments), // ✅ Теперь `payments` определён
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(users, {
    fields: [orders.customerId],
    references: [users.id],
  }),
  responses: many(orderResponses),
}));

export const orderResponsesRelations = relations(orderResponses, ({ one }) => ({
  order: one(orders, {
    fields: [orderResponses.orderId],
    references: [orders.id],
  }),
  company: one(companies, {
    fields: [orderResponses.companyId],
    references: [companies.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  company: one(companies, {
    fields: [reviews.companyId],
    references: [companies.id],
  }),
  customer: one(users, {
    fields: [reviews.customerId],
    references: [users.id],
  }),
  order: one(orders, {
    fields: [reviews.orderId],
    references: [orders.id],
  }),
}));

// ✅ Добавлена таблица `payments`
export const paymentsRelations = relations(payments, ({ one }) => ({
  company: one(companies, {
    fields: [payments.companyId],
    references: [companies.id],
  }),
  tariff: one(tariffs, {
    fields: [payments.tariffId],
    references: [tariffs.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  rating: true,
  reviewCount: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  responseCount: true,
});

export const insertOrderResponseSchema = createInsertSchema(orderResponses).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export const insertTariffSchema = createInsertSchema(tariffs).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrderResponse = z.infer<typeof insertOrderResponseSchema>;
export type OrderResponse = typeof orderResponses.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertTariff = z.infer<typeof insertTariffSchema>;
export type Tariff = typeof tariffs.$inferSelect;
export type Payment = typeof payments.$inferSelect;

// Extended types with relations
export type CompanyWithTariff = Company & { tariff: Tariff | null };
export type OrderWithCustomer = Order & { customer: User };
export type OrderWithResponses = Order & {
  responses: (OrderResponse & { company: Company })[];
};
export type CompanyWithReviews = Company & {
  reviews: (Review & { customer: User })[];
};