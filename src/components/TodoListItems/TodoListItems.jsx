import React, { useState, useEffect } from 'react';
import { StyledCard } from './styles';
import { getTodoItems, deleteTodoItem } from '../../routes/endpoints';
import { connect } from 'react-redux';
import {
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { setIsTodoItemEdited, setTodo } from '../../store/actions';
import TodoListItem from '../../components/TodoListItem/TodoListItem';
import moment from 'moment';

const TodoListItems = ({
  todos,
  isTodoItemEdited,
  setTodo,
  setIsTodoItemEdited,
}) => {
  const [apiTodoItems, setApiTodoItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);

  const fetchTodoItems = async () => {
    try {
      const todoItems = await getTodoItems();
      setApiTodoItems(Array.isArray(todoItems) ? todoItems : []);
    } catch (error) {
      console.error('Failed to fetch todo items:', error);
    }
  };

  useEffect(() => {
    fetchTodoItems();
  }, [todos]);

  const QuickSearchToolbar = () => (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );

  const handleDelete = async (id) => {
    try {
      await deleteTodoItem(id);
      setTodo(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo item:', error);
    }
  };

  const handleEdit = (todo) => {
    setDialogType('edit');
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleDeleteClick = (todo) => {
    setDialogType('delete');
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (dialogType === 'edit') {
      setOpen(false);
      setIsTodoItemEdited(true);
    } else if (dialogType === 'delete') {
      handleDelete(selectedTodo.id);
      setOpen(false);
    }
  };

  const columns = [
    { field: 'category', headerName: 'Category', flex: 2 },
    { field: 'assignee', headerName: 'Assignee', flex: 1 },
    { field: 'priority', headerName: 'Priority', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'completionDate',
      headerName: 'Completion Date',
      valueFormatter: (value) => {
        if (value) {
          return moment(value).format('DD/MM/YYYY');
        }
        return null;
      },
      flex: 2,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            data-testid="edit"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            data-testid="delete"
            onClick={() => handleDeleteClick(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <StyledCard>
        <Grid container direction="column" spacing={2} data-testid="grid">
          <Grid item>
            <Typography variant="h4" component="h1" align="center">
              Todo List Items ({apiTodoItems?.length || 0})
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" align="center">
              <em>This will show your tasks</em>
            </Typography>
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <div style={{ height: 400, width: '100%', position: 'relative' }}>
              <DataGrid
                data-testid="data-grid"
                rows={apiTodoItems}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                slots={{ toolbar: QuickSearchToolbar }}
                components={{
                  NoRowsOverlay: () => (
                    <Typography
                      variant="subtitle1"
                      align="center"
                      style={{ marginTop: '20px' }}
                    >
                      No items found.
                    </Typography>
                  ),
                  LoadingOverlay: () => (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <CircularProgress />
                    </div>
                  ),
                }}
                sx={{
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: 'white',
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold',
                  },
                  '& .MuiDataGrid-virtualScroller': {
                    overflowY: 'auto',
                  },
                }}
              />
            </div>
          </Grid>
        </Grid>
      </StyledCard>

      <Dialog open={open} onClose={handleCancel} data-testid="dialog">
        <DialogTitle>
          {dialogType === 'edit' ? 'Edit Todo Item' : 'Delete Todo Item'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText data-testid="dialog-content">
            {dialogType === 'edit'
              ? 'Are you sure you want to edit the selected todo item?'
              : 'Are you sure you want to delete the selected todo item?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            data-testid="dialog-confirm-button"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isTodoItemEdited}
        onClose={handleCancel}
        data-testid="edit-dialog"
      >
        <DialogTitle>{`Edit Todo Item: ${selectedTodo?.id || ''}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TodoListItem inEditMode todo={selectedTodo} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsTodoItemEdited(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos || [],
  isTodoItemEdited: state.isTodoItemEdited,
});

const mapDispatchToProps = (dispatch) => ({
  setTodo: (payload) => dispatch(setTodo(payload)),
  setIsTodoItemEdited: (payload) => dispatch(setIsTodoItemEdited(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItems);
