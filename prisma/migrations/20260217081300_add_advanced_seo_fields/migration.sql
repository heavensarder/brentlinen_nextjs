-- AlterTable
ALTER TABLE `seosetting` ADD COLUMN `canonicalUrl` VARCHAR(191) NULL,
    ADD COLUMN `ogDescription` TEXT NULL,
    ADD COLUMN `ogTitle` VARCHAR(191) NULL,
    ADD COLUMN `robots` VARCHAR(191) NULL,
    ADD COLUMN `schemaMarkup` TEXT NULL,
    ADD COLUMN `twitterCard` VARCHAR(191) NULL;
