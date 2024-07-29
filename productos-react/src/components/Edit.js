//Importing dependencies
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

//Variable of Sweet Alert
withReactContent(Swal)

const Edit = () => {

  //Hooks
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState(0)

  //Const to redirect
  const navigate = useNavigate()

  //Const to seek
  const { id } = useParams()

  //What button update does when it press
  const update = async (e) => {
    e.preventDefault()
    const product = doc(db, "products", id)
    const data = { description: description, stock: stock }
    await updateDoc(product, data)
    navigate('/')
  }

  //Get the product clicked
  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "products", id))
    //Verify if product exists
    if (product.data()!=undefined) {
      setDescription(product.data().description)
      setStock(product.data().stock)
    } else {
      //Show and alert and redirect to main route
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The product doesn't exist",
      });
      navigate('/')
    }

  }

  //Call the selected product when redirect to edit route
  useEffect(() => {
    getProductById(id)
  }, [])
  

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Edit product</h1>

                <form onSubmit={update}>
                    {/*Update description*/}
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <input 
                        value={description}
                        className='form-control' 
                        type='text' 
                        onChange={ (e) => setDescription(e.target.value)}/>
                    </div>

                    {/*Update stock*/}
                    <div className='mb-3'>
                        <label className='form-label'>Stock</label>
                        <input
                        value={stock} 
                        className='form-control' 
                        type='number' 
                        onChange={ (e) => setStock(Number(e.target.value))}/>
                    </div>

                    <button type='submit' className='btn btn-primary'>Update</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Edit