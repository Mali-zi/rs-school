import { Routes, Route } from 'react-router-dom';
import './App.css';
import BookDetails from '../BookDetails/BookDetails';
import Home from '../../pages/Home/Home';
import ResultSection from '../ResultSection/ResultSection';
import Page404 from '../../pages/Page404/Page404';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path=":num/" element={<ResultSection />}>
          <Route path="works/:key" element={<BookDetails />} />
        </Route>
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
