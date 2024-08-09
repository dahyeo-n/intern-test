import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos, fetchTodo } from '../api/todoApi';

const TodosComponent: React.FC = () => {
  const [activeQuery, setActiveQuery] = useState<'todos' | 'todo' | null>(null);

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    enabled: activeQuery === 'todos',
  });

  const todoQuery = useQuery({
    queryKey: ['todo', 1],
    queryFn: () => fetchTodo(1),
    enabled: activeQuery === 'todo',
  });

  return (
    <div>
      <button
        className={`mr-2 border-solid border-2 border-sky-500 text-blue-500 font-semibold px-4 py-2 hover:bg-slate-50 rounded ${
          activeQuery === 'todos' ? 'bg-sky-100' : ''
        }`}
        onClick={() => setActiveQuery(activeQuery === 'todos' ? null : 'todos')}
      >
        모든 TO-DO 보기
      </button>
      <button
        className={`border-solid border-2 border-sky-500 text-blue-500 font-semibold px-4 py-2 hover:bg-slate-50 rounded ${
          activeQuery === 'todo' ? 'bg-sky-100' : ''
        }`}
        onClick={() => setActiveQuery(activeQuery === 'todo' ? null : 'todo')}
      >
        TO-DO 1건 보기
      </button>

      {todosQuery.isLoading && <div>모든 할 일 로딩 중...</div>}
      {todoQuery.isLoading && <div>할 일 1건 로딩 중...</div>}
      {todosQuery.error && (
        <div>모든 할 일 로딩 에러: {todosQuery.error.message}</div>
      )}
      {todoQuery.error && (
        <div>할 일 1건 로딩 에러: {todoQuery.error.message}</div>
      )}

      {activeQuery === 'todos' && todosQuery.data && (
        <div className='my-8'>
          <h2 className='font-semibold text-2xl mb-2'>모든 할 일</h2>
          <ul>
            {todosQuery.data.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </div>
      )}

      {activeQuery === 'todo' && todoQuery.data && (
        <div className='my-8'>
          <h2 className='font-semibold text-2xl mb-2'>할 일 1건</h2>
          <p className='mb-8'>{todoQuery.data.title}</p>
        </div>
      )}
    </div>
  );
};

export default TodosComponent;
