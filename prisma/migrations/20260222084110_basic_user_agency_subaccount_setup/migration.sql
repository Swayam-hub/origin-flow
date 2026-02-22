-- CreateEnum
CREATE TYPE "Role" AS ENUM ('AGENCY_OWNER', 'AGENCY_ADMIN', 'SUBACCOUNT_USER', 'SUBACCOUNT_ADMIN');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('REVOKED', 'PENDING', 'ACCEPTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "image" TEXT,
    "trial" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'SUBACCOUNT_USER',
    "agencyId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL,
    "connectedAccountId" TEXT DEFAULT '',
    "customerId" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "agencyLogo" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL DEFAULT '',
    "whiteLabel" BOOLEAN NOT NULL DEFAULT true,
    "address" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "state" TEXT NOT NULL DEFAULT '',
    "zipCode" TEXT NOT NULL DEFAULT '',
    "country" TEXT NOT NULL DEFAULT '',
    "goal" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAccount" (
    "id" TEXT NOT NULL,
    "connectedAccountId" TEXT DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "subAccountLogo" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL DEFAULT '',
    "whiteLabel" BOOLEAN NOT NULL DEFAULT true,
    "address" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "state" TEXT NOT NULL DEFAULT '',
    "zipCode" TEXT NOT NULL DEFAULT '',
    "country" TEXT NOT NULL DEFAULT '',
    "goal" INTEGER NOT NULL DEFAULT 5,
    "agencyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "role" "Role" NOT NULL DEFAULT 'SUBACCOUNT_USER',

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notification" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "subAccountId" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencySidebarOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Menu',
    "icon" TEXT NOT NULL DEFAULT 'info',
    "link" TEXT NOT NULL DEFAULT '#',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agencyId" TEXT NOT NULL,

    CONSTRAINT "AgencySidebarOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAccountSidebarOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Menu',
    "icon" TEXT NOT NULL DEFAULT 'info',
    "link" TEXT NOT NULL DEFAULT '#',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subAccountId" TEXT NOT NULL,

    CONSTRAINT "SubAccountSidebarOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subAccountId" TEXT NOT NULL,
    "access" BOOLEAN NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pipeline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subAccountId" TEXT NOT NULL,

    CONSTRAINT "Pipeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lane" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pipelineId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Lane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "laneId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "value" DECIMAL(65,30),
    "description" TEXT,
    "customerId" TEXT,
    "assignedUserId" TEXT,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subAccountId" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subAccountId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToTicket" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TagToTicket_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_agencyId_idx" ON "User"("agencyId");

-- CreateIndex
CREATE INDEX "SubAccount_agencyId_idx" ON "SubAccount"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_email_key" ON "Invitation"("email");

-- CreateIndex
CREATE INDEX "Invitation_agencyId_idx" ON "Invitation"("agencyId");

-- CreateIndex
CREATE INDEX "Notification_agencyId_idx" ON "Notification"("agencyId");

-- CreateIndex
CREATE INDEX "Notification_subAccountId_idx" ON "Notification"("subAccountId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "AgencySidebarOption_agencyId_idx" ON "AgencySidebarOption"("agencyId");

-- CreateIndex
CREATE INDEX "SubAccountSidebarOption_subAccountId_idx" ON "SubAccountSidebarOption"("subAccountId");

-- CreateIndex
CREATE INDEX "Permissions_subAccountId_idx" ON "Permissions"("subAccountId");

-- CreateIndex
CREATE INDEX "Permissions_email_idx" ON "Permissions"("email");

-- CreateIndex
CREATE INDEX "Pipeline_subAccountId_idx" ON "Pipeline"("subAccountId");

-- CreateIndex
CREATE INDEX "Lane_pipelineId_idx" ON "Lane"("pipelineId");

-- CreateIndex
CREATE INDEX "Ticket_laneId_idx" ON "Ticket"("laneId");

-- CreateIndex
CREATE INDEX "Contact_subAccountId_idx" ON "Contact"("subAccountId");

-- CreateIndex
CREATE INDEX "Tag_subAccountId_idx" ON "Tag"("subAccountId");

-- CreateIndex
CREATE INDEX "_TagToTicket_B_index" ON "_TagToTicket"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAccount" ADD CONSTRAINT "SubAccount_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencySidebarOption" ADD CONSTRAINT "AgencySidebarOption_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAccountSidebarOption" ADD CONSTRAINT "SubAccountSidebarOption_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pipeline" ADD CONSTRAINT "Pipeline_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lane" ADD CONSTRAINT "Lane_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "Pipeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_laneId_fkey" FOREIGN KEY ("laneId") REFERENCES "Lane"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTicket" ADD CONSTRAINT "_TagToTicket_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTicket" ADD CONSTRAINT "_TagToTicket_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
