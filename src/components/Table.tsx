import React, { useMemo } from "react";
import {
  usePagination,
  useTable,
  useSortBy,
  useColumnOrder,
  Column,
} from "react-table";

import "./table.css";
type TableProps = {
  jsonData: Array<object>;
  COLUMNS : Column<object>[]
};

const Table = (props: TableProps) => {
  const { jsonData, COLUMNS } = props;
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => jsonData, [jsonData]);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setColumnOrder,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
    },
    useColumnOrder,
    useSortBy,
    usePagination
  );


  const changeOrder = () => {
    setColumnOrder([
      "market_price",
      "latest_chg_pct",
      "market_value_ccy",
      "name",
      "ticker",
      "asset_class",
      "avg_price",
    ]);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span className="span-img">
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="cta">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>| Go to page : {""}</span>
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          style={{ width: "50px" }}
        />
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button
          className="previous"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          className="next"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
        <button onClick={changeOrder}>Change colum order</button>
      </div>
    </div>
  );
};

export default Table;
