import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { FastifyInstance } from 'fastify';
import {GraphQLSchema} from 'graphql';

function createSubscriptionServer(app:FastifyInstance, schema:GraphQLSchema){

// Creating the WebSocket subscription server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` returned by createServer(app);
    server: app.server,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: "/graphql",
  });

  // Passing in an instance of a GraphQLSchema and
  // telling the WebSocketServer to start listening
  const serverCleanup = useServer({ schema }, wsServer);

  return {wsServer, serverCleanup}
}

export default createSubscriptionServer;