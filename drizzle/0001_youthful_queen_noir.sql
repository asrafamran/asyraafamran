PRAGMA foreign_keys=OFF;
--> statement-breakpoint
CREATE TABLE `__new_taaruf-categories` (
	`slug` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_taaruf-categories`("slug", "name", "created_at") SELECT "slug", "name", "created_at" FROM `taaruf-categories`;
--> statement-breakpoint
DROP TABLE `taaruf-categories`;
--> statement-breakpoint
ALTER TABLE `__new_taaruf-categories` RENAME TO `taaruf-categories`;
--> statement-breakpoint
CREATE UNIQUE INDEX `taaruf-categories_slug_unique` ON `taaruf-categories` (`slug`);
--> statement-breakpoint
CREATE TABLE `__new_taaruf-questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` text NOT NULL,
	`question_text` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `taaruf-categories`(`slug`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_taaruf-questions`("id", "category_id", "question_text", "created_at") SELECT "id", "category_id", "question_text", "created_at" FROM `taaruf-questions`;
--> statement-breakpoint
DROP TABLE `taaruf-questions`;
--> statement-breakpoint
ALTER TABLE `__new_taaruf-questions` RENAME TO `taaruf-questions`;
--> statement-breakpoint
CREATE INDEX `taaruf-questions_category_id_index` ON `taaruf-questions` (`category_id`);
--> statement-breakpoint
PRAGMA foreign_keys=ON;