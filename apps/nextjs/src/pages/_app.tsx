// src/pages/_app.tsx
import { ClerkProvider } from "@clerk/nextjs";
import type { AppType } from "next/app";
import { api } from "~/utils/api";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
