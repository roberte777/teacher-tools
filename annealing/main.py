"""
Make groups
"""
import random

import annealing

STEPS = 1000
MAX_TEMP = 10.0
MIN_TEMP = 0.1


def make_restrictions(num_students, num_restrictions):
    """
    Make a list of random restrictions.
    """
    restrictions = []
    for _ in range(num_restrictions):
        student1 = random.randint(0, num_students - 1)
        student2 = random.randint(0, num_students - 1)
        if student1 != student2:
            restrictions.append((student1, student2))
    return restrictions


def main():
    """
    Make groups.
    """
    num_groups = 5
    num_students = 30
    students = list(
        range(num_students)
    )  # Students are represented as integers from 0 to 9
    restrictions = make_restrictions(
        num_students, 15
    )  # Students 0 and 1, and 2 and 3, cannot be in the same group
    print(f"Restrictions: {restrictions}")

    groups, variance = annealing.simulated_annealing(
        students, num_groups, restrictions, MAX_TEMP, MIN_TEMP, STEPS
    )

    for i, group in enumerate(groups):
        print(f"Group {i+1}: {group}")
    print(f"Variance: {variance}")
    # print the size of each group
    group_sizes = [len(group) for group in groups]
    print(f"Group sizes: {group_sizes}")


if __name__ == "__main__":
    main()
