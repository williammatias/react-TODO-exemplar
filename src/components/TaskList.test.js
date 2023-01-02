import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import TaskList from './TaskList';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders the list of tasks', () => {
  const tasks = [
    { id: 1, description: 'Task 1', complete: false, priority: 1, dueDate: '2022-01-01' },
    { id: 2, description: 'Task 2', complete: false, priority: 2, dueDate: '2022-01-02' },
    { id: 3, description: 'Task 3', complete: false, priority: 3, dueDate: '2022-01-03' },
  ];

  act(() => {
    render(<TaskList tasks={tasks} />, container);
  });

  expect(container.textContent).toContain('Task 1');
  expect(container.textContent).toContain('Task 2');
  expect(container.textContent).toContain('Task 3');
});
