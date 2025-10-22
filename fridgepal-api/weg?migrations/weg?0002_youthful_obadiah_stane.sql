ALTER TABLE `recipe_categories` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `recipe_categories` ADD PRIMARY KEY(`recipe_id`,`category_id`);--> statement-breakpoint
ALTER TABLE `recipes` MODIFY COLUMN `description` text;--> statement-breakpoint
ALTER TABLE `recipes` MODIFY COLUMN `time` int unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `user_favorite_recipes` ADD `user_id` int unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `user_favorite_recipes` ADD CONSTRAINT `user_favorite_recipes_recipe_id_recipes_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_favorite_recipes` ADD CONSTRAINT `user_favorite_recipes_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;
