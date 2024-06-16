import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoListItems from './TodoListItems';

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

describe('TodoListItems Component', () => {
  beforeEach(() => {
    store = mockStore(mockState);
    global.fetch = jest.fn();
    global.getTodoItems = jest.fn();
    global.updateTodoItem = jest.fn();
    global.deleteTodoItem = jest.fn();
    console.error = jest.fn();
  });

  it('--TodoListItems Component TESTS INITIALIZING--', () => {});

  it('should render Todo List Items', async () => {
    render(
      <Provider store={store}>
        <TodoListItems />
      </Provider>,
    );

    expect(screen.getByText(/Todo List Items/i)).toBeInTheDocument();
    expect(screen.getByText(/This will show your tasks/i)).toBeInTheDocument();
  });

  it('should fetch the list of todo items saved in db', async () => {
    render(
      <Provider store={store}>
        <TodoListItems />
      </Provider>,
    );

    jest.spyOn(global, 'getTodoItems').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockState.todos),
      }),
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  // it('should call deleteTodoItem on Confirm in Delete dialog', async () => {
  //   render(
  //     <Provider store={store}>
  //       <TodoListItems />
  //     </Provider>,
  //   );

  //   const deleteBtn = screen.getByTestId('delete');
  //   fireEvent.click(deleteBtn);

  //   // Wait for the delete dialog to appear
  //   const dialog = screen.getByTestId('dialog');
  //   expect(dialog).toBeInTheDocument();

  //   // Find and click the confirm button inside the dialog
  //   const confirmBtn = screen.getByTestId('dialog-confirm-button');
  //   fireEvent.click(confirmBtn);

  //   // Mock the API call response for deleteTodoItem
  //   jest.spyOn(global, 'deleteTodoItem').mockImplementationOnce(() =>
  //     Promise.resolve({
  //       ok: true,
  //       json: () => Promise.resolve(mockState.todos[0]),
  //     }),
  //   );

  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   expect(console.error).toHaveBeenCalledTimes(0);
  // });

  // it('should call updateTodoItem on Confirm in Delete dialog', async () => {
  //   render(
  //     <Provider store={store}>
  //       <TodoListItems />
  //     </Provider>,
  //   );

  // const editBtn = screen.getByTestId('edit');
  // fireEvent.click(editBtn);

  //   const confirmBtn = screen.getByTestId('dialog-confirm-button');
  //   fireEvent.click(confirmBtn);

  //   jest.spyOn(global, 'updateTodoItem').mockImplementationOnce(() =>
  //     Promise.resolve({
  //       ok: true,
  //       json: () => Promise.resolve(mockState.todos[0]),
  //     }),
  //   );
  //   expect(global.updateTodoItem).toHaveBeenCalledTimes(1);
  // });
});
