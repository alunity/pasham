import json
from random import randint


def getRandomRecipe():
    f = open('recipes.json')
    recipes = json.load(f)
    chosenRecipe = recipes[randint(0, len(recipes) - 1)]
    f.close()
    return chosenRecipe
