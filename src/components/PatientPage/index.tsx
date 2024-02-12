import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import { Diagnosis, Entry, Patient } from '../../types';
// Define the expected type for the parameters
type Params = {
  id: string;
};

const PatientPage = () => {
  // Use the useParams hook to get the parameters
  const { id } = useParams<Params>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPatient = await patientService.getPatient(id);
        console.log('🚀 ~ fetchData ~ fetchedPatient:', fetchedPatient);
        setPatient(fetchedPatient);
        const diagnosesFromApi = await diagnosesService.getAll();
        console.log('🚀 ~ fetchData ~ diagnosesFromApi:', diagnosesFromApi);
        setDiagnoses(diagnosesFromApi);
      } catch (e) {
        setError('Failed to fetch patient details');
        console.error(e);
      }
    };

    if (id) {
      fetchData();
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
            {entry.date} {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>
                {code} {diagnoses?.find(d => d.code === code)?.name}
              </li>
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
