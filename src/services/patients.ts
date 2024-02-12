import axios from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id: string | undefined) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

// Add a function to validate and create a new entry
const addEntryToPatient = async (patientId: string, entry: Entry): Patient => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  );

  return data;
};

export default {
  getAll, create, getPatient, addEntryToPatient
};

