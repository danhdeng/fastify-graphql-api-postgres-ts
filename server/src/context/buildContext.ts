import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ContextUser } from "./context";

async function buildContext({
    app,
    request,
    reply,
    connectionParams
}:{
    app: FastifyInstance,
    request?: FastifyRequest;
    reply?: FastifyReply;
    connectionParams?:{
        Authorization:string;
    };
}){
    app.register(fastifyJwt, {
    secret: "change-me",
    cookie: {
        cookieName: "token",
        signed: false,
    },
    });

    if(connectionParams ||!request){
        try {
            return{
                user: await app.jwt.verify<ContextUser>(connectionParams?.Authorization|| ""),
            };
        } catch (error) {
            return {user: null};
        }
    }
    try {
        const user= await request.jwtVerify<ContextUser>();
        return {request, reply, user};
    } catch (error) {
        return {request, reply, user: null};
    }
}

export default buildContext;