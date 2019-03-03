import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
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
