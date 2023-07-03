import React, { useEffect, useRef, useState, useCallback, Fragment, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import OrderService from '../order.service';
import PageTable from '../component/PageTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faCheck, faCancel, faLock, faStarHalfStroke, faStar } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';
//import '../Admin/App.css';
//import '../Admin/mycustom.css';
require('react-dom');
//window.React2 = require('react');

/**
 * Creates HTML table of employees with pagination buttons.
 * Populates table with rows of data from server database, based
 * on page index and page size.
 * 
 * ref: https://cloudnweb.dev/2021/06/react-table-pagination/
 * 
 * @return {html} Table of employees with pagination buttons
 */
const OrderList = () => {

    console.log('begin EmployeeList');
    //  let prevIndex = -1;
    //  let prevSize = -1;

    const prevIndexRef = useRef(-1);
    const prevSizeRef = useRef(-1);

    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // const fetchIdRef = useRef(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    //   console.log('EmployeeList, after useState');

    /**
     * Retrieves specified page from server and saves in local 'data' state.
     * 
     * @param  {Number} pageIndex page number
     * @param  {Number} pageSize number of rows per page
     */
    const userData = useSelector((state) => state.user);
    useEffect(() => {
        if (!userData.token /*|| localStorage.getItem("user")*/) {
            navigate("/");
        }
    }, []);
    const fetchPage = (pageIndex, pageSize) => {
        console.log('fetchPage, calling getAll, pageIndex: ' + pageIndex + ', size: ' + pageSize);
        OrderService.getAll(pageIndex, pageSize)
            .then(response => {
                //  console.log('employees data: ', response.data);
                // save server side response in local data passed to table
                setData(response.data.content);
                // fix page count, based on page size
                setPageCount(response.data.totalPages);

            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    /**
     * Retrieves one page from server and saves in local 'data' state.
     * Resets previou index and page size.
     * 
     * fetchData is passed to Table component as callback when page index
     * or page size changes
     * 
     * @param  {Number} pageIndex page number
     * @param  {Number} pageSize number of rows per page
     */
    const fetchData = useCallback(
        ({ pageIndex, pageSize }) => {
            // This will get called when the table needs new data
            //    console.log('fetchData, pageSize: ' + pageSize + ', pageIndex: ' + pageIndex);
            //    console.log('fetchData, prevIndex: ' + prevIndexRef.current + ', prevSize: ' + prevSizeRef.current);
            if (pageIndex !== prevIndexRef.current || pageSize !== prevSizeRef.current) {
                setLoading(true);
                fetchPage(pageIndex, pageSize);
                setLoading(false);
                prevIndexRef.current = pageIndex;
                prevSizeRef.current = pageSize;
            }
        }, []);

    const init = useCallback(() => {
        //   console.log('init for page 1');
        // zero based page number
        let page = 0;
        // number of rows per page
        let size = 5;
        fetchPage(page, size);
    }, []);


    console.log(userData.token);
    useEffect(() => {
        //   console.log('call init');
        init();
    }, [init]);

    /**
     * Updates a row in the server database.
     * 
     * @param  {Object} employee 
     */
    const handleEdit = useCallback((employee) => {
        console.log('handleEdit, employee: ', employee);
        //
        let empJ = JSON.stringify(employee);
        sessionStorage.setItem("employee_to_update", empJ);
        // note: back tick string allows placeholder substitution
        // using ${} notation for placeholder
        // here, employee will be replaced with employee object to create
        // link path
        //   navigate(`/employees/${employee}`);
        //   navigate(`/employees/${empvals}`);
        navigate(`/update`);
        //   navigate(`/employees/:employee`, {employee});
    }, [navigate]);
    /**
     * Deletes a row from the server database.
     * Reinitializes page index and size. 
     * 
     * @param  {Object} employee 
     */

    const dele = async (id) => {

        const res = await fetch("http://localhost:8093/api/product/delete/" + id, {
            method: "POST",
            body: "",
            headers: {
                Authorization: "Bearer " + userData.token
            }
        }).then((res) => res.json());
        if (res.status == "Success") {
            swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
            });
            init();
        } else {
            swal("Your imaginary file is safe!");
        }
    }



    const handleDelete = useCallback((employee) => {

        console.log('handleDelete, employee: ', employee);
        let id = employee.id;
        console.log('handleDelete, employee id: ', id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dele(id);

                }

                else {
                    swal("Your imaginary file is safe!");
                }
            });
    }, [init]);

    const columns = useMemo(() => [
       
        { Header: "Id", accessor: "id", show: true },
        { Header: "Tên", accessor: "name", show: true },
        { Header: "Email", accessor: "email", show: true },
        { Header: "Số điện thoại", accessor: "phone", show: true },
        { Header: "Tỉnh/TP", accessor: "city", show: true },
        { Header: "Quận/huyện", accessor: "district", show: true },
        { Header: "Phường/xã", accessor: "ward", show: true },
        { Header: "Ngày tạo", accessor: "date", show: true },
        /*{
            Header: "Status", accessor: "sta", show: true,
            Cell: ({ cell: { value } }) => (
                value === 0 ?
                    (<i className="text-red-500 hover:text-red-600" >
                        <FontAwesomeIcon icon={faCancel} />
                    </i>) : (
                        value === 1 ?
                            (<i className="text-green-500 hover:text-green-600" >
                                <FontAwesomeIcon icon={faCheck} />
                            </i>) : (
                                <i className="text-slate-500 hover:text-slate-600" >
                                    <FontAwesomeIcon icon={faLock} />
                                </i>
                            )
                    )
            )
        },

        {
            Header: "Update",
            Cell: (cellProps) => {
                //   console.log('cellProps: ', cellProps);
                //   console.log('cellProps row: ', cellProps.row);
                //   console.log('cellProps row original: ', cellProps.row.original);
                return (
                    <Fragment>
                        <Link to="/editproduct"
                            state={{
                                id: cellProps.row.original.id,
                                imageName: cellProps.row.original.image,
                                name: cellProps.row.original.name,
                                price: cellProps.row.original.price,
                                category: cellProps.row.original.category,
                                unit: cellProps.row.original.unit,
                                oldName: cellProps.row.original.name
                            }}
                        >
                            <i className="text-blue-500 hover:text-blue-600" onClick={() => {
                                handleEdit(cellProps.row.original);
                            }}>
                                <FontAwesomeIcon icon={faPen} /></i>
                        </Link>
                    </Fragment>
                );
            },
            show: true
        }*/


    ], [handleDelete, handleEdit]);

    if (!Array.isArray(columns)) {
        console.log('columns is not an array');
    }
    if (!Array.isArray(data)) {
        console.log('data is not an array');
    }

    //   console.log('data: ', data);
    let len = data.length;
    console.log('data len: ', len);
    if (len === 0) {
        console.log('len 0 call init ');
        init();
    }

    console.log('pageCount: ', pageCount);
    //
    if (len > 0) {
        console.log('len > 0, call PageTable');
        return (
            <div>
                <h3>Danh sách đơn hàng</h3>


                <PageTable columns={columns} data={data} fetchData={fetchData} pageCount={pageCount} />

            </div>
        );
    }
};

export default OrderList;
