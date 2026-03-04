import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const AppSidebar = () => {
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Sidebar collapsible="offcanvas">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="p-2">
                        <SidebarContent className="bg-gray-700/50 p-2 rounded">
                            <h2 className="text-2xl font-black text-center">
                                👾 Mbah AI
                            </h2>
                        </SidebarContent>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent></SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleSubmit}>
                            <LogOut /> Logout
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
