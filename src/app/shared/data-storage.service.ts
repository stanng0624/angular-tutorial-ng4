import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  url = 'https://ng-recipe-book-15fab.firebaseio.com/';

  constructor(private http: Http,
              private authService: AuthService,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    if (!this.authService.isAuthenticated()) {
      return null;
    }

    const token = this.authService.getToken();

    return this.http.put(
      this.url + 'recipe.json?auth=' + token,
      this.recipeService.getRecipes()
    );
  }

  getRecipes(populateDataIfNoDataFound = false) {
    if (!this.authService.isAuthenticated()) {
      return null;
    }

    const token = this.authService.getToken();

    return this.http.get(this.url + 'recipe.json?auth=' + token)
      .map(
        (response: Response) => {
          let recipes: Recipe[] = response.json();

          if (!recipes && populateDataIfNoDataFound) {
            this.recipeService.populateData();
            recipes = this.recipeService.getRecipes();
          }

          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
