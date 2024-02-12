// Update the imports to include new types
import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { HealthCheckRating, Diagnosis, Entry } from '../../types';

// Extend the form values to handle different entry types
export interface EntryFormValues {
  type: Entry['type']; // Adjust based on your actual type definitions
  description: string;
  date: string;
  specialist: string;
  healthCheckRating?: HealthCheckRating;
  diagnosisCodes: string[];
  // Add fields for Hospital and OccupationalHealthcare entries
  dischargeDate?: string;
  dischargeCriteria?: string;
  employerName?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
}

// Initial form values adjusted for the extended EntryFormValues interface
const initialFormValues: EntryFormValues = {
  type: 'HealthCheck', // Default type
  description: '',
  date: '',
  specialist: '',
  healthCheckRating: HealthCheckRating.Healthy,
  diagnosisCodes: []
  // Initialize additional fields as needed
};

interface EntryFormProps {
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[] | null;
}

export const EntryForm: React.FC<EntryFormProps> = ({
  onSubmit,
  diagnoses
}) => {
  const [formValues, setFormValues] =
    useState<EntryFormValues>(initialFormValues);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    if (name === 'diagnosisCodes') {
      // For checkboxes, adjust the diagnosisCodes array
      setFormValues(prevValues => {
        let newDiagnosisCodes = [...prevValues.diagnosisCodes];
        if (checked) {
          newDiagnosisCodes = [...newDiagnosisCodes, value];
        } else {
          newDiagnosisCodes = newDiagnosisCodes.filter(code => code !== value);
        }
        return { ...prevValues, diagnosisCodes: newDiagnosisCodes };
      });
    } else {
      // For other inputs, simply update the value
      setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formValues);
    setFormValues(initialFormValues); // Reset form after submission
  };

  // Render form based on the selected entry type
  const renderFormFields = () => {
    switch (formValues.type) {
      case 'HealthCheck':
        return (
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
        );
      case 'Hospital':
        return (
          <>
            <TextField
              fullWidth
              margin='normal'
              label='Discharge Date'
              name='dischargeDate'
              type='date'
              InputLabelProps={{ shrink: true }}
              value={formValues.dischargeDate}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Discharge Criteria'
              name='dischargeCriteria'
              value={formValues.dischargeCriteria}
              onChange={handleInputChange}
            />
          </>
        );
      case 'OccupationalHealthcare':
        return (
          <>
            <TextField
              fullWidth
              margin='normal'
              label='Employer Name'
              name='employerName'
              value={formValues.employerName}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Sick Leave Start Date'
              name='sickLeaveStartDate'
              type='date'
              InputLabelProps={{ shrink: true }}
              value={formValues.sickLeaveStartDate}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Sick Leave End Date'
              name='sickLeaveEndDate'
              type='date'
              InputLabelProps={{ shrink: true }}
              value={formValues.sickLeaveEndDate}
              onChange={handleInputChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='h6'>Add New Entry</Typography>
      <FormControl fullWidth>
        <InputLabel id='entry-type-select-label'>Entry Type</InputLabel>
        <Select
          labelId='entry-type-select-label'
          id='entry-type-select'
          value={formValues.type}
          label='Entry Type'
          onChange={handleInputChange}
          name='type'
        >
          <MenuItem value='HealthCheck'>HealthCheck</MenuItem>
          <MenuItem value='Hospital'>Hospital</MenuItem>
          <MenuItem value='OccupationalHealthcare'>
            OccupationalHealthcare
          </MenuItem>
        </Select>
      </FormControl>
      {/* Common fields */}
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
      {/* Diagnosis Codes */}
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
                onChange={event =>
                  handleInputChange(
                    event as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            }
            label={`${diagnosis.code} ${diagnosis.name}`}
          />
        ))}
      </FormGroup>
      {/* Dynamic fields based on entry type */}
      {renderFormFields()}
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
