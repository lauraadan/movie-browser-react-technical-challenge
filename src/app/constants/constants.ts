export const ROUTES = {
  HOME: "/",
  MOVIE: "/movie/:id",
  CATEGORIES: "/categories",
  WISHLIST: "/wishlist",
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];

export const MESSAGES = {
  ERROR_GENERIC: "Something went wrong.",
} as const;

export type MessageKeys = keyof typeof MESSAGES;
export type MessageValues = (typeof MESSAGES)[MessageKeys];
