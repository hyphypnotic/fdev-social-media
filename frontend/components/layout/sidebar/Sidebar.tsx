'use client';
import { menuItems } from "./Sidebar.items";
import styles from "./Sidebar.module.scss";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className="flex-grow" />
            <nav className={`${styles.navItems} flex flex-col space-y-6`}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.url;
                    return (
                        <a 
                            key={item.url} 
                            href={item.url} 
                            className={`group flex items-center justify-center`}
                        >
                            <item.icon
                                className={`w-10 h-9 transition-all duration-300 ease-in-out ${
                                    isActive
                                        ? "text-foreground"
                                        : "text-gray-500 group-hover:text-gray-700 group-hover:scale-110"
                                }`}
                            />
                        </a>
                    );
                })}
            </nav>
            <div className="flex-grow" />
            <div className="mb-4">
                <ThemeSwitch />
            </div>
        </aside>
    );
}
