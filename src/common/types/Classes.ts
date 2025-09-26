interface Subject {
  _id: string;
  name: string;
}

interface Major {
  _id: string;
  name: string;
}

interface Teacher {
  _id: string;
  username: string;
}

export interface IClass {
  _id: string;
  subjectId: Subject;
  majorId: Major;
  name: string;
  teacherId?: Teacher;
  studentIds?: string[];
  startDate: string;
  totalSessions: number;
  shift: string;
  room: string[];
  description?: string;
  maxStudents: number;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  daysOfWeek: number[];
}

