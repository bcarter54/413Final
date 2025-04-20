import { useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { useState, useEffect } from 'react';
import { fetchEntertainers } from '../api/413FinalAPI';
import Pagination from './Pagination';
import NewEntertainerForm from './NewEntertainerForm';

function EntertainerList() {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [pageCount, setPageCount] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadEntertainers = async () => {
      try {
        setLoading(true);
        const data = await fetchEntertainers(pageCount, pageNum);
        setEntertainers(data.entertainers);
        setTotalPages(Math.ceil(data.totalNum / pageCount));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadEntertainers();
  }, [pageCount, pageNum]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading entertainers...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Entertainers</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {entertainers.map((e) => (
          <div
            key={e.entertainerID}
            style={{
              border: '1px solid #dee2e6',
              borderRadius: '12px',
              padding: '1.25rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              backgroundColor: '#ffffff',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h3 style={{ marginBottom: '0.75rem' }}>{e.entStageName}</h3>
            <p style={{ margin: '0.25rem 0' }}><strong>Bookings:</strong> {e.bookingCount}</p>
            <p style={{ margin: '0.25rem 0' }}><strong>Most Recent:</strong> {e.mostRecentBooking}</p>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={() => navigate(`/details/${e.entertainerID}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={{ marginTop: '2rem' }}>
          <NewEntertainerForm
            onSuccess={() => {
              setShowForm(false);
              fetchEntertainers(pageCount, pageNum).then((data) =>
                setEntertainers(data.entertainers)
              );
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {!showForm && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="btn btn-success"
            onClick={() => navigate('/entertainers/new')}
            style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }}
            >
            Add Entertainer
            </button>

        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageCount={pageCount}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageCount(newSize);
            setPageNum(1);
          }}
        />
      </div>
    </div>
  );
}

export default EntertainerList;
