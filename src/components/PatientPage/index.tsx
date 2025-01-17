import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EntryDetails from './EntryDetails';
import { EntryForm, EntryFormValues } from './EntryCheckForm';

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
  // Inside the PatientPage component, add a handler for form submission
  const handleCheckFormSubmit = (values: EntryFormValues) => {
    const sendEntry = async () => {
      try {
        await patientService.addEntryToPatient(id, values);
        setError('');
      } catch (error) {
        console.log('🚀 ~ sendEntry ~ error:', error);
        setError(error.response.data);
      }
    };
    sendEntry();
  };

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
      {/* Display error if there is one */}
      {error && <Typography color='error'>{error}</Typography>}
      <Typography variant='h3'>
        {patient.name} {patient.gender === 'male' ? '♂️' : '♀️'}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <EntryForm onSubmit={handleCheckFormSubmit} diagnoses={diagnoses} />
      <h2>entries</h2>
      {patient.entries.map((entry: Entry) => (
        <EntryDetails entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
