import { setVote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
import anecdotesService from "../services/anecdotes";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter)
    );
  });

  const dispatch = useDispatch();

  const addVote = async (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const response = await anecdotesService.updateVote(
      anecdote.id,
      updatedAnecdote
    );
    dispatch(setVote(response)); // you could also dispatch the full object if reducer expects it
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
