export type Student = {
  name: string;
  id: number;
};
export let students = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
  { id: 5, name: "Eva" },
  { id: 6, name: "Frank" },
  { id: 7, name: "Grace" },
  { id: 8, name: "Helen" },
  { id: 9, name: "Ian" },
  { id: 10, name: "Jack" },
  { id: 11, name: "Kate" },
  { id: 12, name: "Liam" },
  { id: 13, name: "Mia" },
  { id: 14, name: "Noah" },
  { id: 15, name: "Olivia" },
  { id: 16, name: "Paul" },
  { id: 17, name: "Quinn" },
  { id: 18, name: "Rose" },
  { id: 19, name: "Steve" },
  { id: 20, name: "Tracy" },
  { id: 21, name: "Uma" },
  { id: 22, name: "Victor" },
  { id: 23, name: "Wendy" },
  { id: 24, name: "Xavier" },
  { id: 25, name: "Yara" },
  { id: 26, name: "Zack" },
  { id: 27, name: "Amy" },
  { id: 28, name: "Brian" },
  { id: 29, name: "Catherine" },
  { id: 30, name: "Derek" },
];
function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function makeRestrictions(
  num_students: number,
  num_restrictions: number,
): { student1: number; student2: number }[] {
  let restrictions: { student1: number; student2: number }[] = [];
  while (restrictions.length < num_restrictions) {
    let student1 = randomIntFromInterval(0, num_students - 1);
    let student2 = randomIntFromInterval(0, num_students - 1);
    if (
      student1 !== student2 &&
      !restrictions.find(
        (r) =>
          (r.student1 === student1 && r.student2 === student2) ||
          (r.student1 === student2 && r.student2 === student1),
      )
    ) {
      restrictions.push({ student1, student2 });
    }
  }
  return restrictions;
}
