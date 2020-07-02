"""
Okay Linters, this module creates is a random name generator
"""
import os
from random import randint


"""
This is the random name generator
"""
def nameofroute():
    # quotes_file = os.path.join(os.path.dirname(os.path.realpath(__name__)), "johnny_and_max_quotes.txt")
    quotes_file = '/Users/samuellawhon/Documents/Projects/eldora/api/flaskr/johnny_and_max_quotes.txt'
    quotes = open(quotes_file, "r")

    randline = randint(0, 75)  # length of file

    count = 0

    for line in quotes:
        if count < randline:
            count += 1
        elif count == randline:
            return line
        else:
            break

    quotes.close()

    return "how do I write a function that works? - Sam"
