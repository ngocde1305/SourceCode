import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem,increaseQty,decreaseQty } from "../redux/productSlide";
import { useCookies } from "react-cookie";
 
const CartProduct = ({ id, product_id, name, image, category, qty, total, price }) => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user);
    const cartId = useSelector((state) => state.product.cartId)
    const [cookies, setCookie] = useCookies();
    const productCartItem = useSelector((state) => state.product.cartItem);
    const handleDeleteCartProduct = async () => {
        const res = await fetch("http://localhost:8093/api/cartItem/delete/" + id + "/" + cartId, {
            method: "POST",
            body: "",
            headers: {
                Authorization: "Bearer " + userData.token
            }
        }).then((res) => res.json());
        setCookie("shoppingCart", res.data);
        dispatch(deleteCartItem(id))

    };
    const handleIncreaseCartProduct = async () => {
        const res = await fetch("http://localhost:8093/api/cartItem/increase/" + id + "/" + cartId, {
            method: "POST",
            body: "",
            headers: {
                Authorization: "Bearer " + userData.token
            }
        }).then((res) => res.json());
        setCookie("shoppingCart", res.data);
        dispatch(increaseQty(id))

    };
    const handleDecreaseCartProduct = async () => {
        const res = await fetch("http://localhost:8093/api/cartItem/decrease/" + id + "/" + cartId, {
            method: "POST",
            body: "",
            headers: {
                Authorization: "Bearer " + userData.token
            }
        }).then((res) => res.json());
        setCookie("shoppingCart", res.data);
        dispatch(decreaseQty(id))

    };
  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className="p-3 bg-white rounded overflow-hidden">
              <img src={require('../assest/' + image)} className="h-28 w-40 object-cover " />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
            {name}
          </h3>
                  <div className="cursor-pointer text-slate-700 hover:text-red-500" onClick={handleDeleteCartProduct}>
            <AiFillDelete />
          </div>
        </div>
        <p className=" text-slate-500  font-medium ">{category}</p>
        <p className=" font-bold text-base">
          <span className="text-red-500 ">$</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between ">
          <div className="flex gap-3 items-center">
                      <button onClick={handleIncreaseCartProduct} className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 ">
              <TbPlus />
            </button>
            <p className="font-semibold p-1">{qty}</p>
            <button
              onClick={handleDecreaseCartProduct}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Tổng :</p>
            <p><span className="text-red-500">$</span>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
