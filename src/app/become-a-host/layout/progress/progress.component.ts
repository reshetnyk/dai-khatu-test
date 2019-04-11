import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {


  @Output() showingTabListener = new EventEmitter<string>();
  @Input() tabs: any;
  @Input() currentTab: any;
  constructor() { }
  ngOnInit() {
  }
  showTab(tabId: string) {
    this.showingTabListener.emit(tabId);
  }
}
