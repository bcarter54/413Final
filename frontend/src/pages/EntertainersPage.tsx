import { useNavigate } from 'react-router-dom';
import EntertainerList from '../components/EntertainerList';

function EntertainersPage() {
    const navigate = useNavigate();
  return (
    <>
      <div className="container mt-4">
        <button onClick={() => navigate("/")}>Back to Home</button>
        <div>
          <EntertainerList />
        </div>
      </div>
    </>
  );
}

export default EntertainersPage
