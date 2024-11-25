import { Sidebar } from "@/components/layout/sidebar/Sidebar";
export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <section className="grid grid-cols-[64px_1fr]">
        <Sidebar /> 
        {children}
    </section>;
}