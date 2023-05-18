export interface ImportSession {
  ID: string;
  poiAmount: number;
  modifiedsince: Date;
  startDate: Date;
  endDate: Date;
}

export interface ImportSessionCreateInput {
  poiAmount: number;
  modifiedsince: Date;
  startDate: Date;
  endDate: Date;
}