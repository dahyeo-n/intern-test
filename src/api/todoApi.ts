import axiosTodosInstance from './axios';

export const fetchTodos = async () => {
  const response = await axiosTodosInstance.get('/todos');
  return response.data;
};

export const fetchTodo = async (id: number) => {
  const response = await axiosTodosInstance.get(`/todos/${id}`);
  return response.data;
};
