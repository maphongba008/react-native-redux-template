import { Screens } from './enums';

export type AuthenticationStackParams = {
  [Screens.LOGIN]: undefined;
};
export type AppTabParams = {
  [Screens.TAB_1]: undefined;
  [Screens.TAB_2]: undefined;
};
export type RootStackParams = {
  [Screens.APP_TAB]: undefined;
};
