import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Diagnosis, Entry } from '../../types'; // Assuming types are in this path

interface HealthCheckEntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  return (
    <div>
      <FavoriteIcon />
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

export default HealthCheckEntry;
