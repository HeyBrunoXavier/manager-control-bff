export interface CreateStockRequestDto {
  name: string;
  stock_type: stockTypeEnum;
  quantity: number;
}
export interface UpdateStockRequestDto {
  id: string;
  name: string;
  stock_type: stockTypeEnum;
  quantity: number;
}

export enum stockTypeEnum {
  materials = "materials",
  equipments = "equipments",
  machines = "machines",
}
