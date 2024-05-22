export interface Owner {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface NoteBlock {
  id: string;
  type: string;
  data: {
    text: string;
    level?: number;
  };
}

export interface Notes {
  time: number;
  blocks: NoteBlock[];
}

export interface Status {
  id: number;
  status: string;
  note: string;
  createdAt: string;
}

export interface Visit {
  id: number;
  reason: string;
  vetName: string;
  createdAt: string;
  updatedAt: string;
  isCompletedAt?: string;
  notes: Notes;
  statuses: Status[];
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  type: string;
  breed: string;
  owners: Owner[];
  visits: Visit[];
}
