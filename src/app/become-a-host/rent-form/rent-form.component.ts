import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit {
  tabs = [
    {
      id: 'room',
      name: 'Тип помешкання',
      url: 'room'
    },
    {
      id: 'guests-and-beds',
      name: 'Спальні',
      url: 'guests-and-beds'
    },
    {
      id: 'bathroom',
      name: 'Санвузол',
      url: 'bathroom'
    },
    {
      id: 'household-appliances',
      name: 'Побутова техніка',
      url: 'household-appliances'
    },

    {
      id: 'facilities',
      name: 'Зручності',
      url: 'facilities'
    },
    {
      id: 'limits',
      name: 'Обмеження',
      url: 'limits'
    },
    {
      id: 'location',
      name: 'Місцезнаходження',
      url: 'location'
    },
    {
      id: 'map',
      name: 'Місцезнаходження',
      url: 'map'
    },

  ];
  currentTab = this.tabs[0];
  constructor() {
  }

  ngOnInit() {
  }
  showNextTab(): void {
    const currentTabIndex = this.getTabIndexById(this.currentTab.id);
    if (currentTabIndex >= this.tabs.length - 1) {
      return;
    }
    this.currentTab = this.tabs[this.getTabIndexById(this.currentTab.id) + 1];
  }

  showPrevTab(): void {
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
    window.history.replaceState({}, '', `/${this.currentTab.url}`);
  }
}
