-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PASTOR', 'DIACONO', 'COOPERADOR', 'LIDER', 'LEVITA', 'OVELHA', 'VISITANTE');

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "picture" TEXT,
    "hasAlliance" BOOLEAN NOT NULL DEFAULT false,
    "roles" "Role"[] DEFAULT ARRAY['VISITANTE']::"Role"[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "address_street" TEXT,
    "address_number" TEXT,
    "address_neighborhood" TEXT,
    "address_city" TEXT,
    "address_state" TEXT,
    "address_zipcode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Church" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT,
    "address_street" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "address_neighborhood" TEXT NOT NULL,
    "address_city" TEXT NOT NULL,
    "address_state" TEXT NOT NULL,
    "address_zipcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonsOnChurchs" (
    "personId" INTEGER NOT NULL,
    "churchId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonsOnChurchs_pkey" PRIMARY KEY ("personId","churchId")
);

-- CreateTable
CREATE TABLE "Auth" (
    "phoneNumber" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("phoneNumber")
);

-- CreateTable
CREATE TABLE "Departament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "leaderId" INTEGER NOT NULL,
    "description" TEXT,
    "churchId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembersOnDepartaments" (
    "memberId" INTEGER NOT NULL,
    "departamentId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MembersOnDepartaments_pkey" PRIMARY KEY ("memberId","departamentId")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "finishTime" TIMESTAMP(3) NOT NULL,
    "observations" TEXT,
    "isWorship" BOOLEAN NOT NULL DEFAULT false,
    "preacherId" INTEGER,
    "initiationId" INTEGER,
    "offertoryId" INTEGER,
    "departamentId" INTEGER,
    "churchId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizersOnEvents" (
    "organizerId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizersOnEvents_pkey" PRIMARY KEY ("organizerId","eventId")
);

-- CreateTable
CREATE TABLE "DeaconsOnEvents" (
    "deaconId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeaconsOnEvents_pkey" PRIMARY KEY ("deaconId","eventId")
);

-- CreateTable
CREATE TABLE "CooperatorsOnEvents" (
    "cooperatorId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CooperatorsOnEvents_pkey" PRIMARY KEY ("cooperatorId","eventId")
);

-- CreateTable
CREATE TABLE "PastorsOnEvents" (
    "pastorId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PastorsOnEvents_pkey" PRIMARY KEY ("pastorId","eventId")
);

-- CreateTable
CREATE TABLE "LevitesOnEvents" (
    "leviteId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LevitesOnEvents_pkey" PRIMARY KEY ("leviteId","eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_phoneNumber_key" ON "Person"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_phoneNumber_key" ON "Auth"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Departament_leaderId_key" ON "Departament"("leaderId");

-- CreateIndex
CREATE UNIQUE INDEX "Departament_churchId_key" ON "Departament"("churchId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_preacherId_key" ON "Event"("preacherId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_initiationId_key" ON "Event"("initiationId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_offertoryId_key" ON "Event"("offertoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_departamentId_key" ON "Event"("departamentId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_churchId_key" ON "Event"("churchId");

-- AddForeignKey
ALTER TABLE "PersonsOnChurchs" ADD CONSTRAINT "PersonsOnChurchs_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonsOnChurchs" ADD CONSTRAINT "PersonsOnChurchs_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departament" ADD CONSTRAINT "Departament_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departament" ADD CONSTRAINT "Departament_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembersOnDepartaments" ADD CONSTRAINT "MembersOnDepartaments_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembersOnDepartaments" ADD CONSTRAINT "MembersOnDepartaments_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_preacherId_fkey" FOREIGN KEY ("preacherId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_initiationId_fkey" FOREIGN KEY ("initiationId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_offertoryId_fkey" FOREIGN KEY ("offertoryId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "Departament"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizersOnEvents" ADD CONSTRAINT "OrganizersOnEvents_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizersOnEvents" ADD CONSTRAINT "OrganizersOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeaconsOnEvents" ADD CONSTRAINT "DeaconsOnEvents_deaconId_fkey" FOREIGN KEY ("deaconId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeaconsOnEvents" ADD CONSTRAINT "DeaconsOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CooperatorsOnEvents" ADD CONSTRAINT "CooperatorsOnEvents_cooperatorId_fkey" FOREIGN KEY ("cooperatorId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CooperatorsOnEvents" ADD CONSTRAINT "CooperatorsOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastorsOnEvents" ADD CONSTRAINT "PastorsOnEvents_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastorsOnEvents" ADD CONSTRAINT "PastorsOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LevitesOnEvents" ADD CONSTRAINT "LevitesOnEvents_leviteId_fkey" FOREIGN KEY ("leviteId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LevitesOnEvents" ADD CONSTRAINT "LevitesOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
