import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectField from './SelectField';
import { assignees, categories, priorities } from '../../../common/constants/constants';


describe('SelectField Component', () => {
  const handleChange = jest.fn();

  it('should render Categories', () => {
    render(
      <SelectField
        label="Category"
        value="Fix Bugs"
        htmlFor="category"
        dataTestId="category"
        handleChange={handleChange}
        options={categories}
      />,
    );

    expect(screen.getByTestId('category')).toBeInTheDocument();
  });

  it('should render Assignees', () => {
    render(
      <SelectField
        label="Assignees"
        value="Bob Smith"
        htmlFor="assignee"
        dataTestId="assignee"
        handleChange={handleChange}
        options={assignees}
      />,
    );

    expect(screen.getByTestId('assignee')).toBeInTheDocument();
  });

  it('should render Priorities', () => {
    render(
      <SelectField
        label="Priority"
        value="Low"
        htmlFor="priority"
        dataTestId="priority"
        handleChange={handleChange}
        options={priorities}
      />,
    );

    expect(screen.getByTestId('priority')).toBeInTheDocument();
  });
});
