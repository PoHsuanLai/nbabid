import { ApolloServer, PubSub } from "apollo-server-express";
import path from "path"
import { dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv-defaults/config.js";
import { importSchema } from "graphql-import"
import http from "http"
import express from "express"
import cors from "cors"
import apiRoute from "./backend/src/api.js"
import bodyParser from "body-parser"
import * as db from "./backend/src/mongoSchema.js"
import Query from "./backend/src/resolvers/Query.js"
import Mutation from "./backend/src/resolvers/Mutation.js"
import Subscription from "./backend/src/resolvers/Subscription.js"
import mongo from "./backend/src/mongo.js"
import wakeUpDyno from "./wakeUpDyno.js";

const _dirname = dirname(fileURLToPath(import.meta.url))
const port = process.env.PORT || 80
const typeDefs=importSchema("./backend/src/schema.graphql")
const app = express()
const pubsub = new PubSub();

app.use(cors())
app.use("/api", apiRoute)
app.use(bodyParser.json())
app.use(express.static(path.join(_dirname, "build")))
app.get("/*", function(req, res) {
    res.sendFile(path.join(_dirname, "build", "index.html"))
})

const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
    context: {
      db,
      pubsub,
    },
  });

server.applyMiddleware({app})
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

mongo.connect();

httpServer.listen(port, () => {
    const DYNO_URL = "https://nbabid.heroku.com/"
    wakeUpDyno(DYNO_URL)
    console.log(`🚀 Server Ready at ${port}! 🚀`)
    console.log(`Graphql Port at ${port}${server.subscriptionsPath}`)
})

export default server