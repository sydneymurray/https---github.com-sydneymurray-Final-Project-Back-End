-- AlterTable
ALTER TABLE "Listings" ADD COLUMN     "albumId" INTEGER;

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "artist" TEXT NOT NULL,
    "albumname" TEXT NOT NULL,
    "coverURL" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listings" ADD FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
