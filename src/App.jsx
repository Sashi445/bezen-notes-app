import { NotesProvider } from './app/notesContext';
import Notes from './pages/Notes';
import "./App.css";

const App = () => {
  return (
    <NotesProvider>
      <Notes />
    </NotesProvider>
  );
}

export default App;