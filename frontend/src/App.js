import logo from "./logo.svg";
import "./App.css";
import 'font-awesome/css/font-awesome.min.css';
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect ,useState} from "react";
import { setDataProduct,setCartItem, setCartId } from "./redux/productSlide";
import { loginRedux } from "./redux/userSlice";
import { auth } from "./firebase.services";
import "./firebase.config";
import { onAuthStateChanged } from "@firebase/auth";
import { AppContext } from "./AppContext";
import { useDispatch, useSelector } from "react-redux";
//import firebase from "firebase";
import axios from "axios";
import { useCookies } from "react-cookie";
function App() {
    const [cookies, setCookie] = useCookies(["user"]);
    const dispatch = useDispatch()
   // const productData = useSelector((state) => state.product)

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:8093/api/product/list/0/20`)
            const resData = await res.json()
            console.log(resData)
            dispatch(setDataProduct(resData.content))
            if (cookies.user) {
                const data = {
                    id: cookies.id,
                    username: cookies.user,
                    email: cookies.email,
                    image: cookies.image,
                    token: cookies.token,
                    roles: cookies.privilege
                }
                dispatch(loginRedux(data))
                dispatch(setCartItem(cookies.shoppingCart))
                dispatch(setCartId(cookies.shoppingCart))
            }
        })()
    }, []);
    
    const [isAuth, setIsAuth] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState();
    const [privilege, setPrivilege] = useState([]);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken().then((t) => {
                    setToken(t);
                    setIsAuth(true);
                    setCurrentUser(user);
                });
            } else {
                setIsAuth(false);
                setCurrentUser(null);
                setPrivilege([]);
            }
        });
    }, []);
    //console.log(currentUser);
    useEffect(() => {
        if (!token) return;
        const authInterceptor = axios.interceptors.request.use(
            (config) => {
                config.headers = {
                    authorization: `Bearer ${token}`,
                };
                return config;
            },
            (error) => Promise.reject(error)
        );
        return () => {
            axios.interceptors.request.eject(authInterceptor);
        };
    }, [token]);
    
    return (
        <>
            <Toaster />
            <div>
                
                <Header />
                <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
                    <Outlet />
                    </main>
              
            </div>
        </>
    );
}

export default App;





