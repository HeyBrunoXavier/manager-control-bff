import type { StockResDto } from "../use-cases/stocks/dtos/res/stocks-res";

export function getStocksGroupedByType(data: StockResDto[]) {
  return data.reduce(
    (acc, stock) => {
      const { stock_type } = stock;
      if (!acc[stock_type]) {
        acc[stock_type] = [];
      }

      acc[stock_type].push(stock);

      return acc;
    },
    {
      materials: [] as StockResDto[],
      equipments: [] as StockResDto[],
      machines: [] as StockResDto[],
    }
  );
}
