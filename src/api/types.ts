export type Arrhythmia = 'AFib' | 'AV Block' | 'Pause' | 'PSVC' | 'PVC';

export type Status = 'PENDING' | 'REJECTED' | 'DONE';

export type Card = {
  id: number;
  arrhythmias: Array<Arrhythmia>;
  created_date: string;
  patient_name: string;
  status: Status;
};
