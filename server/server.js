import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
dotenv.config();
import { graphqlHTTP } from "express-graphql";
import UploadImage from "./src/Middleware/uploadImage.js";
import { GraphQLSchema } from "./src/GraphqlSchema/GraphQLSchema.js";
import { resolvers } from "./src/Resolvers.js";
import Redis from "ioredis";

export const client = new Redis({
  password: process.env.REDIS_PASS,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(UploadImage);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: GraphQLSchema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4001;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server up and running on port ${PORT}`)
    );
  })
  .catch((error) => console.log(error));
