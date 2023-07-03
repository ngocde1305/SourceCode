import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit } = useForm();
    const [imageFile, setImageFile] = useState();
    const [image, setImage] = useState("");
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    console.log(data);
    const handleShowPassword = () => {
        setShowPassword((preve) => !preve);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((preve) => !preve);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    const handleUploadProfileImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])
        console.log(data)
        console.log(e.target.files[0])

        const img = e.target.files[0]
        setImage((preve) => {
            return {
                ...preve,
                image: data
            }
        });
        setImageFile((preve) => {
            return {
                ...preve,
                imageFile: img
            }
        })

    }
    console.log(process.env.REACT_APP_SERVER_DOMIN)
    const onSubmit = async (data1) => {
       
        const { username, email, password, confirmPassword } = data1;
        console.log(password);
        console.log(confirmPassword);
            if (password === confirmPassword) {
                const formData = new FormData();
                formData.append("imageFile", data1.imageFile[0]);
                formData.append("username", data1.username);
                console.log(data1.username);
                formData.append("email", data1.email);
                formData.append("password", data1.password);
                console.log(formData);
                const res = await fetch("http://localhost:8093/api/auth/signup", {
                    method: "POST",
                    body: formData,
                }).then((res) => res.json());
                alert(JSON.stringify(`${res.message}, status: ${res.status}`));

                const dataRes = await res.json()
                console.log(dataRes)

                // alert(dataRes.message);
                toast(dataRes.message)
                if (dataRes.alert) {
                    navigate("/login");
                }

            } else {
                alert("password and confirm password not equal");
            }
       
    };

    return (
        <div className="p-3 md:p-4">
            <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
                {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
                <form className="w-full py-3 flex flex-col" enctype="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
                    <img src={image.image?image.image : loginSignupImage} className="w-full h-full" />
                    <label htmlFor="profileImage">
                        <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                            <p className="text-sm p-1 text-white">Upload</p>
                        </div>
                            <input type={"file"} {...register("imageFile")} id="imageFile" accept="image/*" className="hidden" onChange={handleUploadProfileImage} multiple />
                    </label>
                   
                </div>

                
                    
                    <label htmlFor="firstName">User Name</label>
                    <input
                        type={"text"}
                        id="username"
                        name="username"
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                        //value={data.username}
                        //onChange={handleOnChange}
                        {...register("username")}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type={"email"}
                        id="email"
                        name="email"
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                        //value={data.email}
                        //onChange={handleOnChange}
                        {...register("email")}
                    />

                    <label htmlFor="password">Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className=" w-full bg-slate-200 border-none outline-none "
                            //value={data.password}
                            //onChange={handleOnChange}
                            {...register("password")}
                        />
                        <span
                            className="flex text-xl cursor-pointer"
                            onClick={handleShowPassword}
                        >
                            {showPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            {...register("password")}
                            id="confirmPassword"
                            name="confirmPassword"
                            className=" w-full bg-slate-200 border-none outline-none "
                            //value={data.confirmPassword}
                            onChange={handleOnChange}
                            {...register("confirmPassword")}
                        />
                        <span
                            className="flex text-xl cursor-pointer"
                            onClick={handleShowConfirmPassword}
                        >
                            {showConfirmPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>

                    <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                        Sign up
                    </button>
                </form>
                <p className="text-left text-sm mt-2">
                    Already have account ?{" "}
                    <Link to={"/login"} className="text-red-500 underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
