import mongoose, { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      validate: {
        validator: (val) => /^[a-z0-9_.]+$/.test(val),
        message:
          "Username can only contain lowercase letters, numbers, underscores, and periods",
      },
    },
    profilePicture: {
      type: String,
    },
    tasks: {
      todo: { type: [TaskSchema], default: [] },
      inProgress: { type: [TaskSchema], default: [] },
      done: { type: [TaskSchema], default: [] },
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || model("User", UserSchema);
export default User;
