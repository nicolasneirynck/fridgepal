CREATE TABLE `categories` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `instructions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`amount` int unsigned NOT NULL,
	`description` text NOT NULL,
	`recipe_id` int unsigned NOT NULL,
	CONSTRAINT `instructions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipe_categories` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`recipe_id` int unsigned NOT NULL,
	`category_id` int unsigned NOT NULL,
	CONSTRAINT `recipe_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipe_ingredients` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`amount` int unsigned,
	`firstName` varchar(255),
	`recipe_id` int unsigned NOT NULL,
	`ingredient_id` int unsigned NOT NULL,
	CONSTRAINT `recipe_ingredients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saved_recipes` (
	`recipe_id` int unsigned NOT NULL,
	`notes` text
);
--> statement-breakpoint
CREATE TABLE `user_recipe_ratings` (
	`rating` int unsigned NOT NULL,
	`recipe_id` int unsigned NOT NULL,
	`user_id` int unsigned NOT NULL,
	CONSTRAINT `user_recipe_ratings_recipe_id_user_id_pk` PRIMARY KEY(`recipe_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`userName` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`country` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `recipes` MODIFY COLUMN `time` int unsigned;--> statement-breakpoint
ALTER TABLE `recipes` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `instructions` ADD CONSTRAINT `instructions_recipe_id_recipes_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipe_categories` ADD CONSTRAINT `recipe_categories_recipe_id_recipes_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipe_categories` ADD CONSTRAINT `recipe_categories_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipe_ingredients` ADD CONSTRAINT `recipe_ingredients_recipe_id_recipes_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipe_ingredients` ADD CONSTRAINT `recipe_ingredients_ingredient_id_ingredients_id_fk` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `saved_recipes` ADD CONSTRAINT `saved_recipes_recipe_id_recipes_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_recipe_ratings` ADD CONSTRAINT `user_recipe_ratings_recipe_id_recipes_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_recipe_ratings` ADD CONSTRAINT `user_recipe_ratings_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipes` ADD CONSTRAINT `recipes_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;