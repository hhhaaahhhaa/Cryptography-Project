require("dotenv-defaults").config();
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./gql_typedef");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
// for deploy on heroku
// app.use(express.static(  "public"));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "public", "index.html"));
// });

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: { Query, Mutation },
  });
  await server.start({});

  const app = express();
  // app.use(cors());
  server.applyMiddleware({ app, path: "/graphql" });

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  return { server, app };
}

/// Connect to MongoDB
if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL!!!");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});

db.once("open", () => {
  console.log("MongoDB connected!");
  const { server, app } = startApolloServer();
});
