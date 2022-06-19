
/* eslint-disable import/first */
require('dotenv').config();

import { buildSchema } from "type-graphql";
import UserResolver from "../modules/user/user.resolver";
import {ApolloServer} from 'apollo-server-fastify';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import {fastify} from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { JWT_SECRET } from "../constant";
import buildContext from "../context/buildContext";
import { breaerAuthChecker } from "./breaerAuthChecker";
import fastifyAppClosePlugin from "./fastifyAppClosePlugin";
import createSubscriptionServer from "./createSubscriptionServer";
import fastifyGraphQLWSClosePlugin from "./fastifyGraphQLWSClosePlugin";
import { useServer } from "graphql-ws/lib/use/ws";


export async function createServer() {
    const app=fastify();

    app.register(fastifyCors,{
        credentials:true,
        origin:(origin, callBack)=>{
            if(!origin ||
            ["http://localhost:3000", "https://studio.apollographql.com"].includes(origin)){
                return callBack(null, true);
            }    
            return callBack(new Error("Origin not allow"), false);
        }
    });

    app.register(fastifyCookie,{
        parseOptions:{},
    });

    app.register(fastifyJwt, {
    secret: JWT_SECRET,
    cookie: {
        cookieName: "token",
        signed: false,
    },
    });

    const schema = await buildSchema({
        resolvers:[UserResolver],
        authChecker: breaerAuthChecker,
    });
    const {wsServer, serverCleanup} =createSubscriptionServer(app, schema);

    const server=new ApolloServer({
        schema,
        plugins:[
            fastifyAppClosePlugin(app),
            fastifyGraphQLWSClosePlugin(serverCleanup),
            ApolloServerPluginDrainHttpServer({
                httpServer:app.server
            })
        ],
        context:buildContext
    });
    useServer({
        schema,
        context: buildContext
    },wsServer,);
    return {app, server};
}

