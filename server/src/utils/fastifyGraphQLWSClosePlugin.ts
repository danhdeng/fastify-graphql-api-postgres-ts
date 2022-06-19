
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { Disposable } from 'graphql-ws';

function fastifyGraphQLWSClosePlugin  (serverCleanup:Disposable): ApolloServerPlugin {
  return {
    async serverWillStart(){
      return{
        async drainServer() {
           await serverCleanup.dispose();;
        },
      };
    },
  }
}

export default fastifyGraphQLWSClosePlugin;

