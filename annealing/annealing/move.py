"""
This module contains functions for making moves in the search space.
"""
import random


def make_move(solution, restrictions, num_groups):
    """
    Make a random move.
    """
    sol = move_from_large_group(solution, restrictions, num_groups)
    return sol


def move_from_large_group(solution: list[int], restrictions, num_groups):
    """
    Move a random student from the largest group to the smallest group.
    """
    # Look for a constraint violation
    for student1, student2 in restrictions:
        if solution[student1] == solution[student2]:
            # Move student1 to a different group
            index = random.choice(
                [
                    group
                    for _, group in enumerate(solution)
                    if group != solution[student1]
                ]
            )
            solution[student1] = index

    # Find the largest group
    group_sizes = [solution.count(i) for i in range(num_groups)]
    largest_group = group_sizes.index(max(group_sizes))

    # Find the smallest group
    smallest_group = group_sizes.index(min(group_sizes))

    # Move a random student from the largest group to the smallest group
    index = random.choice(
        [i for i, group in enumerate(solution) if group == largest_group]
    )
    solution[index] = smallest_group

    return solution


def random_move(solution, restrictions, num_groups):
    """
    Move a random student to a random group.
    """
    index = random.randint(0, len(solution) - 1)
    new_group = random.randint(0, num_groups - 1)
    solution[index] = new_group
    return solution
