import { useAppSelector } from 'selectors';

export const useIsLoggedIn = () => {
  return useAppSelector((state) => state.app.isLoggedIn);
};
