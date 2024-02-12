import { LocalHospital as LocalHospitalIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Diagnosis, Entry } from '../../types'; // Assuming types are in this path

interface HospitalEntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
  console.log('🚀 ~ HospitalEntry ~ diagnoses:', diagnoses);
  console.log('🚀 ~ HospitalEntry ~ entry:', entry);
  return (
    <div>
      <LocalHospitalIcon />
      <Typography variant='body1'>
        {entry.date} {entry.description}
      </Typography>
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>
            {code} {diagnoses?.find(d => d.code === code)?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalEntry;
