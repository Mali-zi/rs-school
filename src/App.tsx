import { Routes, Route } from 'react-router-dom';
import './App.css';
import BookDetails from './components/BookDetails';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="works/:key" element={<BookDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
