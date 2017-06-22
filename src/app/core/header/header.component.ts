import {
  Component,
  // EventEmitter,
  // Output,
} from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // @Output() menuItemButtonSelected = new EventEmitter<string> ();

  constructor(public authService: AuthService,
              private dataStorageService: DataStorageService) { }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response.json());
          return response;
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  // onMenuItemButtonClicked(menuButtonName: string) {
  //   this.menuItemButtonSelected.emit(menuButtonName);
  // }
}
