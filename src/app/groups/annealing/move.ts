import { Solution, Restriction } from "./types"; // assuming you've defined these types elsewhere
import { randomIntFromInterval } from ".";

function moveFromLargeGroup(
  solution: Solution,
  restrictions: Restriction[],
  num_groups: number,
): Solution {
  let sol = [...solution]; // Copying the solution so as to not mutate the original array

  //TODO: this is run twice per step. Could abstract it out for efficiency
  let studentToGroup = new Map<number, number>();
  for (let entry of solution) {
    studentToGroup.set(entry.student.id, entry.group);
  }

  // Look for a constraint violation
  for (let { student1, student2 } of restrictions) {
    if (studentToGroup.get(student1) === studentToGroup.get(student2)) {
      let index = randomIntFromInterval(
        0,
        sol.filter((group) => group !== sol[student1]).length - 1,
      );
      sol.find((s) => s.student.id === student1)!.group = index;
    }
    // Move student1 to a different group
  }

  // Find the largest group
  let groupSizes: number[] = Array(num_groups).fill(0);
  for (let item of sol) {
    groupSizes[item.group]++;
  }
  let largestGroup = groupSizes.indexOf(Math.max(...groupSizes));

  // Find the smallest group
  let smallestGroup = groupSizes.indexOf(Math.min(...groupSizes));

  // Move a random student from the largest group to the smallest group
  let indices = sol.reduce(
    (acc: number[], solItem, index) =>
      solItem.group === largestGroup ? [...acc, index] : acc,
    [],
  );
  let index = randomIntFromInterval(0, indices.length - 1);
  sol[indices[index]].group = smallestGroup;

  return sol;
}

function randomMove(
  solution: Solution,
  restrictions: Restriction[],
  num_groups: number,
): Solution {
  let index = randomIntFromInterval(0, solution.length - 1);
  let new_group = randomIntFromInterval(0, num_groups - 1);
  solution[index].group = new_group;
  return solution;
}

export function makeMove(
  solution: Solution,
  restrictions: Restriction[],
  num_groups: number,
): Solution {
  return moveFromLargeGroup(solution, restrictions, num_groups);
}
