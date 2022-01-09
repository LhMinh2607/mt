import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { addDrink } from '../actions/drinkAction';
// import FilleUpload from '../components/FilleUpload';
import {Link} from 'react-router-dom';
import Editor from 'rich-markdown-editor';

export default function DrinkAddingPage() {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const submitHandler = (e) =>{
        //
        e.preventDefault();
        dispatch(addDrink(name, category, image, price, description));
    }

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const drinkAdding = useSelector(state=>state.drinkAdding);
    const {loading, error, success} = drinkAdding;

    
    const categoriesArray = ["Trà sữa", "Loại khác"]; //hmmmm food for thought

    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
    })
    
    return (
        <div>
            <div className="row center cyan-background"> 
                <div>
                    <Link to={`/admin/profile`} className="admin linkButton">Về trang cá nhân</Link>
                </div>
                
            </div>
            <form className="form" onSubmit={submitHandler}>
                {
                    
                    <div>
                        <div>
                            {
                                loading? (<LoadingBox></LoadingBox>)
                                : error ? (<MessageBox variant="error">{error}</MessageBox>)
                                : success &&  (<MessageBox variant="info">Đã thêm</MessageBox>)
                            }
                        </div>
                        
                        <label htmlFor="name">
                            Tên: 
                        </label>
                        <input className='basic-slide' id="name" type="text" placeholder="Tên" onChange={(e)=> setName(e.target.value)}  required={true}>
                        </input>
                        <label htmlFor="category">
                            Loại: 
                        </label>
                        <div>
                        <div className='box'><select id="type" onChange={(e)=>setCategory(e.target.value)} required={true} >
                                <option selected={true} hidden>Chọn</option> 
                                    {
                                        categoriesArray.map(item=>(
                                            <option type="text">{item}</option>
                                        ))
                                    }
                            </select></div>
                            {/* <input id="category" type="text" placeholder="Type" onChange={(e)=> setCategory(e.target.value)} disabled={disabled} required={true}>
                            </input> */}
                        </div>
                        <label htmlFor="image">
                            Hình ảnh: 
                        </label>
                        <input className='basic-slide' id="image" type="text" placeholder="Hình ảnh" onChange={(e)=> setImage(e.target.value)} >
                        </input>
                        {/* <div>
                            <FilleUpload>

                            </FilleUpload>
                        </div> */}

                        
                        <label htmlFor="price">
                            Giá: 
                        </label>
                        <input className='basic-slide' id="price" type="text" placeholder="Giá" onChange={(e)=> setPrice(e.target.value)} required={true}>
                        </input>
                        <label htmlFor="desc">
                            Mô tả: 
                        </label>
                        <Editor
                            defaultValue=""
                            onChange={(value) => setDescription(value)}
                            className='Editor'
                            placeholder='Mô tả'
                            required={true}
                        /> 
                        
                        <div className="bottom-button-div-group">
                            <div className="bottom-button-div">
                                <button className="admin" type="submit">
                                    <label>NHẬP</label>
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </form>
        </div>
    )
}
