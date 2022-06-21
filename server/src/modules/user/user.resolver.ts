import { ApolloError } from "apollo-server-core";
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { COOKIE_DOMAIN } from "../../constant";
import { Context } from "../../context/context";
import { FollowerInput, LoginInput, RegisterUserInput, Token, User, UserFollowers } from "./user.dto";
import { createUser, findUserByEmailOrUsername, findUserFollowedBy, findUserFollowing, findUsers, followUser, unfollowUser, verifyPassword } from "./user.service";


@Resolver(()=>User)
class UserResolver{
    @Mutation(()=>User)
    async register(@Arg("input") input: RegisterUserInput):Promise<User>{
        try {
            const user = await createUser(input);
            return user;
        } catch (error) {
            //check if violates unique constraint
            throw error;
        }
    }

    @Authorized()
    @Query(()=>User)
    me(@Ctx() context: Context){
        return context.user;
    }

    @Mutation(()=>Token)
    async login(@Arg("input") input:LoginInput, @Ctx() context: Context):Promise<Token>{
        const user= await findUserByEmailOrUsername(
            input.usernameOrEmail.toLocaleLowerCase()
        );
        if(!user){
            throw new ApolloError("Invalid Credentials!");
        }

        const isValid = await verifyPassword({
            password:user.password, 
            candidatePassword:input.password,
        });
         if(!isValid){
            throw new ApolloError("Invalid Credentials!");
        }
        const token=await context.reply?.jwtSign({
            id: user.id,
            username:user.username,
            email: user.email,
        });

        if(!token){
            throw new ApolloError("Error signing token!");
        }

        context.reply?.setCookie("twitter_api_token", token,{
            domain:COOKIE_DOMAIN,
            path:"/",
            secure:false,
            httpOnly:true,
            sameSite: false,
        });
        return {token};
    }

    @Query(()=>[User])
    async users(){
        return findUsers();
    }

    @Authorized()
    @Mutation(()=>User)
    async followUser(@Arg("input") input: FollowerInput,@Ctx() context: Context){
        try {
            const result = await followUser({
                ...input,
                userId: context.user?.id!
            });
            return result;
        } catch (error:any) {
            throw new ApolloError(error);
        }
    }

    @Authorized()
    @Mutation(()=>User)
    async unfollowUser(@Arg("input") input: FollowerInput,@Ctx() context: Context){
        try {
            const result = await unfollowUser({
                ...input,
                userId: context.user?.id!
            });
            return result;
        } catch (error:any) {
            throw new ApolloError(error);
        }
    }

    @FieldResolver(()=>UserFollowers)
    async followers(@Root() user:User){
        const data = await findUserFollowedBy(user.id);
        return{
            count: data?.followedBy.length,
            items: data?.followedBy
        }
    }

    @FieldResolver(()=>UserFollowers)
    async following(@Root() user:User){
        const data = await findUserFollowing(user.id);
        return{
            count: data?.following.length,
            items: data?.following
        }
    }
}

export default UserResolver