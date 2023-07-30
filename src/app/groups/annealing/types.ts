export interface Student {
  id: number;
  name: string;
}

export interface Restriction {
  student1: number;
  student2: number;
}
export type SolutionItem = {
  student: Student;
  group: number;
};
export type Solution = SolutionItem[];
