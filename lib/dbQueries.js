import User from "@/models/Users";
import connectMongoDB from "./mongodb";

export async function getAllUsers() {
    await connectMongoDB();

    const users = await User.find();
    return users;
}

export async function createUser(user) {
    await connectMongoDB();

    return await User.create(user);
}

export async function findUserByCredentials(credentials) {
    await connectMongoDB();

    const user = await User.findOne(credentials);

    if (user) {
        return {
            id: user._id,
            email: user.email,
        };
    }
    return null;
}

export async function addOrRemoveToWatchList(userId, movieId) {
    await connectMongoDB();

    const user = await User.findById(userId);

    if (user.watchList.includes(movieId)) {
        user.watchList = user.watchList.filter((id) => id !== movieId);
    } else {
        user.watchList.push(movieId);
    }

    await user.save();
    return user.watchList;
}
