import { connect } from "mongoose";

const url = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
