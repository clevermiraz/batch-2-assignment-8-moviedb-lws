import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: "Anonymous",
        min: 2,
        max: 100,
    },
    lastName: {
        type: String,
        default: "User",
    },
    email: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        min: 2,
        max: 100,
    },
    password: {
        type: String,
        min: 6,
        max: 100,
    },
    watchList: {
        type: Array,
        default: [],
    },
});

const User = mongoose.models.User || mongoose.model("User", UsersSchema);

export default User;
