
import 'reflect-metadata';
import { createServer } from "./utils/createServer";

async function main() {
    const {app, server}=await createServer();

    await server.start();

    await app.listen({
        port: 4000,
    });
    console.log(`the server is running on http://localhost:4000${server.graphqlPath}`);
}


main();