-- AlterTable
ALTER TABLE `mailconfig` ADD COLUMN `adminBody` TEXT NULL,
    ADD COLUMN `adminSubject` VARCHAR(191) NOT NULL DEFAULT 'New Website Query from {{name}}',
    ADD COLUMN `customerBody` TEXT NULL,
    ADD COLUMN `customerSubject` VARCHAR(191) NOT NULL DEFAULT 'We received your message - Brent Linen';
