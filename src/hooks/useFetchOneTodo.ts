import { useQuery } from '@tanstack/react-query';
import { fetchTodo } from '../api/todoApi';
import queryKeys from '../queryKeys';

const useFetchOneTodo = (activeQuery: 'todos' | 'todo' | null) => {
  const oneTodoQuery = useQuery({
    queryKey: queryKeys.todo(1),
    queryFn: () => fetchTodo(1),
    enabled: activeQuery === 'todo',
  });

  return oneTodoQuery;
};

export default useFetchOneTodo;
