export class RegionItem {
  id: number;
  region: string;
  constructor(id: number, region: string) {
    this.id = id;
    this.region = region;
  }

}
export interface IRegionResponse {
  regions: RegionItem[];
}
