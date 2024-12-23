"use server";

import { addOrRemoveToWatchList, createUser, findUserByCredentials } from "@/lib/dbQueries";
import { redirect } from "next/navigation";

export async function registerUser(formData) {
    const user = Object.fromEntries(formData);
    const created = await createUser(user);

    if (created) {
        redirect("/login");
    }
}

export async function performLogin(formData) {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");

    const found = await findUserByCredentials(credential);
    return found;
}

export async function performAddOrRemoveToWatchList(userId, movieId) {
    const updatedUser = await addOrRemoveToWatchList(userId, movieId);

    return {
        id: updatedUser._id,
        email: updatedUser.email,
        watchList: updatedUser.watchList,
    };
}
