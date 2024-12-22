import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (!browserQueryClient) {
    browserQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          staleTime: 0,
          // notifyOnStatusChange: false,
          refetchOnWindowFocus: false
        }
      }
    });
  }

  return browserQueryClient;
};

export const ApiProvider = (props: PropsWithChildren) => (
  <QueryClientProvider client={getQueryClient()}>{props.children}</QueryClientProvider>
);

export default ApiProvider;
