import './App.css';
import ErrorBoundary from './ErrorBoundary';
import LoadComponents from './components/LoadComponents/LoadComponents';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <LoadComponents/>
      </ErrorBoundary>
    </div>
  );
}

export default App;
