//Importing dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';



const Create = () => {
    //Hooks
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState(0)

    //Const to redirect
    const navigate = useNavigate();

    //Const to configure the collection of Firebase
    const productsCollection = collection(db, "products")

    //Store the collection on Database
    const store = async (e) => {
        e.preventDefault()
        await addDoc( productsCollection, {description:description, stock:stock})
        navigate('/')
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Create product</h1>

                <form onSubmit={store}>
                    {/*Store description*/}
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <input 
                        value={description}
                        className='form-control' 
                        type='text' 
                        onChange={ (e) => setDescription(e.target.value)}/>
                    </div>

                    {/*Store stock*/}
                    <div className='mb-3'>
                        <label className='form-label'>Stock</label>
                        <input
                        value={stock} 
                        className='form-control' 
                        type='number' 
                        onChange={ (e) => setStock(Number(e.target.value))}/>
                    </div>

                    <button type='submit' className='btn btn-primary'>Create</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create