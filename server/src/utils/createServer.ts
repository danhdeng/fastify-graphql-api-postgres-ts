import { buildSchema } from "type-graphql";
import UserResolver from "../modules/user/user.resolver";
import {ApolloServer} from 'apollo-server-fastify';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import {fastify} from "fastify";

const app=fastify();

function buildContext(){

}

export async function createServer() {
    const schema = await buildSchema({
        resolvers:[UserResolver],
    });

    const server=new ApolloServer({
        schema,
        plugins:[
            ApolloServerPluginDrainHttpServer({
                httpServer:app.server
            })
        ],
        context:buildContext
    }); 
    return {app, server};
}
