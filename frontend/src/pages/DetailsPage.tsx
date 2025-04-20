import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entertainer } from "../types/Entertainer";
import {
  getEntertainerById,
  deleteEntertainer,
} from "../api/413FinalAPI";
import EditEntertainerForm from "../components/EditEntertainerForm";

function DetailsPage() {
  const navigate = useNavigate();
  const { entertainerID } = useParams();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEntertainer, setEditingEntertainer] = useState<Entertainer | null>(null);

  useEffect(() => {
    if (!entertainerID) return;

    const fetchEntertainer = async () => {
      try {
        const data = await getEntertainerById(Number(entertainerID));
        setEntertainer(data);
      } catch (err) {
        setError("Could not load entertainer details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntertainer();
  }, [entertainerID]);

  const refreshData = async () => {
    if (!entertainerID) return;
    const updated = await getEntertainerById(Number(entertainerID));
    setEntertainer(updated);
  };

  const handleDelete = async () => {
    if (!entertainer) return;

    const confirmed = window.confirm("Are you sure you want to delete this entertainer?");
    if (!confirmed) return;

    try {
      await deleteEntertainer(entertainer.entertainerID);
      navigate("/entertainers");
    } catch (error) {
      alert("Failed to delete entertainer.");
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!entertainer) return <p style={{ textAlign: 'center' }}>No entertainer found.</p>;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {editingEntertainer ? (
        <EditEntertainerForm
          entertainer={editingEntertainer}
          onSuccess={async () => {
            setEditingEntertainer(null);
            await refreshData();
          }}
          onCancel={() => setEditingEntertainer(null)}
        />
      ) : (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{entertainer.entStageName}</h2>
          <div style={{ lineHeight: '1.75' }}>
            <p><strong>SSN:</strong> {entertainer.entSSN}</p>
            <p><strong>Street Address:</strong> {entertainer.entStreetAddress}</p>
            <p><strong>City:</strong> {entertainer.entCity}</p>
            <p><strong>State:</strong> {entertainer.entState}</p>
            <p><strong>Zip Code:</strong> {entertainer.entZipCode}</p>
            <p><strong>Phone Number:</strong> {entertainer.entPhoneNumber}</p>
            <p><strong>Email Address:</strong> {entertainer.entEMailAddress}</p>
            <p><strong>Web Page:</strong> <a href={entertainer.entWebPage} target="_blank" rel="noreferrer">{entertainer.entWebPage}</a></p>
            <p><strong>Date Entered:</strong> {entertainer.dateEntered}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
            <button
              onClick={() => setEditingEntertainer(entertainer)}
              style={primaryButtonStyle}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              style={dangerButtonStyle}
            >
              Delete
            </button>
            <button
              onClick={() => navigate(-1)}
              style={secondaryButtonStyle}
            >
              Back
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// 🔧 Shared inline styles
const primaryButtonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '0.6rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer'
};

const dangerButtonStyle: React.CSSProperties = {
  backgroundColor: '#dc3545',
  color: 'white',
  padding: '0.6rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer'
};

const secondaryButtonStyle: React.CSSProperties = {
  backgroundColor: '#6c757d',
  color: 'white',
  padding: '0.6rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer'
};

export default DetailsPage;
