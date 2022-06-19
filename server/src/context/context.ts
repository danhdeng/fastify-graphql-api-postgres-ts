import { User } from "../modules/user/user.dto";
import buildContext from "./buildContext";

export type ContextUser=Omit<User, "password">;

export type Context =Awaited<ReturnType<typeof buildContext>>;