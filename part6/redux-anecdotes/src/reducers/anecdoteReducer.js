import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    // newAnecdote(state, action) {
    //   const content = action.payload;
    //   state.push(content);
    // },
    setVote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((a) =>
        a.id === updatedAnecdote.id ? updatedAnecdote : a
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdote));
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newEntry = await anecdotesService.createAnecdote(content);
    dispatch(appendAnecdote(newEntry));
  };
};

export default anecdoteSlice.reducer;
