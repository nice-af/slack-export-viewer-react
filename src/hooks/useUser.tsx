import { useContext } from 'react';
import { DataContext } from '../contexts/data.context';

export const useUser = (userId: string) => {
  const { data } = useContext(DataContext);
  return data?.users.find(user => user.id === userId);
};
