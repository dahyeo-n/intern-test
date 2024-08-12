import { useQuery } from '@tanstack/react-query';
import { fetchTodo } from '../api/todoApi';

import queryKeys from '../queryKeys';
import { ActiveQueryType } from '../types';

const useFetchOneTodo = (activeQuery: ActiveQueryType) => {
  const oneTodoQuery = useQuery({
    queryKey: queryKeys.todo(1),
    queryFn: () => fetchTodo(1),
    enabled: activeQuery === 'todo',
  });

  return oneTodoQuery;
};

export default useFetchOneTodo;
