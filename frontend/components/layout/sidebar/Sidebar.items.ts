import IMenuItem from "./Sidebar.interface";
import { User2, Home, MessageCircle } from "lucide-react";
export const menuItems: IMenuItem[] = [
    {
        icon: User2,
        url: "/main/profile",
    },
    {
        icon: Home,
        url: "/main",
    },
    {
        icon: MessageCircle,
        url: "/main/chats",
    }
];