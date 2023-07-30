"""
Simulated annealing algorithm for the group formation problem.
"""
import random
import math
from .temp import change_temp
from .move import make_move


def objective(solution, students, num_groups, restrictions):
    """
    Return the objective value of the given solution.
    """
    # Check if the solution violates any restrictions
    for student1, student2 in restrictions:
        if solution[students.index(student1)] == solution[students.index(student2)]:
            return float("inf")  # Invalid solution

    # Compute the size of each group
    group_sizes = [solution.count(i) for i in range(num_groups)]

    # Compute the variance of the group sizes
    mean_size = sum(group_sizes) / num_groups
    variance = sum((size - mean_size) ** 2 for size in group_sizes) / num_groups
    return variance  # Lower is better


def simulated_annealing(students, num_groups, restrictions, max_temp, min_temp, steps):
    """
    Return a solution to the group formation problem.
    """
    # Initial solution
    solution = [random.randint(0, num_groups - 1) for _ in students]
    starting_sol = solution[:]
    best_solution = list(solution)
    best_score = objective(solution, students, num_groups, restrictions)

    for step in range(steps):
        temp = change_temp(max_temp, min_temp, steps, step)

        # Make a move
        new_solution = make_move(list(solution), restrictions, num_groups)
        new_score = objective(new_solution, students, num_groups, restrictions)

        # Accept the move with a certain probability
        if new_score < best_score or random.random() < math.exp(
            (best_score - new_score) / temp
        ):
            solution = new_solution
            if new_score < best_score:
                best_solution = new_solution
                best_score = new_score
    if starting_sol == solution:
        print("No change")
    return [
        [students[i] for i, group in enumerate(best_solution) if group == g]
        for g in range(num_groups)
    ], best_score
