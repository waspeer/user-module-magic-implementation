type AnyObject = Record<string, unknown>;

type PickPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export { AnyObject, PickPartial };
