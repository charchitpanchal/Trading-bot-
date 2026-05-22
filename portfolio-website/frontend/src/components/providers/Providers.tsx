"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "glass !bg-slate-900/90 !text-white !border !border-white/10",
          duration: 4000,
        }}
      />
    </ThemeProvider>
  );
}
