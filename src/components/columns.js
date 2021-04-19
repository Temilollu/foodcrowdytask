import { formatNumber } from "./formatNumber";

export const COLUMNS = [
  {
    Header: "name",
    accessor: "name",
    type: "string",
  },
  {
    Header: "ticker",
    accessor: "ticker",

    type: "number",
  },
  {
    Header: "asset class",
    accessor: "asset_class",
    type: "string",
  },
  {
    Header: "avg price",
    accessor: "avg_price",
    Cell: ({ value }) => {
      let total = value ? formatNumber(value) : 0;

      return total;
    },
    type: "number",
  },
  {
    Header: "market price",
    accessor: "market_price",
    type: "number",
  },
  {
    Header: "latest charge %",
    accessor: "latest_chg_pct",
    type: "float",
  },
  {
    Header: "market_value in base",
    accessor: "market_value_ccy",
    Cell: ({ value }) => {
      let total = value ? formatNumber(value) : 0;

      return total;
    },
    type: "float",
  },
];
