import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import EditTaskForm from './EditTaskForm';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders the edit task form', () => {
  const task = { id: 1, description: 'Task 1', complete: false, priority: 1, dueDate: '2022-01-01' };

  act(() => {
    render(<EditTaskForm task={task} onEditTask={() => {}} onCancel={() => {}} />, container);
  });

  expect(container.querySelector('form').textContent).toContain('Description:');
  expect(container.querySelector('form').textContent).toContain('Priority:');
  expect(container.querySelector('form').textContent).toContain('Due Date:');
});
