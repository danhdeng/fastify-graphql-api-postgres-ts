import { Query, Resolver } from "type-graphql";
import { User } from "./user.dto";


@Resolver(()=>User)
class UserResolver{
    @Query(()=>User)
    User(){
        return {
            id: '123456',
            email: 'test@example.com',
            username: 'testUser'
        }
    }
}

export default UserResolver