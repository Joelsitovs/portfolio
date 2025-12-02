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
export class Skills implements OnInit{
  frontendGridOptions: GridStackOptions = {
    column: 2,
    margin: 5,
    cellHeight: 120,
    float: true,
  };
  ngOnInit() {
    console.log('🔥 ngOnInit SkillsComponent');
  }

}
