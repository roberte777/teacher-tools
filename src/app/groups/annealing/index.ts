import { makeMove } from "./move";
import { change_temp } from "./temp";
import { Restriction, Solution, Student } from "./types";

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function makeGroups(
  students: Student[],
  restrictions: Restriction[],
  numGroups: number,
): { finalSolution: Student[][]; score: number } {
  let maxTemp = 10;
  let minTemp = 1;
  let steps = 1000;
  return simulated_annealing(
    students,
    restrictions,
    numGroups,
    maxTemp,
    minTemp,
    steps,
  );
}

function simulated_annealing(
  students: Student[],
  restrictions: Restriction[],
  numGroups: number,
  maxTemp: number,
  minTemp: number,
  steps: number,
): { finalSolution: Student[][]; score: number } {
  const startingSolution: Solution = students.map((student) => {
    let grp = randomIntFromInterval(0, numGroups - 1);
    let test = { student, group: grp };
    return test;
  });
  let solution = deepCopy(startingSolution);
  let bestSolution = deepCopy(startingSolution);
  let bestScore = objective(solution, numGroups, restrictions);

  for (let step = 0; step < steps; step++) {
    let temp = change_temp(maxTemp, minTemp, steps, step);

    //Make a move
    let newSolution = makeMove(solution, restrictions, numGroups);
    let newScore = objective(newSolution, numGroups, restrictions);

    // Accept the move with a certain probability
    if (newScore < bestScore || Math.random() < (bestScore - newScore) / temp) {
      solution = newSolution;
      if (newScore < bestScore) {
        bestSolution = newSolution;
        bestScore = newScore;
      }
    }
  }
  if (startingSolution == solution) {
    console.log("NO CHANGE");
  }
  // Create a nicer output forthe final solution
  let groupedStudents: Student[][] = Array.from(
    { length: numGroups },
    (_, groupIndex) =>
      solution
        .filter(({ group }) => group === groupIndex)
        .map(({ student }) => student),
  );
  return { finalSolution: groupedStudents, score: bestScore };
}

function objective(
  solution: Solution,
  numGroups: number,
  restrictions: Restriction[],
): number {
  let studentToGroup = new Map<number, number>();
  for (let entry of solution) {
    studentToGroup.set(entry.student.id, entry.group);
  }
  for (let r of restrictions) {
    let { student1, student2 } = r;
    if (studentToGroup.get(student1) === studentToGroup.get(student2)) {
      return Infinity;
    }
  }
  let groupsSizes: number[] = Array(numGroups).fill(0);
  for (let item of solution) {
    groupsSizes[item.group]++;
  }
  let meanSize = groupsSizes.reduce((a, b) => a + b, 0);
  let variance =
    groupsSizes
      .map((size) => Math.pow(size - meanSize, 2))
      .reduce((a, b) => a + b, 0) / numGroups;
  return variance; // lower is better
}
export function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function deepCopy<T>(arr: T[]): T[] {
  let clonedArray = JSON.parse(JSON.stringify(arr));
  return clonedArray;
}
