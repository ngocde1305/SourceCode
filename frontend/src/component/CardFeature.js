import React from "react";
import { useDispatch, useSelector  } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem,increaseQty } from "../redux/productSlide";
import swal from 'sweetalert';
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
const CardFeature = ({ image, name, price, category, loading, id}) => {
    const dispatch = useDispatch()
    const [cookies, setCookie] = useCookies();
    const cartId = useSelector((state) => state.product.cartId)
    const cartItem = useSelector((state) => state.product.cartItem)
    const userData = useSelector((state) => state.user);
    const check = cartItem.some((el) => el.productId === id);
    const handleAddCartProduct = async () => {
        
        if (check) {
            toast("Already Item in Cart");
        } else {
            if (userData.token) {
                const res = await fetch("http://localhost:8093/api/cartItem/create/" + id + "/" + cartId, {
                    method: "POST",
                    body: "",
                    headers: {
                        Authorization: "Bearer " + userData.token
                    }
                }).then((res) => res.json());
                setCookie("shoppingCart", res.data);
                console.log(res);
                
                const list = res.data;
                console.log(list.cartItems);
                const Item = list.cartItems.filter((e) => e.productId===id)
                console.log(Item);
                dispatch(addCartItem({
                    id: Item[0].id,
                    productId: id,
                    productName: name,
                    price: price,
                    category: category,
                    image: image
                }))
                toast("Đã thêm vào giỏ hàng");
            }
        }

    };
    const dele = async () => {
        const res = await fetch("http://localhost:8093/api/product/delete/" + id, {
            method: "POST",
            body: "",
        }).then((res) => res.json());
        if (res.status == "Success") {
            swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
            });
        } else {
            swal("Your imaginary file is safe!");
        }
    }
    
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
                          <img src={require('../assest/'+image)} className="h-full" />
            </div>
            <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className=" text-slate-500  font-medium">{category}</p>
            <p className=" font-bold">
              <span className="text-red-500">$</span>
              <span>{price}</span>
            </p>
                  </Link>
                  {check ? (<Link to="cart">
                      <button
                          className="bg-green-500 py-1 mt-2 rounded hover:bg-green-600 w-full"

                      >
                          Xem giỏ hàng
                      </button>
                      </Link >
                  ):(
                      <button
                          className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full"
                          onClick={handleAddCartProduct}
                      >
                          Thêm vào giỏ
                      </button>
                  )
                  }
                  

        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
