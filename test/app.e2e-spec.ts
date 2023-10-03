import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { CreateBookmarkDto } from '../src/bookmark/dto';
import { EditBookmarkDto } from '../src/bookmark/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );
    await app.init();
    await app.listen(3001);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });
  
  afterAll(async () => {
    app.close();
  });
  // AUTHENTICATION TESTS
  describe ('Auth', () => {
    const dto: AuthDto = {
      email: 'jane@gmail.com',
      password: 'pass123'
    }
    describe('Signup', () => {
      it ('should throw if email empty', () => {
        return pactum.spec().post('http://localhost:3001/auth/signup').withBody({password: dto.password}).expectStatus(400);
      });
      it ('should throw if password empty', () => {
        return pactum.spec().post('http://localhost:3001/auth/signup').withBody({email: dto.email}).expectStatus(400);
      });
      it ('should throw if body is missing', () => {
        return pactum.spec().post('http://localhost:3001/auth/signup').expectStatus(400);
      });
      it('should sign up', () => {
        return pactum.spec().post('http://localhost:3001/auth/signup').withBody(dto).expectStatus(201);
      });
    });
    describe('Signin', () => {
      let accessToken: string;
      it ('should throw if email empty', () => {
        return pactum.spec().post('http://localhost:3001/auth/signin').withBody({password: dto.password}).expectStatus(400);
      });
      it ('should throw if password empty', () => {
        return pactum.spec().post('http://localhost:3001/auth/signin').withBody({email: dto.email}).expectStatus(400);
      });
      it ('should throw if body is missing', () => {
        return pactum.spec().post('http://localhost:3001/auth/signin').expectStatus(400);
      });
      it ('should sign in', () => {
        return pactum.spec().post('http://localhost:3001/auth/signin').withBody(dto).expectStatus(200).stores('userAt', 'access_token');
      });
    });
  });
  // USER TESTS
  describe ('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum.spec().get('http://localhost:3001/users/me').withHeaders({
          Authorization: 'Bearer $S{userAt}',
        }).expectStatus(200);
      });
    });
    describe('Edit user', () => {
      it('should edit current user', () => {
        const dto: EditUserDto = {
          firstName: "Marco",
          lastName: "Sebastiani",
          email: "peace@gmail.com"
        };
        return pactum.spec().patch('http://localhost:3001/users').withHeaders({
          Authorization: 'Bearer $S{userAt}',
        }).withBody(dto).expectStatus(200).expectBodyContains(dto.firstName).expectBodyContains(dto.email);
      });
    });
  });
  // BOOKMARKS TESTS
  describe ('Boookmarks', () => {
    describe('Get Empty Bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum.spec().get('http://localhost:3001/bookmarks').withHeaders({
          Authorization: 'Bearer $S{userAt}',
        }).expectStatus(200).expectBody([]);
      });
    });
    describe('Create Bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'First Bookmark',
        link: 'https://github.com/Marco177171',
      };
      it('should create a bookmark', () => {
        return pactum.spec().post('http://localhost:3001/bookmarks').withHeaders({
          Authorization: 'Bearer $S{userAt}',
        }).withBody(dto).expectStatus(201).stores('bookmarkId', 'id');
      });
    });
    describe('Get Bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum.spec().get('http://localhost:3001/bookmarks').withHeaders({
          Authorization: 'Bearer $S{userAt}',
        }).expectStatus(200).expectJsonLength(1);
      });
    });
    describe('Get Bookmark By id', () => {
      it('should get bookmark by id', () => {
        return pactum.spec()
        .get('http://localhost:3001/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        }).expectStatus(200).expectBodyContains('$S{bookmarkId}');
      });
    });
    describe('Edit Bookmark by id', () => {
      const dto: EditBookmarkDto = {
        title: 'This is a test title. It will replace the previous one',
        description: 'This is a test description. It will replace the previous one',
      }
      it('should edit bookmark', () => {
        return pactum.spec()
        .patch('http://localhost:3001/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        }).withBody(dto).expectStatus(200).expectBodyContains(dto.title).expectBodyContains(dto.description);
      });
    });
    describe('Delete Bookmark by id', () => {
      it('should delete bookmark', () => {
        return pactum.spec()
        .delete('http://localhost:3001/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        }).expectStatus(200);
      });
      it('should get bookmarks', () => {
        return pactum.spec().get('http://localhost:3001/bookmarks').withHeaders({
          Authorization: 'Bearer $S{userAt}',
        }).expectStatus(200).expectJsonLength(0);
      });
    });
  });
});