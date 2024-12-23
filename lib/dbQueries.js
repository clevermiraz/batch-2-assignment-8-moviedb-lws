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
            watchList: user.watchList,
        };
    }
    return null;
}

export async function addOrRemoveToWatchList(userId, movie) {
    await connectMongoDB();

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Check if the movie already exists in the watchList
    const movieExists = user.watchList.some((item) => item.id === movie.id);

    if (movieExists) {
        // Remove the movie from the watchList
        user.watchList = user.watchList.filter((item) => item.id !== movie.id);
    } else {
        // Add the movie to the watchList
        user.watchList.push(movie);
    }

    await user.save();
    return user;
}
