import { AuthChecker } from 'type-graphql'
import { Context } from '../context/context'

export const breaerAuthChecker:AuthChecker<Context> = ({context}) => {
  console.log("context in auth: ",context);
  if(context.user){
    return true;
  }
  return false;
}
