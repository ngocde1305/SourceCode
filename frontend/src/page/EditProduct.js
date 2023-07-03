import React, { useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import UploadImages from "../component/UploadImages";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRepeat } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
const EditProduct = (props) => {
   /* const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit } = useForm(formOptions);*/
    const userData = useSelector((state) => state.user);
    const { register, handleSubmit } = useForm()
    const location = useLocation();
    console.log(location) // "bar"
    const navigate = useNavigate()
    const [resCate, setCate] = useState();
    const [resUnit, setUnit] = useState();
    useEffect(() => {
        if (!userData.token /*|| localStorage.getItem("user")*/) {
            navigate("/");
        }
    }, []);
    useEffect(() => {
        (async () => {
    const cate = await fetch("http://localhost:8093/api/category/list")
    setCate(await cate.json())
    console.log(resCate)
        })()
    }, [])
    useEffect(() => {
        (async () => {
            const unit = await fetch("http://localhost:8093/api/unit/list")
            setUnit(await unit.json())
        })()
    }, [])
  const [data,setData] = useState(
      location.state)
  const handleOnChange = (e)=>{
    const {name,value} = e.target
      console.log(data)
    setData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })

  }

  const uploadImage = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])
      // console.log(data)
      const img = e.target.files[0]
      setData((preve)=>{
        return{
          ...preve,
            image: data,
            imageFile:img
        }
      })
  }

    const onSubmit = async (data1) => {
            const formData = new FormData();
        formData.append("imageFile", data.imageFile);
        formData.append("oldName", data.oldName);
        data1.category = data.category;
        data1.unit = data.unit;
        formData.append("product", JSON.stringify(data1));
        
        console.log(data.oldName, data.name);
        console.log(data1);
            const res = await fetch("http://localhost:8093/api/product/edit/"+data.id, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: "Bearer " + userData.token
                }

            }).then((res) => res.json());
        console.log(res);
           // alert(JSON.stringify(`${res.message}, status: ${res.status}`));
        if (res.status === "Success") {
            swal("Cập nhật thành công", "Sản phẩm đã được cập nhật", "success");
            navigate("/listproduct");
        }
        else {
            swal("Đã xảy ra lỗi", data.name +" đã tồn tại !", "error");
        }
           
  

    };

    

   const handleFormReset = () => {
        setData(location.state);
    }

    
  return (
    <div className="p-4">
          <form className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit(onSubmit)} onReset={handleFormReset}>
        <label htmlFor='name'>Tên sản phẩm :</label>
              <input type={"text"}   {...register("name")} name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name}/>

        <label htmlFor='category'>Loại :</label>
              <select className='bg-slate-200 p-1 my-1'  {...register("category")} id='category' name='category' onChange={handleOnChange} value={data.category}>
                  {resCate?.map((el) => {
                      return (
                          <option
                              key={el.id}
                              id={el.id}
                              value={el.name}
                            
                          >{el.name}</option>
                      );
                  })
                  }

                  
              </select>

              <label htmlFor='unit'>Đơn vị tính :</label>
              <select className='bg-slate-200 p-1 my-1'  {...register("unit")} id='unit' name='unit' onChange={handleOnChange} value={data.unit}>
                  {resUnit?.map((el) => {
                      return (
                          <option
                              key={el.id}
                              id={el.id}
                              value={el.name}
                          >{el.name}</option>
                      );
                  })
                  }


              </select>

        <label htmlFor='image'>Hình ảnh :
        <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
            {
                          data.image ? <img src={data.image} className="h-full" /> : <img src={require('../assest/' + data.imageName)} className="h-full" />
                              /*:<span className='text-5xl'><BsCloudUpload/></span> */
            }
                  </div>
                  <input type={"file"} accept="image/*" id="imageFile"  onChange={uploadImage}  />
        </label>
              

        <label htmlFor='price' className='my-1'>Giá :</label>
              <input type={"text"}  {...register("price")} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description'>Thông tin :</label>
              <textarea rows={2} value={data.description} {...register("content")} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>
        
              <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Lưu</button>
              <button
                  type="reset"
                  
              ><FontAwesomeIcon icon={faRepeat} /></button>
       </form>
    </div>
  )
}

export default EditProduct