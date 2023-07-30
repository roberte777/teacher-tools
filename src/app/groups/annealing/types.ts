export interface Student {
  id: number;
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
