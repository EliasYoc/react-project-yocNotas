import "./App.css";
import Aside from "./components/Aside";
import Main from "./components/Main";
import { NotesProvider } from "./context/NotesProvider";

function App() {
  return (
    <div className="App">
      <NotesProvider>
        <Aside />
        <Main />
      </NotesProvider>
    </div>
  );
}

export default App;
