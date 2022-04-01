import mongoose from "mongoose";
let Schema = mongoose.Schema;

let ApiSchema = new Schema({
  api_key: {
    type: String,
    required: true,
  },
  records: [
    {
      year: {
        type: Number,
      },
      month: {
        type: Number,
      },
      date: {
        type: Number,
      },
      usage: {
        type: Number,
      },
    },
  ],
});

let email_change_Schema = new Schema({
  count:{
    type:Number
  },
  changed_date:{
    type: Date
  }
  })


let UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  api_info: {
    type: ApiSchema,
    required: true,
  },
  email_change_count: {
    type:email_change_Schema
  },
  pass_change_count: {
    type: email_change_Schema,
  },
});

mongoose.models = {};

let User = mongoose.model("User", UserSchema);

export default User;
