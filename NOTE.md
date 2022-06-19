# Server
### create package.json file
pnpm init


pnpm add ts-node-dev typescript @types/jsonwebtoken -D

pnpm add graphql@^15.3.0 class-validator type-graphql reflect-metadata apollo-server-fastify apollo-server-core fastify graphql argon2 @fastify/cookie @fastify/jwt prisma @prisma/client graphql-ws ws @fastify/cors apollo-server-plugin-base

npx tsc --init

npx prisma init

# add user and message schema to schema.prisma

model User {
  id       String @id @default(uuid())
  email    String @unique
  username String @unique
  password String

  followedBy User[] @relation("UserFollows", references: [id])
  following  User[] @relation("UserFollows", references: [id])

  Message Message[]
}

model Message {
  id        String   @unique @default(uuid())
  body      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
  userId    String
}

# to generate the PrismaClient
npx prisma generate


npx prisma migrate dev --name init

It's important to set these options in the tsconfig.json file of our project:

{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}

# Client
pnpm create next-app --typescript client 

pnpm add @graphql-codegen/cli @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-query -D

pnpm add graphql react-query

pnpm graphql-codegen init

# kill the port that is running already

npx kill-port 4000