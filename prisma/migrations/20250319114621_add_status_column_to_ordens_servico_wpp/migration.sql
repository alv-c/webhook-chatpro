-- AlterTable
ALTER TABLE `ordens_servico_wpp` ADD COLUMN `status` ENUM('pendente', 'aberta') NOT NULL DEFAULT 'pendente';
