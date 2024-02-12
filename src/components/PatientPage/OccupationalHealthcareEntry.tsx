import { Work as WorkIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Diagnosis, Entry } from '../../types'; // Assuming types are in this path

interface OccupationalHealthcareEntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({
  entry,
  diagnoses
}: OccupationalHealthcareEntryProps) => {
  return (
    <div>
      <WorkIcon />
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

export default OccupationalHealthcareEntry;
