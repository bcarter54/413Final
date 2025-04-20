import { useNavigate } from 'react-router-dom';
import NewEntertainerForm from '../components/NewEntertainerForm';

const NewEntertainerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <NewEntertainerForm
        onSuccess={() => navigate('/entertainers')}
        onCancel={() => navigate('/entertainers')}
      />
    </div>
  );
};

export default NewEntertainerPage;
