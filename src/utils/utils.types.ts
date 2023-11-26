export type Optional<T extends Record<string, any>, DefaultType = undefined> = {
  [key in keyof T]?: T[key] | DefaultType;
};

export type RequiredKeys<T> = {
  [key in keyof T]-?: Record<string, any> extends Pick<T, key> ? never : T[key];
};

export type Response<T = any> = {
  success: boolean;
  result: T;
};
export type ActionType = { label: string; onClick: () => void };

export type NotNull<T> = T extends undefined | null ? never : T;
