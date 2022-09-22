import { Theme } from 'constants/theme';

export type AppState = {
  counter: number;
  isLoggedIn: boolean;
  theme: Theme;
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

export type { Theme };
