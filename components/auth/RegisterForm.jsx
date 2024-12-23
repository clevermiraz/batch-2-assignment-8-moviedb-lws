"use client";

import { registerUser } from "@/actions";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterForm() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // const { setAuth } = useAuth();
    const router = useRouter();

    async function onSubmit(event) {
        event.preventDefault();

        try {
            setError("");
            setLoading(true);

            const formData = new FormData(event.currentTarget);
            const result = await registerUser(formData);

            if (formData.get("password") !== formData.get("confirmPassword")) {
                toast.error("Password and Confirm Password do not match");
                return;
            }

            console.log(result);

            if (result.newUser) {
                toast.success("user created successfully, please login");

                router.push("/login");
            } else {
                setError(result?.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e)} id="signupForm" className="space-y-4">
            <div className="my-2 text-red-500">{error}</div>

            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                required
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Create Password"
                className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                required
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                required
            />

            <div className="text-left text-moviedb-gray text-sm">
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />I agree to the Terms of Service and Privacy
                    Policy
                </label>
            </div>

            <button
                type="submit"
                className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
            >
                {loading ? <Spinner /> : "Register"}
            </button>
        </form>
    );
}
