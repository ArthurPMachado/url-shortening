/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShortLinks" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "client_id" TEXT,

    CONSTRAINT "ShortLinks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ShortLinks_code_key" ON "ShortLinks"("code");

-- AddForeignKey
ALTER TABLE "ShortLinks" ADD CONSTRAINT "ShortLinks_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
