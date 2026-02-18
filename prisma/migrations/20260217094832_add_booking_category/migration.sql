-- AlterTable
ALTER TABLE `bookingproduct` ADD COLUMN `categoryId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `BookingCategory` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `imageRatio` VARCHAR(191) NOT NULL DEFAULT 'square',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookingProduct` ADD CONSTRAINT `BookingProduct_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `BookingCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
