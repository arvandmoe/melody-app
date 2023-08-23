import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry(failureCount, error: any) {
                if (error?.response?.status === 404 || error?.response?.status === 403) return false;
                return true;
            },
        },
        mutations: {}
    }
})

export default queryClient