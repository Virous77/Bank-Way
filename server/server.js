import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
dotenv.config();
import { graphqlHTTP } from "express-graphql";
import { schema } from "./src/GraphqlSchema/User.js";
import { ActivitySchema } from "./src/GraphqlSchema/Activity.js";
import { UserRoot } from "./src/Controller/user.js";
import UploadImage from "./src/Middleware/uploadImage.js";
import { ActivityRoot } from "./src/Controller/activity.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(UploadImage);

app.use(
  "/user",
  graphqlHTTP({
    schema: schema,
    rootValue: UserRoot,
    graphiql: true,
  })
);

app.use(
  "/activity",
  graphqlHTTP({
    schema: ActivitySchema,
    rootValue: ActivityRoot,
    graphiql: true,
  })
);

const PORT = 4000 || process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server up and running on port ${PORT}`)
    );
  })
  .catch((error) => console.log(error));
