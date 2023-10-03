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
    getBookmarkById(userId: number, bookmarkId: number): import(".prisma/client").Prisma.Prisma__BookmarkClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        link: string;
        userId: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    createBookmark(userId: number, dto: CreateBookmarkDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        link: string;
        userId: number;
    }>;
    editBookMarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        link: string;
        userId: number;
    }>;
    deleteBookmarkById(userId: number, bookmarkId: number): Promise<void>;
}
