//Importing dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

//Variable of Sweet Alert
const MySwal = withReactContent(Swal)

const Show = () => {

    //Configure hooks
    const [products, setProducts] = useState( [] )

    //Configure database reference
    const productsCollection = collection(db, "products")

    //Get all products
    const getProducts = async () =>{
        const data = await getDocs(productsCollection)
        setProducts(
          data.docs.map( (doc) => ({...doc.data(), id:doc.id}) )
        )
    
    }

    //Delete product by id
    const deleteProduct = async (id) =>{
      const productDoc = doc(db, "products", id)
      await deleteDoc(productDoc)
      getProducts()

    } 

    //Call getProducts
    useEffect( () =>{
        getProducts()
    }, [])

  //Buttons and tables
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='d-grid gap-2'>
              <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
            </div>
            <table className='table table-dark table-hover'>
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map( product => (
                  <tr key={product.id}>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link to={`/edit/${product.id}`} className='btn btn-secondary'><i class="fa-solid fa-pencil"></i></Link>
                      <button onClick={ () => { deleteProduct(product.id)}} className='btn btn-danger'><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Show