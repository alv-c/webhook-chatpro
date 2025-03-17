-- CreateTable
CREATE TABLE `ordens_servico_wpp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_json` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
