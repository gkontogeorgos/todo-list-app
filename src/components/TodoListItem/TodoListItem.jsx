import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Box,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { v4 as uuidv4 } from 'uuid';
import { categories, assignees, priorities } from '../../constants/constants';
import {
  StyledCard,
  StyledFormItem,
  StyledSaveButtonContainer,
  StyledTextarea,
} from './styles';
import { addTodoItem, updateTodoItem } from '../../routes/endpoints';
import { setIsTodoItemEdited, setTodo } from '../../store/actions';
import { connect } from 'react-redux';

const TodoListItem = ({
  todos,
  inEditMode = false,
  todo,
  setTodo,
  setIsTodoItemEdited,
}) => {
  const initialState = {
    id: uuidv4(),
    category: '',
    assignee: '',
    description: '',
    priority: '',
    completionDate: null,
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
    <Box>
      <StyledCard style={{ boxShadow: inEditMode && 'none' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <StyledFormItem>
              <FormControl fullWidth htmlFor="category">
                <InputLabel shrink htmlFor="category">
                  Category
                </InputLabel>
                <Select
                  label="Category"
                  value={selectedTodoItem?.category}
                  onChange={(event) =>
                    handleChange('category', event.target.value)
                  }
                  data-testid="category-select"
                  htmlFor="category"
                  fullWidth
                >
                  {categories?.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      <div style={{ display: 'flex' }} htmlFor="category">
                        {option.value}
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </StyledFormItem>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <StyledFormItem>
              <FormControl fullWidth>
                <InputLabel shrink>Assignee</InputLabel>
                <Select
                  label="Assignee"
                  value={selectedTodoItem?.assignee}
                  data-testid="assignee-select"
                  htmlFor="assignee"
                  fullWidth
                  onChange={(event) =>
                    handleChange('assignee', event.target.value)
                  }
                >
                  {assignees?.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      <div style={{ display: 'flex' }}>{option.value}</div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </StyledFormItem>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <StyledFormItem>
              <FormControl fullWidth>
                <InputLabel shrink>Priority</InputLabel>
                <Select
                  label="Priority"
                  value={selectedTodoItem?.priority}
                  data-testid="priority-select"
                  htmlFor="priority"
                  onChange={(event) =>
                    handleChange('priority', event.target.value)
                  }
                  fullWidth
                >
                  {priorities?.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      <div style={{ display: 'flex' }}>{option.value}</div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </StyledFormItem>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
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
          <Grid item xs={12} sm={12} md={12}>
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
    </Box>
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
