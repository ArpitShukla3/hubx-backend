import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { apiPost } from '../../apiList';
import { ListState } from '../Context/ContextProvider';

const ImageUpload = ({setShow}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pic,setPic] = useState();
  const {list,setList}=ListState()
  function dismissAndReturn(val)
  {
      toast.dismiss();
      toast.error(val)
      return;
  }
  const handleUpload = async() => {
    if(!title)
    {
        return dismissAndReturn("Title missing")
    }
    if(!description)
    {
        return dismissAndReturn("Description missing")
    }
    if(!pic)
    {
        return dismissAndReturn("Pic missing")
    }
    const data = new FormData()
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
        data.append("file", pic);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dksi17o87");
      }
    toast.dismiss();
    toast.loading("Processing Upload");

    
    try {
      //loading image into database
        let FETCH_URL = "https://api.cloudinary.com/v1_1/" + "dksi17o87" + "/" + "/upload";
        const res=  await axios.post(FETCH_URL, data);
      
        //sending obtained url,title and decription
        const postDetails= {
          title:title,
          description:description,
          img:res.data["secure_url"]
      }
      const res2=  await axios.post(apiPost,postDetails,{withCredentials:true});
        // setting images in the context or getting image details from backendd in response and then adding it into post array
        setList([{title:title,description:description,imageUrl:res.data["secure_url"],views:0,likes:0},...list])
        toast.dismiss();
        toast.success("Added successfully")
        if(res2.data.success)
        {
          setShow(false);
          toast.success("Added successfully")
        }
        else{
          toast.error("Failed to upload Retry once")
        }
    } catch (error) {
        return dismissAndReturn(error.message);
    }
  };
  return (
    <div className='z-10'>
    <Container maxWidth="sm" className="mt-8">
      <Paper elevation={3} className="p-6">
        <Typography variant="h4" align="center" gutterBottom>
          Image Upload
        </Typography>
        <div>
          <TextField
            label="Image Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
          <TextField
            label="Image Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
          />
          <input type="file" accept="image/*" className="mt-4" onChange={(e)=>setPic(e.target.files[0])}/>
          <Button
            variant="contained"
            color="primary"
            className="mt-4"
            onClick={handleUpload}
          >
            Upload Image
          </Button>
        </div>
      </Paper>
      <Toaster/>
    </Container>
    </div>
  );
};

export default ImageUpload;
