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
    if(connectionParams ||!request){
        console.log(connectionParams);
        try {
            return{
                user: app.jwt.verify<ContextUser>(connectionParams?.Authorization|| ""),
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