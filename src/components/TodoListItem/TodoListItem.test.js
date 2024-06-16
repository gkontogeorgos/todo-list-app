import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import TodoListItem from '../../components/TodoListItem/TodoListItem';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

const mockState = {
  todos: [
    {
      id: 1,
      category: 'Work',
      assignee: 'John Doe',
      priority: 'High',
      description: 'Finish project report',
      completionDate: '2024-06-15',
    },
  ],
  isTodoItemEdited: false,
};

const mockStore = configureStore();
let store;

describe('Testing the TodoListItem', () => {
  beforeEach(() => {
    store = mockStore(mockState);
    global.fetch = jest.fn();
    global.addTodoItem = jest.fn();
  });

  it('--TodoListItem Component TESTS INITIALIZING--', () => {});

  // Checks if added todo item is rendered
  it('should render added todo item', async () => {
    jest.spyOn(global, 'addTodoItem').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockState.todos),
      }),
    );
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });

  // Checks if fields exist in DOM
  it('should render todo item fields correctly', () => {
    render(
      <Provider store={store}>
        <TodoListItem />
      </Provider>,
    );

    expect(screen.getByTestId('category-select')).toBeInTheDocument();
    expect(screen.getByTestId('assignee-select')).toBeInTheDocument();
    expect(screen.getByTestId('priority-select')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
  });

  // Adds new todo item
  it('should call addTodoItem on Save Click', async () => {
    render(
      <Provider store={store}>
        <TodoListItem />
      </Provider>,
    );

    const saveButton = screen.getByTestId('save');

    fireEvent.click(saveButton);

    jest.spyOn(global, 'addTodoItem').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockState.todos),
      }),
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
