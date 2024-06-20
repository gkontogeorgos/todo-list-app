import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {
  StyledCard,
  StyledSaveButtonContainer,
  StyledTextarea,
} from './styles';
import { addTodoItem, updateTodoItem } from '../../routes/endpoints';
import { setIsTodoItemEdited, setTodo } from '../../store/actions';
import { connect } from 'react-redux';
import { StyledFormItem } from './styles';
import { FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SelectField from '../../common/components/SelectField/SelectField';
import { assignees, categories, priorities } from '../../common/constants/constants';

const TodoListItem = ({
  todos,
  inEditMode = false,
  todo,
  setTodo,
  setIsTodoItemEdited,
}) => {
  const initialState = {
    id: uuidv4(),
    category: categories[0]?.value || '',
    assignee: assignees[0]?.value || '',
    description: '',
    priority: priorities[0]?.value || '',
    completionDate: new Date(),
  };
  const [selectedTodoItem, setSelectedTodoItem] = useState(initialState);

  const handleChange = (field, value) => {
    setSelectedTodoItem((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const onSaveClick = () => {
    setTodo([...todos, selectedTodoItem]);
    if (inEditMode) updateTodoItem(selectedTodoItem);
    else addTodoItem(selectedTodoItem);
    setSelectedTodoItem(initialState);
    setIsTodoItemEdited(false);
  };

  useEffect(() => {
    if (inEditMode) setSelectedTodoItem(todo);
  }, [inEditMode, todo]);

  return (
    <>
      <StyledCard style={{ boxShadow: inEditMode && 'none' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SelectField
              label="Category"
              htmlFor="category"
              dataTestId="category"
              value={selectedTodoItem?.category}
              handleChange={(value) => handleChange('category', value)}
              options={categories}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              label="Assignee"
              htmlFor="assignee"
              dataTestId="assignee"
              value={selectedTodoItem?.assignee}
              handleChange={(value) => handleChange('assignee', value)}
              options={assignees}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              label="Priority"
              htmlFor="priority"
              dataTestId="priority"
              value={selectedTodoItem?.priority}
              handleChange={(value) => handleChange('priority', value)}
              options={priorities}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledFormItem>
              <FormControl fullWidth>
                <StyledTextarea
                  minRows={5}
                  maxRows={20}
                  placeholder="Enter description..."
                  value={selectedTodoItem?.description}
                  data-testid="description"
                  htmlFor="description"
                  onChange={(event) =>
                    handleChange('description', event.target.value)
                  }
                />
              </FormControl>
            </StyledFormItem>
          </Grid>
          <Grid item xs={12}>
            <StyledFormItem>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    format="dd/MM/yyyy"
                    label="Select Completion Target Date"
                    value={
                      selectedTodoItem?.completionDate
                        ? moment(selectedTodoItem.completionDate).toDate()
                        : null
                    }
                    minDate={new Date()}
                    onChange={(newValue) =>
                      handleChange('completionDate', newValue)
                    }
                  />
                </LocalizationProvider>
              </FormControl>
            </StyledFormItem>
          </Grid>
          <Grid item xs={12}>
            <StyledSaveButtonContainer>
              <Button
                data-testid="save"
                variant="contained"
                color="primary"
                size="small"
                onClick={onSaveClick}
              >
                Save
              </Button>
            </StyledSaveButtonContainer>
          </Grid>
        </Grid>
      </StyledCard>
    </>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos || [],
});

const mapDispatchToProps = (dispatch) => ({
  setTodo: (payload) => dispatch(setTodo(payload)),
  setIsTodoItemEdited: (payload) => dispatch(setIsTodoItemEdited(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);
