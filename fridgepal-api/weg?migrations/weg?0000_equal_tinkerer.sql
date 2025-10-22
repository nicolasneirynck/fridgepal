CREATE TABLE `ingredients` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `ingredients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`imageUrl` varchar(255),
	`time` int,
	`created_by` int unsigned NOT NULL,
	CONSTRAINT `recipes_id` PRIMARY KEY(`id`)
);
