"use server";

import { addOrRemoveToWatchList, findUserByCredentials } from "@/lib/dbQueries";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/Users";

export async function registerUser(formData) {
    await connectMongoDB();

    const user = Object.fromEntries(formData);

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            throw new Error("Email already in use. Please use a different email.");
        }

        // Create new user
        const created = await User.create(user);

        return {
            id: created._id,
            email: created.email,
            watchList: created.watchList,
            newUser: true,
        };
    } catch (error) {
        // Handle and return errors
        return { error: error.message };
    }
}

export async function performLogin(formData) {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");

    const found = await findUserByCredentials(credential);
    return found;
}

export async function performAddOrRemoveToWatchList(userId, movie) {
    const updatedUser = await addOrRemoveToWatchList(userId, movie);

    return {
        id: updatedUser._id,
        email: updatedUser.email,
        watchList: updatedUser.watchList,
    };
}
