import React,{useEffect,useState,useContext} from 'react';
import {Usercontext} from '../../App'

function Profile() {
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(Usercontext)
    const [url,setUrl] = useState("");
    const [image,setImage] = useState("");
    useEffect(()=>{
        fetch('https://instagramproject01.herokuapp.com/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }

        }) .then(res=>res.json())
            .then(result=>{
                console.log(result)
                setPics(result.mypost)
            })
    },[])

    useEffect(() => {
        if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name", "daq2pyhfj")
        fetch("https://api.cloudinary.com/v1_1/daq2pyhfj/image/upload",{
          method:"post",
          body:data
        }) .then(res=>res.json())
            .then(data=>{
              console.log(data)
              setUrl(data.url)
            //   localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            //   dispatch({type:"UPDATEPIC",payload:data.url})
              fetch('https://instagramproject01.herokuapp.com/updatepic',{
                  method:"put",
                  headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                  },
                  body:JSON.stringify({
                      pic:data.url
                  })
              }) .then(res=> res.json())
                    .then(result=>{
                        console.log(result)
                        localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                        dispatch({type:"UPDATEPIC",payload:result.url})
                        window.location.reload()
                    })
            })   
            .catch(err=>{
              console.log(err)
            }) 
        }

    },[image])


    const updatePhoto = (file)=>{
            setImage(file)
       
    }

    return (
        <div style={{
            maxWidth: "550px",
            margin: "0px auto"
        }}>
        
         <div style={{
                margin: "18px 0",
                borderBottom: "1px solid grey"
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}>
                    <div >
                        <img alt="" style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={state? state.pic : "loading"} />                      
                    </div>
                    <div>
                        <h4><strong>{state?state.name :"loading"}</strong></h4>
                        <h5><strong>{state?state.email :"loading"}</strong></h5>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '108%'
                        }}>
                            <h6> <strong> {mypics.length} Post  </strong></h6>
                            <h6><strong> {state?state.followers.length:0} Followers</strong></h6>
                            <h6><strong> {state?state.following.length:0} Following</strong></h6>
                        </div>

                    </div>
                </div>
               
            <div className="file-field input-field" style={{margin:"10px"}}>
         <div className="btn blue darken-1">
        <span>Update pic</span>
        <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
             </div>
         </div>

            </div>
           
            <div className="gallery">
                        {
                            mypics.map(item=>{
                                return(
                                    <img key={item._id} className="item" src={item.photo} alt={item.title} />
                                )
                            })
                        }
                
  

            </div>
        </div>
    )
}

export default Profile
