import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import BookDetails from '../BookDetails';
import Home from '../../pages/Home';
import ResultSection from '../ResultSection';
import Page404 from '../../pages/Page404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":num/" element={<ResultSection />}>
            <Route path="works/:key" element={<BookDetails />} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
