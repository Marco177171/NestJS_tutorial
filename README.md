# NestJS Tutorial

This tutorial is based on a video tutorial available at [YouTube](https://www.youtube.com/watch?v=GHTA143_b-s). It guides you through building a project using NestJS, a powerful Node.js framework.

## Project Initialization

### Prerequisites
Ensure that you have npm and Docker installed on your system. Additionally, you'll need to install the following dependencies using npm:
- Prisma
- class-validator
- class-transformer

Install any missing dependencies by navigating to the project's root directory and running `npm install <package_name>`.

### Setting Up the Database

1. Start the PostgreSQL container by running the command:
   ```
   docker compose up dev-db -d
   ```

2. Migrate Prisma's schema to the PostgreSQL database using:
   ```
   npx prisma migrate dev
   ```

### Running the Application

To start the application, execute the following command:
```
npm run start:dev
```
Access the application via http://localhost:3000.

### Exploring Prisma Studio

To explore Prisma Studio, use the command:
```
npx prisma studio
```
This will provide you with an interface to interact with your database. 

## Additional Notes

- Make sure you've set up environment variables or configurations as required by the tutorial or project.
- Refer to the video tutorial for a step-by-step guide.

Feel free to explore, modify, and adapt this tutorial to suit your project needs!
