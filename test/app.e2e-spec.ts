import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );
    await app.init();
    await app.listen(3000);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });
  
  afterAll(async () => {
    app.close();
  });
  
  describe ('Auth', () => {
    const dto: AuthDto = {
      email: 'jane@gmail.com',
      password: 'pass123'
    }
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum.spec().post('/auth/signup').withBody({password: dto.password}).expectStatus(400);
      });
      it('should sign up', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
      });
    });
    describe('Signin', () => {
      it.todo('should sign in');
    });
  });

  describe ('User', () => {
    describe('Get me', () => {

    });
    describe('Edit user', () => {

    });
  });

  describe ('Boookmarks', () => {
    describe('Create Bookmark', () => {

    });
    describe('Get Bookmarks', () => {

    });
    describe('Get Bookmark By id', () => {

    });
    describe('Edit Bookmark', () => {

    });
    describe('Delete Bookmark', () => {

    });
  });
});