import { Sidebar, Home, BookOpen, Info, MessageSquare, ShoppingCart, FileText, BrickWall, Plus, UserPen } from "lucide-react";

export const NavBarLinks = [
    {
        title: "Home",
        id: "/",
        icon: Home,
        isPrivate: false
    },
    {
        title: "Library",
        id: "/library",
        icon: BookOpen,
        isPrivate: false
    },
    {
        title: "Add Book",
        id: "/user",
        icon: Plus,
        isPrivate: true,
    },
    {
        title: "About",
        id: "/about",
        icon: Info,
        isPrivate: false
    },
    {
        title: "Contact",
        id: "/contact",
        icon: MessageSquare,
        isPrivate: false
    },
    {
        title: "Admin",
        id: "/admin",
        icon: UserPen,
    },
    {
        title: "Cart",
        id: "/cart",
        icon: ShoppingCart,
        isPrivate: true
    },
    {
        title: "Request",
        id: "/request",
        icon: FileText,
        isPrivate: true
    },
];