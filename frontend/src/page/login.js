import React, { useState,useEffect } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import { setCartItem,setCartId } from "../redux/productSlide";
import swal from 'sweetalert';
import { useCookies } from "react-cookie";
import { AppContext } from "../AppContext";
//toast.configure();
const Login = () => {

    const notify = () => toast("");
    const { isLoading, setIsLoading, setCurrentUser, setIsAuth, setPrivilege, privilege } =
        React.useContext(AppContext);


    const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()  
  const userData = useSelector(state => state)


  const dispatch = useDispatch()




  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleOnChange = (e)=>{
    const {name,value} = e.target
    setData((preve)=>{
        return{
            ...preve,
            [name] : value
        }
    })
  }
    useEffect(() => {
        if (!!cookies.user /*|| localStorage.getItem("user")*/) {
            navigate("/");
        }
    }, []);
    const [cookies, setCookie] = useCookies(["user"]);
  const handleSubmit = async(e)=>{
    e.preventDefault()
      const { username, password } = data
      console.log(password)
    if(username && password ){
        const fetchData = await fetch(`http://localhost:8093/api/auth/signin`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const res = await fetchData.json()
        if (res.token != null) {
            console.log("Cos token");
            setIsAuth(true);
            setCurrentUser({
                displayName: res.username,
                accessToken: res.token,
                uid: res.id,
            });
            setPrivilege(res.roles);
            localStorage.setItem("user", res.username);
            setCookie("privilege", res.roles, 3);
            setCookie("token", res.token);
            setCookie("user", res.username);
            setCookie("image", res.image);
            setCookie("email", res.email);
            setCookie("id", res.id);
            setCookie("shoppingCart", res.shoppingCart);
            // Kiểm tra xem có quyền admin không arr.some(el => el.id === id)
            if (res.roles != null)
                if (res.roles.some(el => el === "ROLE_MODERATOR")) {
                    swal("Đăng nhập thành công", "Xin chào Admin", "success");
                    setTimeout(() => {
                    navigate("/")
                     }, 1000);
                }
                else {

                    
                    swal("Đăng nhập thành công", "Xin chào" + res.username, "success");
                    navigate("/");
                }
            else
                navigate("/");
           window.location.reload();


           // if (remember) setCookie("user", username, 3);
        } else {
            swal("Đăng nhập không thành công", "Tên hoặc mật khẩu không chính xác", "error");
        }
        setIsLoading(false);
        console.log(privilege);



        if (res.id) {
            const data = {
                id: cookies.id,
                username: cookies.user,
                email: cookies.email,
                image: cookies.image,
                token: cookies.token,
                roles: cookies.privilege
            }
          dispatch(loginRedux(data))
          dispatch(setCartItem(res.shoppingCart))
          dispatch(setCartId(res.shoppingCart))
        //setTimeout(() => {
         // navigate("/")
       // }, 1000);
      }

     //console.log(userData)
    }
    else{
        alert("Vui lòng điền đầy đủ")
    }
  }


  return (
    <div className="p-3 md:p-4">
    <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
      {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
      <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
        <img src={loginSignupImage} className="w-full" />
      </div>

      <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="username">Tên:</label>
        <input
          type={"username"}
          id="username"
          name="username"
          className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          value={data.username}
          onChange={handleOnChange}

        />

        <label htmlFor="password">Mật khẩu:</label>
        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className=" w-full bg-slate-200 border-none outline-none "
            value={data.password}
            onChange={handleOnChange}
          />
          <span
            className="flex text-xl cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>

        <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
          Đăng nhập
        </button>
      </form>
      <p className="text-left text-sm mt-2">
        Chưa có tài khoản ?{" "}
        <Link to={"/test"} className="text-red-500 underline">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  </div>
  )
}

export default Login