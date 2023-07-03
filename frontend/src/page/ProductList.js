import React, { useEffect, useRef, useState, useCallback, Fragment, useMemo } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import productService from '../product.service';
import PageTable from '../component/PageTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash,faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
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
const ProductList = () => {
    
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
        productService.getAll(pageIndex, pageSize)
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
        navigate(`/listproduct`);
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
            swal("Sản phẩm đã được xóa", {
                icon: "success",
            });
            init();
        } else {
            swal("Lỗi xóa sản phẩm");
        }
    }



    const handleDelete = useCallback((employee) => {
        
        console.log('handleDelete, employee: ', employee);
        let id = employee.id;
        console.log('handleDelete, employee id: ', id);
        swal({
            title: "Xác nhận xóa",
            text: "Bạn có muốn xóa sản phẩm này?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dele(id);
                   
                }

                else {
                    swal("Đã hủy thao tác xóa");
                }
            });
    }, [init]);

    const columns = useMemo(() => [
        {
            Header: "Image", accessor: "image",
            show: true,
            maxWidth: 70,
            minWidth: 70,
            Cell: ({ cell: { value } }) => (
                <img
                    src={require('../assest/'+  value)}
                    width={70}
                />
           )
        },
        { Header: "Name", accessor: "name", show: true },
        { Header: "Category", accessor: "category", show: true },
        { Header: "Price", accessor: "price", show: true },
        { Header: "Unit", accessor: "unit", show: true },
        { Header: "Content", accessor: "content", show: true },
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
                        <i className="text-blue-500 hover:text-blue-600" 
                        >
                            <FontAwesomeIcon icon={faPen} /></i>
                        </Link>
                    </Fragment>
                );
            },
            show: true
        },
        {
            Header: "Delete",
            Cell: (cellProps) => {
                //    console.log('cellProps: ', cellProps);
                //   console.log('cellProps row: ', cellProps.row);
                //    console.log('cellProps row original: ', cellProps.row.original);
                return (
                    <Fragment>
                        <i className="text-red-500 hover:text-red-600" onClick={() => {
                            handleDelete(cellProps.row.original);
                        }}><FontAwesomeIcon icon={faTrash} /></i>
                    </Fragment>
                );
            },
            show: true
        }

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
                <h3>Danh sách sản phẩm</h3>
                <Link to={"/newproduct"}>
                    <button className="bg-blue-500 py-1 mt-2 rounded hover:bg-blue-600 w-full">
                        Thêm sản phẩm
                    </button>
                </Link>

                <PageTable columns={columns} data={data} fetchData={fetchData} pageCount={pageCount} />

            </div>
        );
    }
};

export default ProductList;
