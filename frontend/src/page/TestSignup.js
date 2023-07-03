import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import swal from 'sweetalert';
function TestSignup() {
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;


    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [EmailFocus, setEmailFocus] = useState(false);

    const [password, setpassword] = useState('');
    const [validpassword, setValidpassword] = useState(false);
    const [passwordFocus, setpasswordFocus] = useState(false);

    const [matchpassword, setMatchpassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


   // useEffect(() => {
    //    userRef.current.focus();
   // }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidpassword(password_REGEX.test(password));
        setValidMatch(password === matchpassword);
    }, [password, matchpassword])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchpassword])

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((preve) => !preve);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((preve) => !preve);
    };
    const [image, setImage] = useState("");
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("imageFile", data.file[0]);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        console.log("username" + data.username);
        console.log("username" + data.email);
        console.log("username" + data.password);
        const res = await fetch("http://localhost:8093/api/auth/signup", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        swal(res.message);     
            navigate("/");
    };

    const handleUploadProfileImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])
        console.log(data)
        console.log(e.target.files[0])

        setImage((preve) => {
            return {
                ...preve,
                image: data
            }
        });
    }


    return (
        <div >
            <div className="p-3 md:p-4">
                <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
                    <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
                            <img src={image.image ? image.image : loginSignupImage} className="w-full h-full" />
                            <label htmlFor="file">
                                <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                                    <p className="text-sm p-1 text-white">Chọn ảnh</p>
                                </div>

                            </label>
                            
                            <input type={"file"} id="file" {...register("file")} onChange={handleUploadProfileImage} />

                        </div>

                        <label htmlFor="firstName">
                            Tên người dùng:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
                        </label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                        <input type="text"
                            {...register("username")}
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                            //ref={userRef}
                            onChange={(e) => setUsername(e.target.value)}
                            //value={username}
                            //required
                            //aria-invalid={validName ? "false" : "true"}
                            //aria-describedby="uidnote"
                            //onFocus={() => setUserFocus(true)}
                            //onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        </div>
                        <label htmlFor="email">
                            Email
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                        <input type="email"
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                            {...register("email")}
                           // ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            //value={email}
                            required
                            //aria-invalid={validEmail ? "false" : "true"}
                            //aria-describedby="uidnote"
                           // onFocus={() => setEmailFocus(true)}
                            //onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={EmailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Phải là một email !
                            </p>
                            </div>
                        <label htmlFor="password">
                            Mật khẩu:
                            <FontAwesomeIcon icon={faCheck} className={validpassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validpassword || !password ? "hide" : "invalid"} />
                        </label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                            <input type={showPassword ? "text" : "password"}
                                autocomplete="on"
                                className=" w-full bg-slate-200 border-none outline-none "
                                {...register("password")}
                                onChange={(e) => setpassword(e.target.value)}
                                //value={password}
                                required
                                //aria-invalid={validpassword ? "false" : "true"}
                                //aria-describedby="passwordnote"
                                //onFocus={() => setpasswordFocus(true)}
                                //onBlur={() => setpasswordFocus(false)}
                                
                            />
                           
                            <span
                                className="flex text-xl cursor-pointer"
                                onClick={handleShowPassword}
                            >
                                {showPassword ? <BiShow /> : <BiHide />}
                            </span>
                        </div>
                        <p id="passwordnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirmPassword">
                            Xác nhận mật khẩu:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchpassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchpassword ? "hide" : "invalid"} />
                        </label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                autocomplete="on"
                                id="confirmPassword"
                                name="confirmPassword"
                                className=" w-full bg-slate-200 border-none outline-none "
                                //value={data.confirmPassword}
                                //onChange={handleOnChange}
                                {...register("confirmPassword")}
                                onChange={(e) => setMatchpassword(e.target.value)}
                                //value={matchpassword}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                            <span
                                className="flex text-xl cursor-pointer"
                                onClick={handleShowConfirmPassword}
                            >
                                {showConfirmPassword ? <BiShow /> : <BiHide />}
                            </span>
                        </div>

                        <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4"
                            /*disabled={!validName || !validpassword || !validMatch ? true : false}*/>
                            Đăng ký
                        </button>
                    </form>
                    <p className="text-left text-sm mt-2">
                        Đã có tài khoản ?{" "}
                        <Link to={"/login"} className="text-red-500 underline">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    );
}

export default TestSignup;