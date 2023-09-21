NESTJS TUTORIAL:

link to the video: https://www.youtube.com/watch?v=GHTA143_b-s

HOW TO INITIALIZE THE PROJECT:

- Install npm and docker if not already installed.
- Other dependencies: prisma, class-validator, class-transformer (npm).
- If not already installed, run "npm install <package_name>" from projects root directory.
- First, run postgres container with the command "docker compose up dev-db -d".
- Use the command "npm run start:dev" to start the application. Reach it on http://localhost:3000.
- Migrate prisma's scheme to the postgres db with the command "prisma migrate dev".
- If you want to check how prisma studio works, run it with the command "npx prisma studio".