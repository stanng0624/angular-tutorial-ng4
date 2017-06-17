import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShoppingEditValidators } from './shopping-edit.validators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingEditForm') shoppingEditForm: FormGroup;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  // @ViewChild('nameInput') nameInput: ElementRef;
  // @ViewChild('amountInput') amountInput: ElementRef;
  // private ingredientSelectedSubscription: Subscription;
  // private ingredientDeletedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;

        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);

        this.shoppingEditForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        });
      });

    this.shoppingEditForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required, ShoppingEditValidators.postiveAmount])
    });

    // this.ingredientSelectedSubscription = this.shoppingListService.ingredientSelected
    //   .subscribe((ingredient: Ingredient) => {
    //     this.nameInput.nativeElement.value = ingredient.name;
    //     this.amountInput.nativeElement.value = ingredient.amount;
    //   });
    //
    // this.ingredientDeletedSubscription = this.shoppingListService.ingredientDeleted
    //   .subscribe(() => {
    //     this.nameInput.nativeElement.value = '';
    //     this.amountInput.nativeElement.value = 0;
    //   });
  }

  onWrite() {
    // const name = this.nameInput.nativeElement.value;
    // const amount = this.amountInput.nativeElement.value;
    const name = this.shoppingEditForm.get('name').value;
    const amount = this.shoppingEditForm.get('amount').value;
    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.editMode = false;
    this.shoppingEditForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.shoppingEditForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    // this.ingredientSelectedSubscription.unsubscribe();
    // this.ingredientDeletedSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }
}
