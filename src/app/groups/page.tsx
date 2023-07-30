"use client";
import { useState } from "react";
import { makeGroups } from "./annealing";
import { makeRestrictions, students } from "./test";
import { Student } from "./test";

export default function Home() {
  let [restrictions, setRestriction] = useState(
    makeRestrictions(students.length, 15),
  );
  let [groups, setGroups] = useState<Student[][]>([]);
  return (
    <main className="">
      <div>Testing </div>
      <button
        onClick={() => {
          setGroups(makeGroups(students, restrictions, 5).finalSolution);
        }}
      >
        Test
      </button>
      <div>Groups:</div>
      <div>
        {groups.map((studentList, i) => (
          <div className="ml-5">
            Group {i}:
            {studentList.map((s) => (
              <div className="ml-5">{s.name}</div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
