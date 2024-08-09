import axiosTodosInstance from './axios';

export const fetchTodos = async (): Promise<any[]> => {
  const response = await axiosTodosInstance.get('/todos');
  return response.data;
};

export const fetchTodo = async (id: number): Promise<any> => {
  const response = await axiosTodosInstance.get(`/todos/${id}`);
  return response.data;
};
