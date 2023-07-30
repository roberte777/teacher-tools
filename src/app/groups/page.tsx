"use client";
import { useEffect, useState } from "react";
import { makeGroups } from "./annealing";
import { makeRestrictions, students } from "./test";
import { Restriction, Student } from "./annealing/types";

export default function Home() {
  let [restrictions, setRestriction] = useState<Restriction[]>([]);
  let [groups, setGroups] = useState<Student[][]>([]);
  let [conflictions, setConflictions] = useState<Student[]>([]);
  useEffect(() => {
    setRestriction(makeRestrictions(students.length, 15));
  }, []);
  useEffect(() => {
    setConflictions(findConflictions(groups, restrictions));
  }, [restrictions, groups]);
  return (
    <main className="">
      <h1 className="font-bold text-4xl">Testing Groups</h1>
      <div className="m-5">
        <button
          onClick={() => {
            setGroups(makeGroups(students, restrictions, 5).finalSolution);
          }}
          className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Make Groups with Restrictions
        </button>
      </div>
      <div className="flex mb-5">
        <div className="basis-1/2">
          <h2 className="text-xl underline mb-1">Groups:</h2>
          <div>
            {groups.map((studentList, i) => (
              <div className="ml-5" key={`group-${i}`}>
                Group {i + 1}:
                {studentList.map((s, j) => (
                  <div className="ml-10" key={`group-member-${i}-${j}`}>
                    {s.name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl underline mb-1">Restrictions:</h2>
          {restrictions.map((r, i) => (
            <div key={`restriction-${i}`}>
              {students.find((s) => s.id === r.student1)?.name}-{" "}
              {students.find((s) => s.id === r.student2)?.name}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xl underline mb-1">Conflictions:</div>
        {conflictions.length > 0
          ? conflictions.map((s) => <div>{s.name}</div>)
          : "None"}
      </div>
    </main>
  );
}
function findConflictions(
  groups: Student[][],
  restrictions: Restriction[],
): Student[] {
  let studentToGroup = new Map<number, number>();
  groups.forEach((group, i) => {
    for (let entry of group) {
      studentToGroup.set(entry.id, i);
    }
  });

  // Look for a constraint violation
  let conflictions = [];
  for (let { student1, student2 } of restrictions) {
    if (studentToGroup.get(student1) === studentToGroup.get(student2)) {
      let s1 = groups.find((g) => g.find((s) => s.id === student1));
      if (s1) {
        conflictions.push(s1[0]);
      }
      let s2 = groups.find((g) => g.find((s) => s.id === student2));
      if (s2) {
        conflictions.push(s2[0]);
      }
    }
  }
  return conflictions;
}
