CREATE TABLE `taaruf-categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `taaruf-categories_slug_unique` ON `taaruf-categories` (`slug`);--> statement-breakpoint
CREATE TABLE `taaruf-questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer NOT NULL,
	`question_text` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `taaruf-categories`(`id`) ON UPDATE no action ON DELETE cascade
);
