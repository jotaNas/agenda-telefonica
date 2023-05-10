/*
  Warnings:

  - Changed the type of `idade` on the `Contato` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Contato" DROP COLUMN "idade",
ADD COLUMN     "idade" INTEGER NOT NULL;
