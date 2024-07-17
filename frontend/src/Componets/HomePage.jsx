// import { AddOutlinedIcon, CloseOutlinedIcon } from '@mui/icons-material';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { Fab } from '@mui/material';
import  { useEffect, useState } from 'react';
import ImageUpload from './ImageUpload';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Facebook from './Facebook';
import { ListState } from '../Context/ContextProvider';
import axios from "axios";
import { apiImages } from "../../apiList";

const HomePage = () => {
  const [show, setShow] = useState(false);
 
  const { list ,setList} = ListState();
  async function download()
  {
    try{
      const val= await axios.get(apiImages,{withCredentials:true});
      setList(val.data.data);
      console.log(val.data.data);
    }catch(err)
    {
      toast.error(err.message)
    }
   
  }
  useEffect(()=>{
    download();
    
  },[])
  return (
    <div className='h-full bg-slate-800 min-h-screen '>
      <div className='fixed top-0 bg-slate-100 w-full'>
        <Navbar />
      </div>
     {  list.map((t)=> <div className='flex justify-center pt-7 z-0' key={t._id}>
      <Facebook img={t.imageUrl} topic={t.title} desc={t.description} key={t.imageUrl} views={t.views} _id={t._id}  linkCount = {t.link}/>
    </div>) }
   
      <div className='fixed bottom-0 m-2 z-20 opacity-100' onClick={() => {setShow(!show)}}>
        <Fab color='primary' aria-label='add'>
          {show ? <CloseOutlinedIcon /> : <AddOutlinedIcon />}
        </Fab>
      </div>
    <div>

    </div>
      {show && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-10'>
          <div className='bg-white rounded-md'>
            <ImageUpload setShow={setShow} />
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default HomePage;
