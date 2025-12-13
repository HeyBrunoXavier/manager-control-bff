export interface StockResDto {
  id: string;
  name: string;
  stock_type: "materials" | "equipments" | "machines";
  quantity: number;
}

export interface StockListResDto {
  stocks: {
    materials: StockResDto[];
    equipments: StockResDto[];
    machines: StockResDto[];
  };
}
