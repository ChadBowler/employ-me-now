// server
import express from 'express';
import graphqlUploadExpress  from 'graphql-upload/graphqlUploadExpress.mjs';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { authMiddleware } from './utils/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

//Set __dirname for ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const app = express();
app.use(graphqlUploadExpress());
const server = new ApolloServer({
	typeDefs,
	resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
	await server.start();
	server.applyMiddleware({ app });

	db.once('open', () => {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(
				`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
			);
		});
	});
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
