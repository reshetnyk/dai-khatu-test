export class VillageItem {
  id: number;
  regionId: number;
  village: string;
  constructor(id: number, regionId: number, village: string) {
    this.id = id;
    this.regionId = regionId;
    this.village = village;
  }
}
export interface IVillageResponse {
  villages: VillageItem[];
}

