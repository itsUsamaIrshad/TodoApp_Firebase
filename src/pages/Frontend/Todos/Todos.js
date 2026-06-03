import React, { useState , useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { collection , getDocs, serverTimestamp, setDoc ,where , query } from 'firebase/firestore/lite'
import { AuthContext } from 'context/AuthContext';
import { firestore } from 'Config/firebase';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { useEffect } from 'react';
import { doc, deleteDoc } from "firebase/firestore/lite";
import { Link } from 'react-router-dom';


export default function Todos()

{



  const {user} = useContext(AuthContext)

  const [ document , setDocument ] = useState([])
const [ todo , setTodo] = useState({})
  const [Loading , setLoading] = useState(true)
  const [processDelete , setProcessDelete] = useState(false)
  const [process , setProcess] = useState(false)


  const handleChange = (e) =>
  {
    
    setTodo(s=> ({...s, [e.target.name]:e.target.value}))

  }

  ////////////////////////////////////////////////////////////

  const fetchDocument = async() =>
  {

    
    let array = []
    const q = query(collection(firestore, "todos"), where("createBy.uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  let data =doc.data()
  // doc.data() is never undefined for query doc snapshots
  //console.log(data)

  array.push(data)
});

setDocument(array)
setLoading(false)
  }
  
useEffect(()=>
{

  fetchDocument()

},[user])

  //////////////////////////////////////////

  const handleDelete = async(todo)=>
  {
    // console.log(todo)
    // return
   
    setProcessDelete(true)
try
{
  
await deleteDoc(doc(firestore, "todos", todo.id));

window.notify('Todo has been successfully Deleted' , 'success')

let newDocument = document.filter((doc)=>
{
  return todo.id !== doc.id
}
)
setDocument(newDocument)
}
catch(error)
{
  console.error(error)
}


    setProcessDelete(false)
  }

  ///////////////////////////////////////////////////

  const handleUpdate = async() =>
  {
console.log(todo)

let formData = {...todo}
formData.dateCreated = formData.dateCreated
formData.modify = serverTimestamp()

formData.modifiedBy =
{
  email : todo.email,
  uid: todo.uid
}
setProcess(true)
try
{
  // Add a new document in collection "cities"
  await setDoc(doc(firestore, 'todos', todo.id),todo , {merge:true} );
  
  window.notify('Todo has been Successfully Edit' , 'success')

let newDocument = document.map((doc)=>
{

  if(doc.id===todo.id)
  
    return todo
   return doc
  
})

  setDocument(newDocument )
}

catch(error)
{

  console.error(error)
window.notify('Something went wrong , todo is"nt update' , 'error')

}
setProcess(false)
  }

  
  return (

    <>
    
    <div className=" home d-flex justify-content-center align-items-center">
    <div className="container">
            <div className="row  ">
            <div className="col col-12    ">
                <h1 className="text-center ">Add Todo </h1>
                <div className="card rounded-3   p-2 p-md-5" >

                  {
                  
                  !Loading
                  ? <Table>
                  <Thead>
                    <Tr>
                      <Th>Sr : No</Th>
                      <Th>Title</Th>
                      <Th>Location</Th>
                      <Th>Description</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {document.map((todo , i)=>
                    {
                      
               return <Tr key={i}>
                      <Td>{i+1}</Td>
                      <Td className='text-danger'  >{todo.title}</Td>
                      <Td>{todo.location}</Td>
                      <Td>{todo.description}</Td>
                      <Td><button className='btn btn-success  btn-sm me-2'  data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={()=>{setTodo(todo)}} >

                      {
                         !process ? 'Update' : <div className="text-center"> <div className='spinner-border spinner-border-sm'></div> </div>
                      }
                          </button>
                      <button className='btn btn-danger  mt-md-1 mt-xl-0 btn-sm me-2'disabled={processDelete} onClick={()=>{handleDelete(todo)}}>
                        {
                        !processDelete ? 'Delete' : <div className="text-center"> <div className='spinner-border spinner-border-sm'></div> </div>
                      }</button>
                      </Td>
                    </Tr>
            
            
                    })}
                  
                  </Tbody>
                </Table>
:  <div className="text-center"> <div className='spinner-border'></div> </div>

                  } 
               
          
            </div> 
        </div> 
    </div>
    <div className="row">
      <div className="col col-lg-9 ">
      </div>
      <div className="col col-5 col-lg-2  col-md-4 col-sm-6 ">
    <Link to='/' className="nav-link active text-decoration-underline fw-bolder">Add more Todo +</Link>

      </div>
    </div>
    
    </div>
    </div>
    
    {/* <!-- Button trigger modal --> */}


   <div className="modal fade" id="exampleModal" >
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" >Edit Todo</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
     
     
           <div className="row mt-3 ">
            <div className="col col-12 col-md-6 mb-3 mb-md-0 p-1">
        <input type="text" name='title' className="form-control   " placeholder="Title" value={todo.title} onChange={handleChange}  />
            </div>
            <div className="col col-12 col-md-6  p-1 ">
            <input type="text" name='location' className="form-control"  value={todo.location}  placeholder="Location" onChange={handleChange}  />
            </div>
        </div>
             <div className="row mt-3">
              <div className="col">
                <textarea name='description' className="form-control" value={todo.description} placeholder="Description"onChange={handleChange} ></textarea>
              </div>
              </div>
              <div className="row mt-3">
              <div className="col">
                <select name="status" className='form-control' value={todo.status}  onChange={handleChange} >
                  <option value="active">Active</option>
                  <option value="inActive">Inactive</option>
                </select>
              </div>
              </div>
           
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdate} >Edit</button>
      </div>
  
    </div>
  </div>
</div>
    </>
  )
}














