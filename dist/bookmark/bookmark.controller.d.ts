import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
export declare class BookmarkController {
    private bookmarkService;
    constructor(bookmarkService: BookmarkService);
    getBookmarks(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        link: string;
        userId: number;
    }[]>;
    getBookmarkById(userId: number, bookmarkId: number): any;
    createBookmark(userId: number, dto: CreateBookmarkDto): any;
    editBookMarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto): any;
    deleteBookmarkById(userId: number, bookmarkId: number): any;
}
