import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { Spinner } from "../ui/spinner";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    if (user === null) {
        return <Navigate to="/login" />;
    }

    if (user === undefined) {
        return (
            <div className="bg-dark h-screen w-screen flex items-center justify-center text-white">
                <Spinner />
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
