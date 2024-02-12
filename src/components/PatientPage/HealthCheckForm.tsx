// HealthCheckForm.tsx
import React, { useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup
} from '@mui/material';
import { HealthCheckRating, Diagnosis } from '../../types'; // Ensure these are correctly imported based on your project structure

interface HealthCheckFormProps {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  diagnoses: Diagnosis[] | null;
}

export interface HealthCheckEntryFormValues {
  type: 'HealthCheck';
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: HealthCheckRating;
  diagnosisCodes: string[];
}

const initialFormValues: HealthCheckEntryFormValues = {
  type: 'HealthCheck',
  description: '',
  date: '',
  specialist: '',
  healthCheckRating: HealthCheckRating.Healthy,
  diagnosisCodes: []
};

export const HealthCheckForm: React.FC<HealthCheckFormProps> = ({
  onSubmit,
  diagnoses
}) => {
  const [formValues, setFormValues] =
    useState<HealthCheckEntryFormValues>(initialFormValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    if (name === 'diagnosisCodes') {
      // Handle checkbox state for diagnosis codes
      setFormValues(prev => ({
        ...prev,
        diagnosisCodes: checked
          ? [...prev.diagnosisCodes, value]
          : prev.diagnosisCodes.filter(code => code !== value)
      }));
    } else {
      // Handle other input changes
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formValues);
    setFormValues(initialFormValues); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='h6'>Add New HealthCheck Entry</Typography>
      <TextField
        fullWidth
        margin='normal'
        label='Description'
        name='description'
        value={formValues.description}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin='normal'
        label='Date'
        name='date'
        type='date'
        InputLabelProps={{ shrink: true }}
        value={formValues.date}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin='normal'
        label='Specialist'
        name='specialist'
        value={formValues.specialist}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        select
        margin='normal'
        label='Health Check Rating'
        name='healthCheckRating'
        value={formValues.healthCheckRating}
        onChange={handleInputChange}
      >
        {Object.values(HealthCheckRating).map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Typography variant='subtitle1'>Diagnosis Codes</Typography>
      <FormGroup>
        {diagnoses?.map(diagnosis => (
          <FormControlLabel
            key={diagnosis.code}
            control={
              <Checkbox
                name='diagnosisCodes'
                value={diagnosis.code}
                checked={formValues.diagnosisCodes.includes(diagnosis.code)}
                onChange={handleInputChange}
              />
            }
            label={`${diagnosis.code} ${diagnosis.name}`}
          />
        ))}
      </FormGroup>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        style={{ marginTop: '20px' }}
      >
        Add Entry
      </Button>
    </form>
  );
};
