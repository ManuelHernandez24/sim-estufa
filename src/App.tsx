import './App.css';
import Sim from './components/Sim';
import DBConfig from './config/DBConfig';
import {initDB} from "react-indexed-db";

initDB(DBConfig);

function App() {
  return (
    <div className="p-4">
      <Sim />
    </div>
  );
}

export default App;
