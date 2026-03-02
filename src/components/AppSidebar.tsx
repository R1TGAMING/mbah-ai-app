import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarHeader,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
    return (
        <Sidebar collapsible="offcanvas">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="p-2">
                        <SidebarContent>
                            <h2 className="text-2xl font-black text-center">👾 Mbah AI</h2>
                        </SidebarContent>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
        </Sidebar>
    );
};

export default AppSidebar;
