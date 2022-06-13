# Server
###### create package.json file
pnpm init


pnpm add ts-node-dev typescript @types/jsonwebtoken -D

pnpm add graphql@^15.3.0 class-validator type-graphql reflect-metadata apollo-server-fastify apollo-server-core fastify graphql argon2 @fastify/cookie @fastify/jwt prisma @prisma/client graphql-ws

npx tsc --init

npx prisma init

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