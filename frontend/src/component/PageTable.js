// Table.js

import React, { useEffect } from "react";
import { useTable, usePagination } from "react-table";
//import 'bootstrap/dist/css/bootstrap.css';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
//import '../Admin/App.css';
//import '../Admin/mycustom.css';
import Button from 'react-bootstrap/Button';
/**
 * Displays a table of data, and allows pagination
 * 
 * ref: https://cloudnweb.dev/2021/06/react-table-pagination/
 * 
 * @param  {Array} columns Defines properties of each table column
 * @param  {Array} data Row data for one page
 * @param  {Function} fetchData Function to retrieve a page of data
 * @param  {Number} pageCount total number of pages 
 * @return {html} Table with pagination buttons
 */
function PageTable({ columns, data, fetchData,
    pageCount: controlledPageCount }) {

    console.log('begin PageTable');
    //
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        // pagination props
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            // pageIndex: zero based page number
            // pageSize: number of table rows per page
            initialState: { pageIndex: 0, pageSize: 5 },
            manualPagination: true,
            pageCount: controlledPageCount
        },
        usePagination
    );

    useEffect(() => {
        console.log('PageTable, before fetchData, pageIndex: ' + pageIndex + ', pageSize: ' + pageSize);
        fetchData({ pageIndex, pageSize });
    }, [pageIndex, pageSize, fetchData]);


    console.log('PageTable, at return table');
    /* 
     Render the UI for table
     - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
     */
    return (

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table {...getTableProps()} class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                
                                <th {...column.getHeaderProps()} scope="col" class="px-6 py-3">
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                        ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        i = 1;
                        return (
                            <tr {...row.getRowProps()} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {row.cells.map(cell => {
                                    
                                    return (
                                        <td {...cell.getCellProps()} class="w-4 p-4"> {cell.render('Cell')}</td>);
                                }
                                )}
                            </tr>
                        );
                    }
                        )
                    }
                </tbody>
            </table>
            <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Hiện <span class="font-semibold text-gray-900 dark:text-white">Trang{' '}{pageIndex + 1} </span> trên <span class="font-semibold text-gray-900 dark:text-white">{pageOptions.length}</span></span>
                <div>
                    <label for="myindex">&nbsp;&nbsp; Đến trang :&nbsp;&nbsp;</label>
                    <input
                        id="myindex"
                        maxlength="2" size="2"
                        type="text" inputmode="numeric"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}

                    />
                </div>
                <div>
                    <label for="mydrop">&nbsp;&nbsp; Số hàng :&nbsp;&nbsp;</label>
                    <select
                        id="mydrop"
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}

                    </select>

                </div>
                <ul class="inline-flex items-center -space-x-px">
                    <li disabled={!canPreviousPage}>
                        <a href="#" onClick={() => gotoPage(0)} class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Đầu</a>
                    </li>
                    <li disabled={!canPreviousPage}>
                        <a href="#" onClick={() => previousPage()} class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <span> { "<<"} </span>
                        </a>
                    </li>
                   
                    <li disabled={!canNextPage}>
                        <a href="#" onClick={() => nextPage()} class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <span> {">>"} </span>
                        </a>
                    </li>
                    <li disabled={!canNextPage}>
                        <a href="#" onClick={() => gotoPage(pageCount - 1)} class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Cuối</a>
                    </li>
                </ul>
            </nav>
        </div>

    );
}

export default PageTable;