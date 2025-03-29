import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
    },
    profilePicture:{
        type:String,
        default:'https://tse3.mm.bing.net/th?id=OIP.5RYq7OxqpuRcYHUn66mQmQHaHa&pid=Api&P=0&h=220'
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
