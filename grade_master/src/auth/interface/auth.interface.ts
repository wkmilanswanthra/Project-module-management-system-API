export enum Role {
  PROJECT_COORDINATOR = 'PROJECT_COORDINATOR',
  MEMBER = 'MEMBER',
  EXAMINER = 'EXAMINER',
  SUPERVISOR = 'SUPERVISOR',
  CO_SUPERVISOR = 'CO_SUPERVISOR',
  PROJECT_LEADER = 'PROJECT_LEADER',
  STAFF = 'STAFF',
  STUDENT = 'STUDENT',
}

export enum Specialization {
  IT = 'IT',
  SE = 'SE',
  IS = 'IS',
  CS = 'CS',
  DS = 'DS',
  CSNE = 'CSNE',
}

export enum Batch {
  REGULAR = 'REGULAR',
  JUNE = 'JUNE',
}

type User = {
  username: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  specialization: Specialization;
  batch: Batch;
  position: string;
  contact: string;
  registrationNumber: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IAuthenticate {
  readonly token: string;
}
