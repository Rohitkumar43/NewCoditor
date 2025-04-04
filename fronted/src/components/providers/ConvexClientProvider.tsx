// export default ConvexClientProvider

"use client";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/clerk-react";  // Keep useAuth here

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth} >
      {children}
    </ConvexProviderWithClerk>
  );
}
// THIS IS THE CORRECT WAY TO DO IT

export default ConvexClientProvider;
