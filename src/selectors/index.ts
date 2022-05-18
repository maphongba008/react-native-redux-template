import { useSelector } from 'react-redux';

export const useCounter = () => {
  return useSelector((state: any) => {
    return state.app.counter;
  });
};
