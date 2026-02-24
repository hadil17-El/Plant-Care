import { html } from "framer-motion/client";

interface LayoutProps {
    children: React.ReactNode
}
export default function PublicLayout({ children}: LayoutProps) {
    return (
        
            <>
                {children}
            </>
        
    )
}