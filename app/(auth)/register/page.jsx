import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";
import { Suspense } from "react";

export default function RegisterPage() {
    return (
        <>
            <main className="bg-moviedb-black min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
                    <div className="text-center">
                        <h1 className="text-white text-3xl font-bold mb-6">Create Your Account</h1>

                        <Suspense fallback={<div>Loading...</div>}>
                            <RegisterForm />
                        </Suspense>

                        <div className="mt-6 text-moviedb-gray">
                            Already have an account?
                            <Link href="/login" className="text-white hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
