ALTER TABLE `users` ADD `roles` json NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `idx_user_email_unique` UNIQUE(`email`);