-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(190) NOT NULL,
    "email" VARCHAR(190) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "profileUrl" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_groups" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" VARCHAR(190) NOT NULL,
    "passcode" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_users" (
    "id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "group_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "chat_groups_created_at_idx" ON "chat_groups"("created_at");

-- AddForeignKey
ALTER TABLE "chat_groups" ADD CONSTRAINT "chat_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_users" ADD CONSTRAINT "group_users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "chat_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
