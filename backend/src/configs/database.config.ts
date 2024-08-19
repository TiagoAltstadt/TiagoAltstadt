import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions).then(
    () =>
      console.log(
        "|  Database\u001b[1;32m connected \u001b[0m to MongoDB Atlas!             |\n|____________________________________________________|\n"
      ),
    (error) => {
      console.log(error);
    }
  );
};
