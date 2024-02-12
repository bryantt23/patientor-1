import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import patientService from '../../services/patients';
import { Patient } from '../../types';

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const fetchedPatient = await patientService.getPatient(id);
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
      {/* Implement further patient details and components as needed */}
      {/* Display error if there is one */}
      {error && <Typography color='error'>{error}</Typography>}
    </div>
  );
};

export default PatientPage;
