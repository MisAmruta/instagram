// import React,{useEffect,useState,useContext} from 'react';
// import {Usercontext} from '../../App';
// import {useParams} from 'react-router-dom'

// function Profile() {
//      const [userprofile,setuserprofile] = useState(null)
   
//     const {state,dispatch} = useContext(Usercontext)
//     const {userid} = useParams()
//     const[showfollow,setShowfollow] = useState(state?!state.following.includes(userid):true)
//     // console.log(userid)
//     useEffect(()=>{
//         fetch(`/user/${userid}`,{
//             headers:{
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             }

//         }) .then(res=>res.json())
//             .then(result=>{
//                 console.log(result)
//                 setuserprofile(result)
             
//             })
//     },[])

//     const followUser =()=>{
//         fetch('/follow',{
//             method:"put",
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             },
//             body:JSON.stringify({
//                 followId:userid
//             })
//         }) .then(res=>res.json())
//             .then(data=>{
//                 console.log(data)
//                 dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
//                 localStorage.setItem("user",JSON.stringify(data))
//                 setuserprofile((prevState)=>{
//                     return{
//                     ...prevState,
//                     user:{
//                         ...prevState.user,
//                         followers:[...prevState.user.followers,data._id]
//                     }
//                 }
//                 })
//                 setShowfollow(false)
//             })
//     }

//     const unfollowUser =()=>{
//         fetch('/unfollow',{
//             method:"put",
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             },
//             body:JSON.stringify({
//                 unfollowId:userid
//             })
//         }) .then(res=>res.json())
//             .then(data=>{
//                 console.log(data)
//                 dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
//                 localStorage.setItem("user",JSON.stringify(data))
//                 setuserprofile((prevState)=>{
//                     const newFollower = prevState.user.followers.filter(item=>item != data._id)
//                     return{
//                     ...prevState,
//                     user:{
//                         ...prevState.user,
//                         followers:newFollower
//                     }
//                 }
//                 })
//                 setShowfollow(true)
//             })
           
//     }
//         console.log("showfollow",showfollow)
//     return (
//         <>
//         {
//             userprofile ?
//             <div style={{
//                 maxWidth: "550px",
//                 margin: "0px auto"
//             }}>
//                 <div style={{
//                     margin: "18px 0",
//                     borderBottom: "1px solid grey"
//                 }}>
//                     <div style={{
//                         display: 'flex',
//                         justifyContent: 'space-around',
//                     }}>
//                         <div >
//                             <img alt="" style={{ width: "160px", height: "160px", borderRadius: "80px" }}
//                                 src={userprofile.user.pic} />
    
//                         </div>
//                         <div>
//                             <h4><strong>{userprofile.user.name}</strong></h4>
//                             <h5><strong>{userprofile.user.email}</strong></h5>
                           
//                             <div style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 width: '108%'
//                             }}>
//                                 <h6> <strong>{userprofile.posts.length} Post </strong></h6>
//                                 <h6><strong>{userprofile.user.followers.length} Followers</strong></h6>
//                                 <h6><strong>{userprofile.user.following.length} Following</strong></h6>
//                             </div>
//                             {
//                                 showfollow?
//                                 <button style={{margin:"10px"}} className="btn waves-effect waves-light #42a5f5 blue darken-1" type="submit" name="action" 
//                                 onClick={()=>followUser()}>
//                                     Follow
//                                      </button>
//                                      :
//                                      <button style={{margin:"10px"}} className="btn waves-effect waves-light #42a5f5 blue darken-1" type="submit" name="action" 
//                                      onClick={()=>unfollowUser()}>
//                                          UnFollow
//                                           </button>
//                             }
                            
                          
//                         </div>
//                     </div>
                   
//                 </div>
//                 <div className="gallery">
//                             {
//                                 userprofile.posts.map(item=>{
//                                     return(
//                                         <img key={item._id} className="item" src={item.photo} alt={item.title} />
//                                     )
//                                 })
//                             }
                    
      
    
//                 </div>
//             </div>
//             :<h2>Loading state..</h2>
//         }
        
//         </>
//     )
   
// }

// export default Profile


 import React,{useEffect,useState,useContext} from 'react';
    import {Usercontext} from '../../App';
 import {useParams} from 'react-router-dom'
function UserProfile() {
    const [userProfile, setProfile] = useState(null)
    
    const {state,dispatch} = useContext(Usercontext)
    const {userid} = useParams()
    const [showFollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
    console.log("state.",state)
    useEffect(() => {
        fetch(`https://instagramproject01.herokuapp.com/user/${userid}`,{
            headers:{
                'Authorization' : 'Bearer ' +localStorage.getItem('jwt')
            }

        }).then(res=> res.json())
        .then(result => {console.log(result)
            
            setProfile(result)   
        })
    },[])

    const followUser = () => {
        fetch('https://instagramproject01.herokuapp.com/follow',{
            method:'put',
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(req => req.json())
        .then(data => {
            dispatch({type:"UPDATE", payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState) => {
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
            console.log(data)
        })
    }

    const unfollowUser = () => {
        fetch('https://instagramproject01.herokuapp.com/unfollow',{
            method:'put',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' +localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res => res.json())
        .then(data => {

            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})

            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=> item != data._id)
                return{
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                }
            })
            setShowFollow(false)
        })
    }

   
    
  console.log("userprofile",userProfile)


    return (
        <>
        {userProfile ? 
        <div style={{
            maxWidth:"550px",
            margin:"0px auto"
        }}>
              <div style={{
                  display: 'flex',
                  justifyContent:'space-around',
                  margin:"18px 0",
                  borderBottom:"1px solid grey"
              }}>
                  <div>
                      <img  alt=""  style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                      src={userProfile?userProfile.user.pic: "Loading..."}/>
                  </div>
                  <div>
                      <h4><strong>{userProfile.user.name}</strong></h4>
                      <h5><strong>{userProfile.user.email}</strong></h5>
                      <div style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          width:'108%'
                      }}>
                         
                          <h6> <strong>{userProfile.posts.length} Post </strong></h6> 
                          <h6><strong>{userProfile.user.followers.length} Followers</strong></h6>
                          <h6><strong>{userProfile.user.following.length} Following</strong></h6>
                          
                      </div>
                      {showFollow ? 
                      <button style={{
                          margin:'10px'
                      }} className="btn waves-effect waves-light #2196f3 blue" 
                      onClick={followUser} >Follow</button>
                      :
                      <button className="btn waves-effect waves-light #2196f3 blue" 
                      onClick={unfollowUser} >Un Follow</button>}
                            
        
                  </div>
              </div>
              
              <div className="gallery">
                  {
                      userProfile.posts.map(item => {
                          return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
               
                          )
                      })
                  }
                  {/* <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  <img className="item" src="https://images.unsplash.com/photo-1607017137021-5dc7e8cd4317?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                  */}
              </div>
        </div>
        : <h2>Loading...</h2>}
        </>
    )
}

export default UserProfile
