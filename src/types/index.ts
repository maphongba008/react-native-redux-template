export type ThemeName = 'light' | 'dark';

export type AppState = {
  counter: number;
  isLoggedIn: boolean;
};

export type ReduxState = {
  app: AppState;
};
export type Meta<K> = {
  arg?: K;
};
export type Action<T, K = unknown> = {
  payload: T;
  meta?: Meta<K>;
};
