// server
// const express = require('express');
import express from 'express';
// const { Express } = pkg;
import graphqlUploadExpress  from 'graphql-upload/graphqlUploadExpress.mjs';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
// const { graphqlUploadExpress } = require('graphql-upload');
// const { ApolloServer } = require('apollo-server-express');
// const path = require('path');
import { authMiddleware } from './utils/auth.js';

// const { typeDefs, resolvers } = require('./schemas');
import { typeDefs, resolvers } from './schemas/index.js';

// const db = require('./config/connection');
import db from './config/connection.js';

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

app.get('/', (req, res) => {
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
