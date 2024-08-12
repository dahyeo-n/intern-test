import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../api/todoApi';

import queryKeys from '../queryKeys';
import { ActiveQueryType } from '../types';

export const useFetchTodos = (activeQuery: ActiveQueryType) => {
  const todosQuery = useQuery({
    queryKey: queryKeys.todos,
    queryFn: fetchTodos,
    enabled: activeQuery === 'todos',
  });

  return todosQuery;
};
