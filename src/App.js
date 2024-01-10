import React, {useState , useEffect} from 'react'
import { Container , Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useUser , useSupabaseClient } from '@supabase/auth-helpers-react'
import { v4 as uuidv4 } from 'uuid' 
import fs from 'fs'

const App = () => {
  const [email , setEmail]= useState("")
  const [images , SetImages]=useState([]);
  const user = useUser();
  const supabase=useSupabaseClient();
  console.log(email);



  async function magicLinkLogin(){
    const {data , error}= await supabase.auth.signInWithOtp({
      email: email
    });
    if (error){
      alert("Error connecting supabase , use correct email address!");
      console.log(error);
    }
    else{
      alert("Check Your Email For Magic Link !");
    }
  }

  async function getImages(){
    const {data , error}=await supabase
    .storage
    .from('images')
    .list(user?.id+"/", {
      limit:100,
      offset:0,
      sortBy:{column:"name",order:"asc"}
    });


    if(data!==null){
      SetImages(data);

    }else{
      console.log(error)
    }
  }

  async function signOut (){
    const { error }=await supabase.auth.signOut() ;
  }

  async function uploadImage(e){
    let file= e.target.files[0];
    let filedata= fs.readFileSync(file);
    const arrayBuffer= Buffer.from(filedata).buffer;
    console.log("arraybuffer:", arrayBuffer);
    console.log("File name :",file);
    const {data , error }= await supabase 
    .from('images')
    .upload(user.id + '/'+uuidv4(), arrayBuffer) 
      //uuid

    if(data){
      getImages();
    }else{
      console.log(error);
    }
  }
  return (
    <Container align="center" className='container-sm mt-4'>
      {
        user===null?
        <>
          <h1>Welcome to ImageWall</h1>
          <Form>
            <Form.Group className='mb-3' style={{maxWidth:"500px"}}>
              <Form.Label>Enter an email to sign in with supabase magic link : </Form.Label>
              <Form.Control type='email' placeholder='Enter an email' onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant='primary' onClick={()=>magicLinkLogin()}>Get Magic Link</Button>
          </Form>
        </>
        :
        <>
          <h1>Your ImageWall</h1>
          <Button onClick={()=>signOut()}>Sign Out </Button>
          <p>Current User : {user.email}</p>
          <p>Use the Choose File button below to upload an image  to your gallery</p>
          <Form.Group className='mb-3' style={{maxWidth:"500px"}}>
            <Form.Control type='file' accept='image /png, image/jpeg' onChange={(e)=>uploadImage(e)}></Form.Control>
          </Form.Group>
          <hr/>
          <h3> Your Images :</h3>

        </>
      }

    </Container>
  )
}

export default App
