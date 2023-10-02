import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class BookmarkService {
    private prisma;
    constructor(prisma: PrismaService);
    getBookmarks(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        link: string;
        userId: number;
    }[]>;
    getBookmarkById(userId: number, bookmarkId: number): void;
    createBookmark(userId: number, dto: CreateBookmarkDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        link: string;
        userId: number;
    }>;
    editBookMarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto): void;
    deleteBookmarkById(userId: number, bookmarkId: number): void;
}
