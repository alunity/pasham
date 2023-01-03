import json
from random import randint
def getRandomRecipe():
    f = open('recipes.json')
    x = randint(0,3)
    recipes = json.load(f)
    chosenRecipe = recipes[x]
    return chosenRecipe
    f.close()
getRandomRecipe()
