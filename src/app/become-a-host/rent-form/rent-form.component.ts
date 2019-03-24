import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RoomComponent} from '../room/room.component';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css'],
})
export class RentFormComponent implements OnInit {
  tabs = [
    {
      id: 'room',
      name: 'Тип помешкання',
      component: null,
    },
    {
      id: 'guests-and-beds',
      name: 'Спальні',
      component: null,
    },
    {
      id: 'bathroom',
      name: 'Санвузол',
      component: null,
    },
    {
      id: 'household-appliances',
      name: 'Побутова техніка',
      component: null,
    },

    {
      id: 'facilities',
      name: 'Зручності',
      component: null,
    },
    {
      id: 'limits',
      name: 'Обмеження',
      component: null,
    },
    {
      id: 'location',
      name: 'Місцезнаходження',
      component: null,
    },
    {
      id: 'map',
      name: 'Місцезнаходження',
      component: null,
    },

  ];
  currentTab = this.tabs[0];
  constructor() {
  }

  ngOnInit() {
  }
  @ViewChild('room') set room(comp: ElementRef) {
    this.tabs[0].component = comp;
  }
  @ViewChild('guests') set guests(comp: ElementRef) {
    this.tabs[1].component = comp;
  }
  @ViewChild('bathroom') set bathroom(comp: ElementRef) {
    this.tabs[2].component = comp;
  }
  @ViewChild('householdAppliances') set householdAppliances(comp: ElementRef) {
    this.tabs[3].component = comp;
  }
  @ViewChild('facilities') set facilities(comp: ElementRef) {
    this.tabs[4].component = comp;
  }
  @ViewChild('limits') set limits(comp: ElementRef) {
    this.tabs[5].component = comp;
  }
  @ViewChild('location') set location(comp: ElementRef) {
    this.tabs[6].component = comp;
  }
  @ViewChild('map') set map(comp: ElementRef) {
    this.tabs[7].component = comp;
  }
  showNextTab(): void {
    if (!this.currentTab.component.onSubmit()) {
      return;
    }
    const currentTabIndex = this.getTabIndexById(this.currentTab.id);
    if (currentTabIndex >= this.tabs.length - 1) {
      return;
    }
    this.currentTab = this.tabs[this.getTabIndexById(this.currentTab.id) + 1];
    console.log(this.currentTab.id);
  }

  showPrevTab(): void {
    if (!this.currentTab.component.onSubmit()) {
      return;
    }
    const currentTabIndex = this.getTabIndexById(this.currentTab.id);
    if (currentTabIndex <= 0) {
      return;
    }
    this.currentTab = this.tabs[this.getTabIndexById(this.currentTab.id) - 1];
  }
  showTab(tabId: string): void {
    if (this.currentTab.id === tabId) {
      return;
    }
    this.currentTab = this.getTabById(tabId);
  }
  getTabIndexById(tabId: string): number {
    for (let i = 0; i < this.tabs.length; i++) {
      if (tabId === this.tabs[i].id) {
        return i;
      }
    }
  }
  getTabById(tabId: string): any {
    for (const tab of this.tabs) {
      if (tabId === tab.id) {
        return tab;
      }
    }
  }
  onTabChange() {
    window.history.replaceState({}, '', `/${this.currentTab.id}`);
  }
}
