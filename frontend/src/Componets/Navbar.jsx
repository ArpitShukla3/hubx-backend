import { Button } from '@mui/material'
import { apiLogout } from '../../apiList'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Navbar = () => {
  const navigateTo = useNavigate();
  async function Logout()
  {
    try {
      await axios.post(apiLogout,{name:"name"},{withCredentials:true});
      toast.success("Logout")
      navigateTo("/login");
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='bg-slate-900' >
        <Button variant="contained" color="error" onClick={Logout} >
        Logout </Button>
    <Toaster/>
   
    </div>
  )
}

export default Navbar