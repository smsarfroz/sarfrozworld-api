-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likedByUsers" INTEGER[];

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
