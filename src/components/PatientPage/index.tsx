import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import patientService from '../../services/patients';
import { Entry, Patient } from '../../types';
// Define the expected type for the parameters
type Params = {
  id: string;
};

const PatientPage = () => {
  // Use the useParams hook to get the parameters
  const { id } = useParams<Params>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const fetchedPatient = await patientService.getPatient(id);
        console.log('🚀 ~ fetchPatient ~ fetchedPatient:', fetchedPatient);
        setPatient(fetchedPatient);
      } catch (e) {
        setError('Failed to fetch patient details');
        console.error(e);
      }
    };

    if (id) {
      fetchPatient();
    }
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className='App'>
      <Typography variant='h3'>
        {patient.name} {patient.gender === 'male' ? '♂️' : '♀️'}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <h2>entries</h2>
      {patient.entries.map((entry: Entry) => (
        <div>
          <p>
            {entry.data} {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li>{code}</li>
            ))}
          </ul>
        </div>
      ))}
      {/* Implement further patient details and components as needed */}
      {/* Display error if there is one */}
      {error && <Typography color='error'>{error}</Typography>}
    </div>
  );
};

export default PatientPage;
