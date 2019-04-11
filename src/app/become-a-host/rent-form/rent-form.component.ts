import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RoomComponent} from '../room/room.component';
import {ActivatedRoute, Router} from '@angular/router';
import {RentFormService} from './rent-form.service';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css'],
})
export class RentFormComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private rentFormService: RentFormService) {
    this.initRoutingSettings();
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
  tabs = [
    {
      id: 'room',
      name: 'Тип помешкання',
      component: null,
      submited: false,
    },
    {
      id: 'guests-and-beds',
      name: 'Спальні',
      component: null,
      submited: false,
    },
    {
      id: 'bathroom',
      name: 'Санвузол',
      component: null,
      submited: false,
    },
    {
      id: 'household-appliances',
      name: 'Побутова техніка',
      component: null,
      submited: false,
    },

    {
      id: 'facilities',
      name: 'Зручності',
      component: null,
      submited: false,
    },
    {
      id: 'limits',
      name: 'Обмеження',
      component: null,
      submited: false,
    },
    {
      id: 'location',
      name: 'Адреса',
      component: null,
      submited: false,
    },
    {
      id: 'map',
      name: 'Мапа',
      component: null,
      submited: false,
    },

  ];
  tabIsSubmiting = false;
  currentTab = this.tabs[0];
  isCreatingANewRent: boolean;
  private static isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
  }

  ngOnInit() {
  }
  async showNextTab() {
    this.tabIsSubmiting = true;
    const tabSubmited = await this.currentTab.component.onSubmit();
    this.tabIsSubmiting = false;
    if (!tabSubmited) {
      this.currentTab.submited = false;
      return;
    }
    this.currentTab.submited = true;
    const currentTabIndex = this.getTabIndexById(this.currentTab.id);
    if (currentTabIndex >= this.tabs.length - 1) {
      return;
    }
    this.showTabByTabIndex(this.getTabIndexById(this.currentTab.id) + 1);
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
    this.showTabByTabIndex(this.getTabIndexById(this.currentTab.id) - 1);
  }
  showTabById(tabId: string): void {
    if (this.currentTab.id === tabId) {
      return;
    }
    this.currentTab = this.getTabById(tabId);
    this.afterTabShown();
  }
  showTabByTabIndex(index: number): void {
    this.currentTab = this.tabs[index];
    this.afterTabShown();
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

  private initRoutingSettings() {
    this.route.params.subscribe( params => {
      if (!params['id'] && !params['tabName']) {
        console.log('NEW (not id and tabName)');
        this.isCreatingANewRent = true;
      } else {
        this.isCreatingANewRent = false;
        if (!RentFormComponent.isNormalInteger(params['id'])) {
          this.router.navigate(['/become-a-host/page-not-found']);
        }
        const tabIds = this.tabs.map(obj => {
          return obj.id;
        });
        if (tabIds.indexOf(params['tabName']) === -1) {
          this.router.navigate(['/become-a-host/page-not-found']);
        }
        this.rentFormService.loadRent(params['id']).subscribe(data => {
          this.rentFormService.setFormData(data);

        });
        window.history.replaceState({}, '', `/become-a-host/${params['id']}/${this.currentTab.id}`);

      }
    });
  }

  private afterTabShown() {
    // if (!this.isCreatingANewRent) {
    //   window.history.replaceState({}, '', `${this.}/${this.currentTab.id}`);
    // }
  }
}
