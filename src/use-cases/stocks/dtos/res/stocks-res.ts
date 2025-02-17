export class StockResDto {
  id: string;
  name: string;
  stock_type: "materials" | "equipments" | "machines";
  quantity: number;
}

export class StockListResDto {
  stocks: {
    materials: Stock[];
    equipments: Stock[];
    machines: Stock[];
  };
}
