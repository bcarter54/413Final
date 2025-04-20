import { useState } from 'react';
import { Entertainer } from '../types/Entertainer';
import { updateEntertainer } from '../api/413FinalAPI';

interface EditEntertainerFormProps {
  entertainer: Entertainer;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditEntertainerForm = ({
  entertainer,
  onSuccess,
  onCancel,
}: EditEntertainerFormProps) => {
  const [formData, setFormData] = useState<Entertainer>(entertainer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'entZipCode' || name === 'bookingCount' || name === 'entertainerID'
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating Entertainer:', formData);
    await updateEntertainer(formData);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Edit Entertainer</h2>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <label>
          Stage Name:
          <input type="text" name="entStageName" value={formData.entStageName} onChange={handleChange} style={inputStyle} />
        </label>

        <label>
          SSN:
          <input type="text" name="entSSN" value={formData.entSSN} onChange={handleChange} style={inputStyle} />
        </label>

        <label>
          Street Address:
          <input type="text" name="entStreetAddress" value={formData.entStreetAddress} onChange={handleChange} style={inputStyle} />
        </label>

        <label>
          City:
          <input type="text" name="entCity" value={formData.entCity} onChange={handleChange} style={inputStyle} />
        </label>

        <label>
          State:
          <input type="text" name="entState" value={formData.entState} onChange={handleChange} style={inputStyle} />
        </label>

        <label>
          Zip Code:
          <input type="number" name="entZipCode" value={formData.entZipCode} onChange={handleChange} style={inputStyle} />
        </label>

        <label>
          Web Page:
          <input type="text" name="entWebPage" value={formData.entWebPage} onChange={handleChange} style={inputStyle} />
        </label>

        <label>
          Email:
          <input type="email" name="entEMailAddress" value={formData.entEMailAddress} onChange={handleChange} style={inputStyle} />
        </label>

        <label>
          Date Entered:
          <input type="text" name="dateEntered" value={formData.dateEntered} onChange={handleChange} style={inputStyle} />
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <button type="submit" style={primaryButtonStyle}>Save Changes</button>
        <button type="button" style={secondaryButtonStyle} onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

// ✅ Inline style constants
const inputStyle: React.CSSProperties = {
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginTop: '0.25rem',
};

const primaryButtonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '0.6rem 1.2rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

const secondaryButtonStyle: React.CSSProperties = {
  backgroundColor: '#6c757d',
  color: 'white',
  padding: '0.6rem 1.2rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

export default EditEntertainerForm;
