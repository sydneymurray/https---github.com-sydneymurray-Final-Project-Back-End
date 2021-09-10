-- CreateTable
CREATE TABLE "Favourites" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "listing" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favourites" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourites" ADD FOREIGN KEY ("listing") REFERENCES "Listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
