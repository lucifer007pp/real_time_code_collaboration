import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import EditorPage from './components/EditorPage';
import './index.css'

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </Router>
  );
}

export default App;