import React, { useMemo } from "react";
import {
  usePagination,
  useTable,
  useSortBy,
  useColumnOrder,
} from "react-table";
import { COLUMNS } from "./columns";
import "./table.css";
type TableProps = {
  datas: Array<object>;
  // column : Array<object>
};

const PaginationTable = (props: TableProps) => {
  const { datas } = props;
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => datas, [datas]);

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

  // const { pageIndex } = state

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
    <div style={{overflowX : "auto"}}>
     
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
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
      <div className="">
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

export default PaginationTable;
