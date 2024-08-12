import { Todo } from '../types';
import axiosTodosInstance from './axios';

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axiosTodosInstance.get('/todos');
  console.log('Todos => ', response.data);
  return response.data;
};

export const fetchTodo = async (id: number): Promise<Todo> => {
  const response = await axiosTodosInstance.get(`/todos/${id}`);
  console.log('Todo => ', response.data);
  return response.data;
};
