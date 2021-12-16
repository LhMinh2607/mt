import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { updateDrink } from '../actions/drinkAction';
import { detailsOfDrink } from '../actions/drinkAction';
import { useParams } from 'react-router-dom';
import DateComponent from '../components/DateComponent';
import { DRINK_UPDATE_RESET } from '../constants/drinkConst';

export default function DrinkUpdatingPage(props) {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [addedQuantity, addQuantity] = useState(0);
    const [quantity, setQuantity] = useState(0);


    const params = useParams();
    const id = params.drinkId;


    const drinkUpdating = useSelector(state=>state.drinkUpdating);
    const {loading, error, success} = drinkUpdating;

    const drinkDetail = useSelector(state=>state.drinkDetail);
    const {loading: loadingDetails, error: errorDetails, drink} = drinkDetail;
    
    const categoriesArray = ["Nước uống", "hmm"];

    const [disabled, setDisabled] = useState(true); //const disabled = true, const setDisabled = () =>{};
    const [editButtonName, setButtonName] = useState(true);

    const enableEdit = ()=>{
        dispatch(detailsOfDrink(id));
        setDisabled(!disabled);
        editButtonNameChange();
    }

    const editButtonNameChange = () =>{
        setButtonName(!editButtonName);
    }


    useEffect(()=>{
        window.scrollTo({
            top: 0, 
          });
        dispatch({type: DRINK_UPDATE_RESET});
        dispatch(detailsOfDrink(id));
        setName(drink.name);
        setCategory(drink.category);
        setImage(drink.image);
        setPrice(drink.price);
        setDescription(drink.description);
        setQuantity(drink.quantity);
    }, [dispatch, id]);


 

    const submitHandler = (e) =>{
        //
        const quantity = Number(drink.quantity)+Number(addedQuantity);
        e.preventDefault();
        dispatch(updateDrink({_id: id, name, category, image, price, description, quantity}));
        window.location.reload();
    }

    const browseFile = (e) =>{
        //e.target.files[0];
    }

    return (
        loadingDetails ? (<LoadingBox></LoadingBox>) : errorDetails ? (<MessageBox variant="error">{errorDetails}</MessageBox>) :
        (
        <div>
            <div className="nav-menu"> 
                
            </div>
            
            <form className="form" onSubmit={submitHandler}>
                    {disabled ?
                        (<div>
                           
                            <div>
                                <div className="row left">
                                    <img className='detailImage' src={drink.image} alt={drink.name}></img>
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Tên: ‎</label> <label>{drink.name}</label>
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Loại: ‎</label> {drink.category}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Giá: ‎</label> {drink.price}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Mô tả: ‎</label> {drink.description}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Số lượng hiện có ‎</label> {drink.quantity}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Ngày tạo: ‎</label> {drink && <DateComponent passedDate={drink.createdAt}></DateComponent>}
                                </div>
                                <div className="row left">
                                    <label className="bold-text">Ngày sửa: ‎</label> {drink && <DateComponent passedDate={drink.updatedAt}></DateComponent>}
                                </div>
                            </div>
                        </div>) :
                    
                    (<div>
                        <div>
                            {
                                loading ? (<LoadingBox></LoadingBox>)
                                : error ? (<MessageBox variant="error">{error}</MessageBox>)
                                : success &&  (<MessageBox variant="info">Đã cập nhật món</MessageBox>)
                            }
                        </div>
                        
                        <label htmlFor="name">
                            Tên: 
                        </label>
                        <input className='basic-slide' id="name" type="text" placeholder="Tên" onChange={(e)=> setName(e.target.value)} 
                        value={drink.name} 
                        value={name} required={true}>
                        </input>
                        <label htmlFor="category">
                            Loại: 
                        </label>
                        <div>
                           <div className='box'><select id="category" onChange={(e)=>setCategory(e.target.value)} required={true}  value={drink.category} value={category}>
                                {
                                    categoriesArray.map(categoryItem=>(
                                        <option key={categoryItem}>{categoryItem}</option>
                                    ))
                                }
                            </select></div>
                        </div>
                        <label htmlFor="image">
                            Hình: 
                        </label>
                        <input className='basic-slide' id="image" type="text" placeholder="Hình" onChange={(e)=> setImage(e.target.value)} value={drink.image} value={image}>
                        </input>
                        {/* <input type="file" onChange={(e)=>browseFile(e.target.value)}></input> */}
                        
                        <label htmlFor="price">
                            Giá: 
                        </label>
                        <input className='basic-slide' id="price" type="text" placeholder="Giá" onChange={(e)=> setPrice(e.target.value)} required={true} value={drink.price} value={price}>
                        </input>
                        <label htmlFor="desc">
                            Mô tả: 
                        </label>
                        <input className='basic-slide' id="description" type="text" placeholder="Mô tả" onChange={(e)=> setDescription(e.target.value)} required={true} value={drink.description} value={description}> 
                        </input>
                        <label htmlFor="qty">
                            Số lượng hiện có: 
                        </label>
                        <input className='basic-slide' id="quantity" type="text" placeholder="Số lượng" value={drink.quantity} disabled></input>
                        <label htmlFor="addQty">
                            Nhập thêm số lượng: 
                        </label>
                        {/* <input id="addQuantity" type="numnber" placeholder="Thêm số lượng" value='0' onChange={(e)=> setQuantity(e.target.value)}></input> */}
                        <input className='basic-slide' id="addQuantity" type="numnber" placeholder="Số lượng" value={addedQuantity} onChange={(e)=> addQuantity(e.target.value)}></input>

                    </div>)
                }
                    {/* <div className="row center">
                        <div className='col-1'><button className="admin" type="button" onClick={enableEdit}>
                        {editButtonName? (<label>SỬA</label>)
                            : (<label>ĐÓNG</label>)
                            }
                            </button></div>
                        
                        {!editButtonName && 
                        <div className='col-1'><button className="admin" type="submit" disabled={disabled}>
                                <label>XÁC NHẬN</label>
                        </button></div>
                            }
                    </div> */}
                    <div>
                        <div className="bottom-button-div-group">
                                <div className="bottom-button-div">
                                    <button className="admin" type="button" onClick={enableEdit}>
                                    {editButtonName? (<label>SỬA</label>)
                                    : (<label>ĐÓNG</label>)
                                    }
                                    </button>
                                </div>
                                {!editButtonName && <div className="bottom-button-div">
                                    <button className="admin" type="submit" disabled={disabled}>
                                        <label>GỬI</label>
                                    </button>
                                </div>}
                                
                        </div>
                    </div>
                    
            </form>
            
        </div>)
    )
}
