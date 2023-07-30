import { Solution, Restriction } from "./types"; // assuming you've defined these types elsewhere
import { deepCopy, randomIntFromInterval } from ".";

/**
 * Function to move a student from the larget group to the smallest group.
 * It will additionally move one restriction violation to a random group.
 * This helps makes the groups even and remove violations.
 * @param solution the current solution to modify
 * @param num_groups number of groups to make
 * @param restrictions students who cannot be in the same group
 * @returns new solution
 **/
function moveFromLargeGroup(
  solution: Solution,
  restrictions: Restriction[],
  num_groups: number,
): Solution {
  let sol = deepCopy(solution); // Copying the solution so as to not mutate the original array

  //TODO: this is run twice per step. Could abstract it out for efficiency
  let studentToGroup = new Map<number, number>();
  for (let entry of sol) {
    studentToGroup.set(entry.student.id, entry.group);
  }

  // Look for a constraint violation
  for (let { student1, student2 } of restrictions) {
    if (studentToGroup.get(student1) === studentToGroup.get(student2)) {
      let index = randomIntFromInterval(
        0,
        sol.filter((item) => item.group !== studentToGroup.get(student1))
          .length - 1,
      );
      sol.find((s) => s.student.id === student1)!.group = sol[index].group;
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
  const sol = deepCopy(solution);
  let index = randomIntFromInterval(0, sol.length - 1);
  let new_group = randomIntFromInterval(0, num_groups - 1);
  sol[index].group = new_group;
  return sol;
}

/**
 * Makes moves in the solution in order to progress to a better one.
 * @param solution the current solution to modify
 * @param num_groups number of groups to make
 * @param restrictions students who cannot be in the same group
 * @returns new solution
 **/
export function makeMove(
  solution: Solution,
  restrictions: Restriction[],
  num_groups: number,
): Solution {
  return moveFromLargeGroup(solution, restrictions, num_groups);
}
