import React from 'react'

import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';


const Add = ({url, token}) => {
 
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name:"",
        description:"",
        price:"",
        category: "salad",
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

   

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        const formData = new  FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price",Number(data.price))
        formData.append("category",(data.category))
        formData.append("image",image)

        //APi call
        const response  = await axios.post(`${url}/api/food/add`,formData,{headers:{token}});
        if (response.data.success) {
            setData({
                name:"",
                description:"",
                price:"",
                category: "salad",
            })
            setImage(false)
            toast.success(response.data.message)
            
        }else{
            toast.error(response.data.message)
        }

    };
  return (
    <div className="p-6 ml-64 mt-20">
            <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
                <div className="mb-8">
                    <p className="text-gray-700 mb-2"><b>Upload image:</b></p>
                    <label htmlFor="image" className="cursor-pointer block">
                        <img 
                            src={image ? URL.createObjectURL(image) : assets.upload_area} 
                            alt="" 
                            className="w-full max-w-md h-64 object-cover rounded-lg border-2 border-dashed border-[#ff6347] hover:border-[#ff8367] transition-colors"
                        />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required/>
                </div>
                <div className="space-y-6">
                    <div>
                        <p className="text-gray-700 mb-2"><b>Product name:</b></p>
                        <input 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            name='name' 
                            placeholder='Type here' 
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ff6347]"
                            required
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 mb-2"><b>Product description:</b></p>
                        <textarea 
                            onChange={onChangeHandler} 
                            value={data.description} 
                            name="description" 
                            rows="6" 
                            placeholder='Write content here' 
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ff6347]"
                            required
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-700 mb-2"><b>Product category:</b></p>
                            <select 
                                onChange={onChangeHandler} 
                                name="category"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ff6347] bg-white"
                            >
                                <option value="Salad">Salad</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Deserts">Deserts</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Cake">Cake</option>
                                <option value="Pure Veg">Pure Veg</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Noodles">Noodles</option>
                                <option value="Momo">Momo</option>
                                <option value="Coffee and Tea">Coffee and Tea</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-gray-700 mb-2"><b>Product Price:</b></p>
                            <input 
                                onChange={onChangeHandler} 
                                value={data.price} 
                                type="Number" 
                                name='price' 
                                placeholder='Rs.0'
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ff6347]"
                                required
                            />
                        </div>
                    </div>
                    <button 
                        type='submit'
                        className="w-full bg-[#ff6347] hover:bg-[#ff8367] text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
  
  )
}

export default Add
