export interface CreateProjectReqDto {
  name: string;
  client: string;
  address: string;
  uf: string;
  house_number: number;
  status: statusTypeEnum;
  area: number;
  price: number;
}

export enum statusTypeEnum {
  initialized = "initialized",
  in_progress = "in progress",
  stopped = "stopped",
  finished = "finished",
}
