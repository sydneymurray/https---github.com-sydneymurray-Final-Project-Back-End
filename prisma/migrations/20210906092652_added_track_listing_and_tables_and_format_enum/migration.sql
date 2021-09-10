-- CreateEnum
CREATE TYPE "Format" AS ENUM ('DUBPLATE', 'MP3', 'VINYL6', 'VINAL7', 'VINAL10', 'VINAL12');

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "artistName" VARCHAR(255) NOT NULL,
    "trackName" VARCHAR(255) NOT NULL,
    "coverURL" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listings" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "track" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "forSale" BOOLEAN NOT NULL DEFAULT true,
    "notes" VARCHAR(255) NOT NULL,
    "condition" VARCHAR(255) NOT NULL,
    "format" "Format" NOT NULL DEFAULT E'MP3',
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listings" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listings" ADD FOREIGN KEY ("track") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
