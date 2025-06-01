CREATE TABLE `companies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`logo_url` text,
	`website` text,
	`phone` text,
	`email` text,
	`address` text,
	`region` text(100),
	`category` text(100),
	`tags` text,
	`tariff_id` integer,
	`rating` real DEFAULT 0,
	`review_count` integer DEFAULT 0,
	`is_verified` integer DEFAULT 0,
	`is_active` integer DEFAULT 1,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`tariff_id`) REFERENCES `tariffs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order_responses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` integer NOT NULL,
	`company_id` integer NOT NULL,
	`message` text,
	`proposed_price` real,
	`proposed_deadline` text,
	`attachments` text,
	`status` text DEFAULT 'pending',
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`category` text(100),
	`budget` real,
	`deadline` text,
	`region` text(100),
	`requirements` text,
	`attachments` text,
	`status` text DEFAULT 'active',
	`response_count` integer DEFAULT 0,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_id` integer NOT NULL,
	`tariff_id` integer NOT NULL,
	`amount` integer NOT NULL,
	`status` text DEFAULT 'pending',
	`payment_date` text DEFAULT 'CURRENT_TIMESTAMP',
	`expires_at` text
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_id` integer NOT NULL,
	`customer_id` text NOT NULL,
	`order_id` integer,
	`rating` integer NOT NULL,
	`comment` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `tariffs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`features` text NOT NULL,
	`is_active` integer DEFAULT 1,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text,
	`first_name` text,
	`last_name` text,
	`profile_image_url` text,
	`role` text DEFAULT 'client' NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);