import { Component } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase ) {
    this.itemsRef = db.list('items');

    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
 }

  insertIem(item: string) {
    this.itemsRef.push({ name: item });
  }
  updateItem(key: string, newItem: string) {
    this.itemsRef.update(key, { name: newItem });
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
}
