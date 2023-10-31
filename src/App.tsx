import './App.css';
import TopSection from './components/TopSection';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col m-4">
          <ErrorBoundary>
            <TopSection />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default App;
