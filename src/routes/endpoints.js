import { API_BASE_URL } from '../api';

const api = API_BASE_URL;

export const addTodoItem = async (item) => {
  try {
    await fetch(`${api}/todos`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(item),
    });
  } catch (e) {
    console.error(e);
  }
};

export const updateTodoItem = async (item) => {
  const { id, ...updatedTodoItem } = item;
  try {
    await fetch(`${api}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTodoItem),
    });
  } catch (e) {
    console.error(e);
  }
};

export const getTodoItems = async () => {
  try {
    const response = await fetch(`${api}/todos`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch todo items');
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteTodoItem = async (id) => {
  try {
    await fetch(`${api}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(),
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
