import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos, fetchTodo } from '../api/todoApi';

const TodosComponent: React.FC = () => {
  const [fetchTodosEnabled, setFetchTodosEnabled] = useState(false);
  const [fetchTodoEnabled, setFetchTodoEnabled] = useState(false);

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    enabled: fetchTodosEnabled,
  });
  const todoQuery = useQuery({
    queryKey: ['todo', 1],
    queryFn: () => fetchTodo(1),
    enabled: fetchTodoEnabled,
  });

  return (
    <div>
      <button onClick={() => setFetchTodosEnabled(true)}>Load All Todos</button>
      <button onClick={() => setFetchTodoEnabled(true)}>Load Todo 1</button>
      {todosQuery.isLoading && <div>Loading all todos...</div>}
      {todoQuery.isLoading && <div>Loading todo 1...</div>}
      {todosQuery.error && (
        <div>Error loading all todos: {todosQuery.error.message}</div>
      )}
      {todoQuery.error && (
        <div>Error loading todo 1: {todoQuery.error.message}</div>
      )}

      {fetchTodosEnabled && todosQuery.data && (
        <>
          <h2>All Todos</h2>
          <ul>
            {todosQuery.data.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </>
      )}

      {fetchTodoEnabled && todoQuery.data && (
        <>
          <h2>Todo 1</h2>
          <p>{todoQuery.data.title}</p>
        </>
      )}
    </div>
  );
};

export default TodosComponent;
