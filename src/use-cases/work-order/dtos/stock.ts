export interface StockItemDto {
  id: string;
  name: string;
  stock_type: "materials" | "equipments" | "machines";
  quantity: number;
}
