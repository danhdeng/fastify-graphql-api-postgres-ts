
/* eslint-disable import/first */
require('dotenv').config();

import { buildSchema } from "type-graphql";
import UserResolver from "../modules/user/user.resolver";
import {ApolloServer} from 'apollo-server-fastify';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
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
import MessageResolver from "../modules/message/message.resolver";


export async function createServer() {
    const app=fastify();

    app.register(fastifyCors,{
        credentials:true,
        origin:(origin, callBack)=>{
            if(!origin ||
            ["http://localhost:3000","http://localhost:4000", "https://studio.apollographql.com"].includes(origin)){
                return callBack(null, true);
            }    
            console.log(origin);
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
        resolvers:[UserResolver, MessageResolver],
        authChecker: breaerAuthChecker,
    });
    const {serverCleanup} =createSubscriptionServer(app, schema);

    const server=new ApolloServer({
        schema,
        plugins:[
            fastifyAppClosePlugin(app),
            fastifyGraphQLWSClosePlugin(serverCleanup),
            ApolloServerPluginDrainHttpServer({
                httpServer:app.server
            }),
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context:buildContext
    });
   
    return {app, server};
}

