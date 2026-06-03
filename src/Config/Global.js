import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

window.getRandomId = ()=>Math.random().toString(36).slice(2)


window.notify = (msg  , type) =>
{

const option = {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme : 'dark',
      
               
}

switch(type)
{
        case  'success' :
         toast.success(msg , option)
         break
       case  'error' :
         toast.error(msg , option)
        break
       case  'info' :
         toast.info(msg , option)
        break
        case  'warning' :
         toast.warning(msg , option)
         break
         default:
                toast(msg , option)
}


}