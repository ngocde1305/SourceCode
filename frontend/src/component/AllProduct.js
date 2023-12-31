﻿import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setDataProduct } from "../redux/productSlide";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";

const AllProduct = ({ heading }) => {
    const productData = useSelector((state) => state.product.productList);
    const categoryList = [...new Set(productData.map((el) => el.category))];

    //filter data display
    const [filterby, setFilterBy] = useState("all");
    const [searchby, setSearchBy] = useState("");
    const [fsearchby, setfSearchBy] = useState("");
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        setDataFilter(productData);
    }, [productData]);

    const handleSearchProduct = (e) => {
        setSearchBy(e.target.value.toLowerCase());
        const filter = productData.filter(
            (el) => el.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        if (filterby !== "all") {
            console.log(filterby)
            const filter1 = filter.filter(
                (el) => el.category.toLowerCase() === filterby.toLowerCase()
            );
            setDataFilter(() => {
                return [...filter1];
            });
        } else {
            setDataFilter(() => {
                return [...filter];
            });
        }
    };

    const handleFilterProduct = (category, data) => {
        setFilterBy(category)
        
        const filter = (category === "all") ? data : data.filter(
            (el) => el.category.toLowerCase() === category.toLowerCase()
        )
       
        if (searchby) {
            const filter1 = filter.filter(
                (el) => el.name.toLowerCase().includes(searchby)
            );
            setDataFilter(() => {
                return [...filter1];
            });
        } else {
            setDataFilter(() => {
                return [...filter];
            });
        }


    };

    

    const loadingArrayFeature = new Array(10).fill(null);

    return (
        <div className="my-5">
            <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

            


            <div class="w-72">
                <div class="relative h-10 w-full min-w-[200px]">
                    <div class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                        
                    </div>
                    <input
                        onChange={handleSearchProduct} type={"text"}
                        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=""
                    />
                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Tìm kiếm
                    </label>
                </div>
            </div>
            <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
                <FilterProduct
                    category="all"
                    key="all"
                    isActive={filterby === "all"}
                    onClick={() => handleFilterProduct("all", productData)}
                />
                {
                    categoryList[0] ? (
                        categoryList.map((el) => {
                            return (
                                <FilterProduct
                                    category={el}
                                    key={el}
                                    isActive={el.toLowerCase() === filterby.toLowerCase()}
                                    onClick={() => handleFilterProduct(el, productData)}
                                />
                            );
                        })
                    ) : (
                        <div className="min-h-[150px] flex justify-center items-center">
                            <p>Loading...</p>
                        </div>
                    )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 my-4">
                {dataFilter[0]
                    ? dataFilter.map((el) => {
                        return (
                            <CardFeature
                                key={el.id}
                                id={el.id}
                                image={el.image}
                                name={el.name}
                                category={el.category}
                                price={el.price}
                            />
                        );
                    })
                    :
                    <span>Không có sản phẩm nào !</span>
                }
            </div>
        </div>
    );
};

export default AllProduct;
