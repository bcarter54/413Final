import { useState } from 'react';
import { addEntertainer } from '../api/413FinalAPI';
import { Entertainer } from '../types/Entertainer';


interface NewEntertainerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewEntertainerForm = ({
  onSuccess,
  onCancel,
}: NewEntertainerFormProps) => {
  const today = new Date();
  const todayString = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

  const [formData, setFormData] = useState<Entertainer>({
    entertainerID: 0,
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: 0,
    entPhoneNumber: '',
    entWebPage: '',
    entEMailAddress: '',
    dateEntered: todayString,
    bookingCount: 0,
    mostRecentBooking: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEntertainer(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="entertainer-form">
      <h2>Add New Entertainer</h2>

      <div className="form-grid">
        <label>
          Stage Name:
          <input type="text" name='entStageName' value={formData.entStageName} onChange={handleChange} />
        </label>

        <label>
          SSN:
          <input type="text" name='entSSN' value={formData.entSSN} onChange={handleChange} />
        </label>

        <label>
          Street Address:
          <input type="text" name='entStreetAddress' value={formData.entStreetAddress} onChange={handleChange} />
        </label>

        <label>
          City:
          <input type="text" name='entCity' value={formData.entCity} onChange={handleChange} />
        </label>

        <label>
          State:
          <input type="text" name='entState' value={formData.entState} onChange={handleChange} />
        </label>

        <label>
          Zip Code:
          <input type="number" name='entZipCode' value={formData.entZipCode} onChange={handleChange} />
        </label>

        <label>
          Phone Number:
          <input type="text" name='entPhoneNumber' value={formData.entPhoneNumber} onChange={handleChange} />
        </label>

        <label>
          Web Page:
          <input type="text" name='entWebPage' value={formData.entWebPage} onChange={handleChange} />
        </label>

        <label>
          Email Address:
          <input type="email" name='entEMailAddress' value={formData.entEMailAddress} onChange={handleChange} />
        </label>
      </div>

      <div className="button-group">
        <button type='submit' className="btn btn-primary">Add Entertainer</button>
        <button type='button' className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default NewEntertainerForm;
