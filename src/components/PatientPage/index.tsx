import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody
} from '@mui/material';
import axios from 'axios';
import Link, { useParams } from 'react-router-dom';

import { PatientFormValues, Patient } from '../../types';
import AddPatientModal from '../AddPatientModal';

import HealthRatingBar from '../HealthRatingBar';

import patientService from '../../services/patients';

const PatientPage = () => {
  const { id } = useParams();
  useEffect(() => {
    const fetch = async () => {
      const res = await patientService.getPatient(id);
      console.log('🚀 ~ fetch ~ res:', res);
    };
    fetch();
  }, [id]);
  return (
    <div className='App'>
      Hii
      {/* <Box>
        <Typography align='center' variant='h6'>
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: '1em' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link to={``}>{patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant='contained' onClick={() => openModal()}>
        Add New Patient
      </Button> */}
    </div>
  );
};

export default PatientPage;
