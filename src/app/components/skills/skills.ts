import {Component, OnInit} from '@angular/core';
import {GridstackComponent, GridstackItemComponent} from 'gridstack/dist/angular';
import {GridStackOptions} from 'gridstack';
@Component({
  selector: 'app-skills',
    imports: [
        GridstackComponent,
        GridstackItemComponent
    ],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  frontendGridOptions: GridStackOptions = {
    column: 3,
    cellHeight: 120,
    float: true,
    resizable: {
      handles: 'e,w'
    }
  };
}
