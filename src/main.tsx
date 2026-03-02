import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import Chat from "./pages/Chat.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <Chat />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </BrowserRouter>,
);
