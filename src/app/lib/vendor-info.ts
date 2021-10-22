export interface IVendorInfo {
  server: string;
  branch: string;
  rooms?: IRoomsEntity[] | null;
}

export interface IRoomsEntity {
  name: string;
  title: string;
  status: string;
  productionInfo: IProductionInfo;
}

export interface IProductionInfo {
  url: string;
}

export interface ISkinInfo {
  id: string;
}
