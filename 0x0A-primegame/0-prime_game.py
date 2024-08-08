#!/usr/bin/python3
"""Prime Game"""


def isWinner(x, nums):
    """Function that returns the name of the player
    that won the most rounds"""
    if not nums or x < 1:
        return None
    n = max(nums)
    number = [True for _ in range(max(n + 1, 2))]
    for i in range(2, int(pow(n, 0.5)) + 1):
        if not number[i]:
            continue
        for j in range(i*i, n + 1, i):
            number[j] = False

    number[0] = number[1] = False
    c = 0
    for i in range(len(number)):
        if number[i]:
            c += 1
        number[i] = c

    player1 = 0
    for n in nums:
        player1 += number[n] % 2 == 1
    if player1 * 2 == len(nums):
        return None
    if player1 * 2 > len(nums):
        return "Maria"
    return "Ben"