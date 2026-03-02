import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Spinner } from "@/components/ui/spinner";

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential.user);
                    navigate("/chat");
                })
                .catch((error) => {
                    if (error.code === "auth/too-many-requests") {
                        alert("Too many requests. Please try again later.");
                    }
                });
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };
    return (
        <RetroGrid>
            <main className="h-screen w-screen flex items-center justify-center">
                <Card className="w-full max-w-sm bg-slate-100 outline-3 outline-slate-950">
                    <CardHeader className="">
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Create your account</CardDescription>
                        <CardAction>
                            <Button
                                variant="link"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="Email..."
                                        className="bg-slate-200"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="Password..."
                                        className="bg-slate-200"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full mt-4 cursor-pointer"
                                onClick={handleSubmit}
                            >
                                {loading ? <Spinner /> : "Sign Up"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </RetroGrid>
    );
};

export default SignUp;
