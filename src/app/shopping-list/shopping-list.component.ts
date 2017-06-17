import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  selectedIngredients: Ingredient;

  private ingredientSelectedSubscription: Subscription;
  private ingredientsChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.selectedIngredients = new Ingredient('', 0);

    this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredients = this.shoppingListService.ingredients;

    this.ingredientSelectedSubscription = this.shoppingListService.ingredientSelected
      .subscribe((ingredient: Ingredient) => {
          this.selectedIngredients = ingredient;
        }
      );

    this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  onSelected(ingredient: Ingredient) {
    this.shoppingListService.ingredientSelected.next(ingredient);
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.ingredientsChangedSubscription.unsubscribe();
    this.ingredientSelectedSubscription.unsubscribe();
  }
}
