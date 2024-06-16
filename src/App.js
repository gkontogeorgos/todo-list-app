import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header/Header';
import { Container, Typography, Grid } from '@mui/material';
import TodoListItem from './components/TodoListItem/TodoListItem';
import TodoListItems from './components/TodoListItems/TodoListItems';

function App() {
  return (
    <Provider store={store}>
      <div className="App" data-testid="app">
        <Header />
        <Container>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
              <Container sx={{ marginTop: '20px' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  ADD NEW TASK
                </Typography>
                <TodoListItem />
              </Container>
            </Grid>
            <Grid item xs={12}>
              <Container sx={{ marginTop: '20px', marginBottom: '20px' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  TODO LIST
                </Typography>
                <TodoListItems />
              </Container>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
