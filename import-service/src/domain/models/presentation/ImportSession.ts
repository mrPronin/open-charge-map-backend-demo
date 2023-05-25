export interface ImportSession {
  ID: string;
  poiAmount: number;
  modifiedsince: Date;
  startDate: Date;
  endDate: Date;
}

export interface ImportSessionInput {
  poiAmount: number;
  modifiedsince: Date;
  startDate: Date;
  endDate: Date;
}
