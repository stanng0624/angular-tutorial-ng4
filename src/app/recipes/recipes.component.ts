import { Component, OnDestroy, OnInit } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  getRecipesSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      console.log('Not autherized!');

      this.router.navigate(['../signin'], {relativeTo: this.route});
    }

    this.getRecipesSubscription = this.dataStorageService.getRecipes(true);
  }

  ngOnDestroy() {
    if (this.getRecipesSubscription) {
      this.getRecipesSubscription.unsubscribe();
    }
  }
}
