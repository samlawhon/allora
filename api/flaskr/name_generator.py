"""
Okay Linters, this module creates is a random name generator
"""

from random import randint


"""
This is the random name generator
"""
def nameofroute():
    quotes = open("static/Johnny and Max Quotes.txt", "r")

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


print(nameofroute())
