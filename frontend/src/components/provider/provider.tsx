'use client';

import { ThemeProvider } from "@/contexts/theme";
import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider defaultTheme="dark">
            {children}
        </ThemeProvider>
    )
}