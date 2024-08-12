import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../api/todoApi';
import queryKeys from '../queryKeys';

export const useFetchTodos = (activeQuery: 'todos' | 'todo' | null) => {
  const todosQuery = useQuery({
    queryKey: queryKeys.todos,
    queryFn: fetchTodos,
    enabled: activeQuery === 'todos',
  });

  return todosQuery;
};
