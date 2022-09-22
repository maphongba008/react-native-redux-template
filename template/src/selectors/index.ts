import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { ReduxState } from 'types';
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export const useCounter = () => {
  return useAppSelector((state) => {
    return state.app.counter;
  });
};

export const useTheme = () => {
  return useAppSelector((state) => state.app.theme);
};

export const useColors = () => {
  return useTheme();
};
