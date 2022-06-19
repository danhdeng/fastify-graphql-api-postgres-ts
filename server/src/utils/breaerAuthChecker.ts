import { AuthChecker } from 'type-graphql'
import { Context } from '../context/context'

export const breaerAuthChecker:AuthChecker<Context> = ({context}) => {
  if(context.user){
    return true;
  }
  return false;
}
