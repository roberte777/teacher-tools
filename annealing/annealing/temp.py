"""
This module contains functions to calculate the temperature for a given step.
"""
import math


def linear_change_temp(max_temp, min_temp, steps, step):
    """
    Return the temperature for the given step.
    """
    return max_temp - (max_temp - min_temp) * (step / steps)


def logarithmic_change_temp(max_temp, min_temp, steps, step):
    """
    Return the temperature for the given step.
    """
    return max_temp / (math.log(1 + step) or 0.0001)


def change_temp(max_temp, min_temp, steps, step):
    """ "
    Return the temperature for the given step.
    """
    # return logarithmic_change_temp(max_temp, min_temp, steps, step)
    return linear_change_temp(max_temp, min_temp, steps, step)
