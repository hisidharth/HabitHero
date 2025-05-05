export const Endpoints = {
    mainApiInternalUrl: `${process.env.NEXT_PUBLIC_MAIN_API_INTERNAL_URL!}`,
    mainApiPrefix: `${process.env.NEXT_PUBLIC_MAIN_API_PREFIX!}`,
    mainApiInternal: `${process.env.NEXT_PUBLIC_MAIN_API_INTERNAL_URL!}${process.env.NEXT_PUBLIC_MAIN_API_PREFIX!}`,

    selfUrl: process.env.NEXT_PUBLIC_APP_BASE_URL!
};