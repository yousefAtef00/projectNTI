import { model, Schema } from "mongoose";


const userSchema = new Schema({
    name:String,
    age:Number,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String
    },
     isConfirmed: {
    type: Boolean,
    default: false,
  },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    }
},{
    timestamps:true, //createdAt, updatedAt
    versionKey:false

})

export const userModel = model("User", userSchema)