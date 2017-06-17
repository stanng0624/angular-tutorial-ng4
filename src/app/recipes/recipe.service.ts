import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject();

  constructor(
    private router: Router,
    private shoppingListService: ShoppingListService) {
  }

  recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'This is simply a test',
      'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/3/1/0/FNM_040111-WN-Dinners-010_s4x3.jpg.rend.hgtvcom.966.725.jpeg',
      [
        new Ingredient('Meet', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Recipe 2',
      'This is simply a test',
      'http://s3.amazonaws.com/finecooking.s3.tauntonclud.com' +
      '/app/uploads/2017/04/18180350/051SIP112-grilled-mustard-rosemary-chicken-recipe-alt-main.jpg',
      [
        new Ingredient('Meet', 1),
        new Ingredient('French Fries', 10)
      ]
    ),
    new Recipe(
      'Recipe 3',
      'This is another testing',
      'http://del.h-cdn.co/assets/15/24/980x980/gallery-1434205964-delish-buffalo-chicken-burger-recipe.jpg',
      [
        new Ingredient('Meet', 2),
        new Ingredient('French Fries', 14)
      ]
    )
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);

    this.router.navigate(['/shopping-list']);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }
}
