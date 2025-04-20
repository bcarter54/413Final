import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EntertainersPage from './pages/EntertainersPage';
import DetailsPage from './pages/DetailsPage';
import WelcomeBand from './components/WelcomeBand';
import NewEntertainerPage from './pages/NewEntertainerPage';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomeBand />} />
          <Route path="/entertainers" element={<EntertainersPage />} />
          <Route path="/details/:entertainerID" element={<DetailsPage />}/>
          <Route path="/entertainers/new" element={<NewEntertainerPage />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
