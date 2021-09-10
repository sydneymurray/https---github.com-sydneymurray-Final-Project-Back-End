-- DropForeignKey
ALTER TABLE "Listings" DROP CONSTRAINT "Listings_track_fkey";

-- AlterTable
ALTER TABLE "Listings" ALTER COLUMN "track" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Transaction_Table" (
    "id" SERIAL NOT NULL,
    "previous_ownerId" INTEGER NOT NULL,
    "new_ownerId" INTEGER NOT NULL,
    "listing" INTEGER NOT NULL,

    CONSTRAINT "Transaction_Table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listings" ADD CONSTRAINT "Listings_track_fkey" FOREIGN KEY ("track") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_Table" ADD CONSTRAINT "Transaction_Table_listing_fkey" FOREIGN KEY ("listing") REFERENCES "Listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_Table" ADD CONSTRAINT "Transaction_Table_previous_ownerId_fkey" FOREIGN KEY ("previous_ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_Table" ADD CONSTRAINT "Transaction_Table_new_ownerId_fkey" FOREIGN KEY ("new_ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
