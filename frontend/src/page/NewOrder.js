import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { BsCloudUpload } from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import UploadImages from "../component/UploadImages";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
const NewOrder = () => {
    const userData = useSelector((state) => state.user);
    const productCartItem = useSelector((state) => state.product.cartItem);
    const totalPrice = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.total),
        0
    );
    const { register, handleSubmit } = useForm();
    const [Province, setProvince] = useState();
    const [District, setDistrict] = useState();
    const [Ward, setWard] = useState();
    const listPro = async () => {
        const list = await fetch("http://localhost:8093/api/address/listProvince")
        const proData = await list.json()
        setProvince(proData.data)
    }

    const listDis = async (id) => {
        const list = await fetch("http://localhost:8093/api/address/listDistrict/" + id)
        const disData = await list.json()
        setDistrict(disData.data)
    }
    const listWar = async (id) => {
        const list = await fetch("http://localhost:8093/api/address/listWard/" + id)
        const wardData = await list.json()
        setWard(wardData.data)
    }
    useEffect(() => {
        
        listPro();
        
       
    }, [])

    /*useEffect(() => {
        listDis("92");
        
    }, [])

    useEffect(() => {
        listWar("917");
       
    }, [])
    */
    const [data, setData] = useState({
        name: "",
        email:"",
        phone: "",
        orderDescription: "",
        province: Province ? Province[0].name : "",
        district: District ? District[0].name : "",
        ward: Ward ? Ward[0].name : "",
        address:""
    })

    console.log(data)
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }
    const handleOnChangeProvince = (e) => {
        const { name, value } = e.target
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const id = el.getAttribute('id');
        listDis(id);
        setData((preve) => {
            return {
                ...preve,
                [name]: value,
                district: "",
                ward: "",
            }
        })
    }

    const handleOnChangeDistrict = (e) => {
        const { name, value } = e.target
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const id = el.getAttribute('id');
        listWar(id);
        console.log(id)
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleOnChangeWard = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    

    const onSubmit = async (data1) => {
        const formData = new FormData();
        formData.append("userId", userData.id);
        formData.append("order", JSON.stringify(data));
        const res = await fetch("http://localhost:8093/api/order/create", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: "Bearer " + userData.token
            }
        }).then((res) => res.json());
        //alert(JSON.stringify(`${res.message}, status: ${res.status}`));
        console.log(res.status)
        //const dataRes = await res.json()
        if (res.status == "Success") {
            swal("Đặt hàng thành công", "Đơn hàng đã được xác nhận", "success");
        }
        else {
            swal("Đã xảy ra lỗi", "Lỗi khi tạo đơn hàng", "error");
        }



    };
    return (
        <div className="p-4">
           
         



 

            <section class="bg-gray-100">
                <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5  rounded-lg bg-white p-8 shadow-lg">
                        <div class="lg:col-span-2 lg:py-12">
                           

                            <div class="w-full">
                                <table>
                                    <thead>
                                        <tr>
                                            <th class="px-6 py-3">Tên sản phẩm</th>
                                            <th class="px-6 py-3">Giá</th>
                                            <th class="px-6 py-3">Số lượng</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                {productCartItem.map((el) => {
                                    return (
                                        <tr>
                                            <td class="w-4 p-4">
                                            {el.productName}
                                            </td>
                                            <td class="w-4 p-4">
                                                {el.price}
                                            </td>
                                            <td class="w-4 p-4">
                                                {el.quantity}
                                            </td>
                                            </tr>
                                        )
                                })}
                                        </tbody>
                                </table>
                                <div className="flex w-full py-2 text-lg border-b">
                                    <p>Tổng : </p>
                                    <p className="ml-auto w-32 font-bold">
                                        <span className="text-red-500">$</span> {totalPrice}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class=" lg:col-span-3 lg:p-12">
                            <form action="" onSubmit={handleSubmit(onSubmit)} class="space-y-4">
                                <div>
                                    <label class="sr-only" for="name">Tên</label>
                                    <input
                                        onChange={handleOnChange}
                                        value={data.name}
                                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Tên"
                                        type="text"
                                        id="name"
                                        name="name"
                                    />
                                </div>

                                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label class="sr-only" for="email">Email</label>
                                        <input
                                            onChange={handleOnChange}
                                            value={data.email}
                                            class="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Email"
                                            type="email"
                                            id="email"
                                            name="email"
                                        />
                                    </div>

                                    <div>
                                        <label class="sr-only" for="phone">Số điện thoại</label>
                                        <input
                                            onChange={handleOnChange}
                                            value={data.phone}
                                            class="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Số điện thoại"
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                        />
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                    <div>
                                        
                                        <label class="font-semibold text-xs" for="province">---Tỉnh/TP---</label>
                                        <select className='rounded-lg border-gray-200 bg-slate-100 w-full' id='province' name='province' onChange={handleOnChangeProvince} value={data.city}>
                                            <option></option>
                                            {Province?.map((el) => {
                                                return (
                                                    <option
                                                        key={el.id}
                                                        id={el.id}
                                                        value={el.full_name}
                                                    >{el.name}</option>
                                                );
                                            })
                                            }
                                        </select>
                                        
                                    </div>

                                    <div>
                                        <label class="font-semibold text-xs" for="district">---Quận/huyện---</label>
                                        <select className='rounded-lg border-gray-200 bg-slate-100 w-full' id='district' name='district' onChange={handleOnChangeDistrict} value={data.district}>
                                            <option></option>
                                            {District?.map((el) => {
                                                return (
                                                    <option
                                                        key={el.id}
                                                        id={el.id}
                                                        value={el.full_name}
                                                    >{el.name}</option>
                                                );
                                            })
                                            }


                                        </select>
                                    </div>

                                    <div>
                                        <label class="font-semibold text-xs" for="ward">---Phường/xã---</label>
                                        <select className='rounded-lg border-gray-200 bg-slate-100 w-full' id='ward' name='ward' onChange={handleOnChangeWard} value={data.ward}>
                                            <option></option>
                                            {Ward?.map((el) => {
                                                return (
                                                    <option
                                                        key={el.id}
                                                        id={el.id}
                                                        value={el.full_name}
                                                    >{el.name}</option>
                                                );
                                            })
                                            }


                                        </select>
                                    </div>
                                </div>


                                <div>
                                    <label class="sr-only" for="address_detail">Địa chỉ cụ thể</label>

                                    <textarea
                                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Tên đường/số nhà"
                                        rows="2"
                                        id="address"
                                        name="address"
                                        value={data.address}
                                        onChange={handleOnChange}
                                    ></textarea>
                                </div>

                                <div>
                                    <label class="sr-only" for="message">Ghi chú</label>

                                    <textarea
                                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Ghi chú"
                                        rows="4"
                                        id="message"
                                        value={data.orderDescription}
                                        name="orderDescription"
                                        onChange={handleOnChange}
                                    ></textarea>
                                </div>

                                <div class="mt-4">
                                    <button
                                        
                                        type="submit"
                                        class="inline-block w-full rounded-lg bg-yellow-500 px-5 py-3 font-medium text-white sm:w-auto"
                                    >
                                        Đặt hàng
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    )
}

export default NewOrder