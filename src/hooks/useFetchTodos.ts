import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../api/todoApi';

export const useFetchTodos = (activeQuery: 'todos' | 'todo' | null) => {
  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    enabled: activeQuery === 'todos',
  });

  return todosQuery;
};
