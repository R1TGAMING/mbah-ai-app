import { RetroGrid } from "@/components/ui/retro-grid";
import { Card } from "@/components/ui/card";
import { CardAction } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Spinner } from "@/components/ui/spinner";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential.user);
                    navigate("/chat");
                })
                .catch((error) => {
                    if (error.code === "auth/invalid-credential") {
                        alert("Invalid email or password");
                    }

                    if (error.code === "auth/user-not-found") {
                        alert("User not found");
                    }

                    if (error.code === "auth/too-many-requests") {
                        alert("Too many requests. Please try again later.");
                    }
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <RetroGrid>
            <main className="h-screen w-screen flex items-center justify-center">
                <Card className="w-full max-w-sm bg-slate-100 outline-3 outline-slate-950">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Login to your account</CardDescription>
                        <CardAction>
                            <Button
                                variant="link"
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
                                Sign Up
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
                                        required
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="Password..."
                                        className="bg-slate-200"
                                        required
                                        minLength={6}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full mt-4 cursor-pointer"
                                onClick={handleLogin}
                            >
                                {loading ? <Spinner /> : "Login"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </RetroGrid>
    );
};

export default Login;
