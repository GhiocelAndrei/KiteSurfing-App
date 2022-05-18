import React, {useState} from 'react';
import axios from 'axios';
export default function LoginForm(props)
{
    const [details, setDetails] = useState({name:"",password:""});
    const [users,setUsers] = useState([]);
    React.useEffect(()=>{
        const api = axios.create({
            baseURL: `https://627e1ec9b75a25d3f3b21451.mockapi.io`
        })
        const fetch = async () =>{
            try{
                const response = await api.get('/favourites')
                props.setFav(response.data)
            } catch(err){
                if(err.response){
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.header)
                }
                else {
                    console.log(`Error: ${err.message}`)
                }
            }
        }
        const fetchUsers = async () =>{
            try{
                const response = await api.get('/user')
                setUsers(response.data)
            } catch(err){
                if(err.response){
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.header)
                }
                else {
                    console.log(`Error: ${err.message}`)
                }
            }
        }
        fetch();
        fetchUsers();
    },[])
    const submitHandler = async (e) => {
        e.preventDefault();
       const doesUserExist = users.filter(user => user.name==details.name)
        if(doesUserExist.length==0)
        {
        const api = axios.create({
            baseURL: `https://627e1ec9b75a25d3f3b21451.mockapi.io`
        })
        const newLogin = {}
        var userId;
        try {
            const response = await api.post('/login',newLogin);
            userId = response.data.userId;
          } catch (err) {
            console.log(`Error: ${err.message}`);
          }
        const newUser = {name:details.name,userId:userId}
        try {
            const response = await api.post('/user',newUser);
            userId = response.data.userId;
          } catch (err) {
            console.log(`Error: ${err.message}`);
          }
        }
        props.Login(details);
    }
    function handleChange(e){
        setDetails({
            ...details,
            [e.target.name] : e.target.value}
            )
    }
    return(
        <div className="Login">
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Kite</h2>

                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input type="text" name="name" id="name" onChange={e =>handleChange(e)} value={details.name}/>  
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={e=>handleChange(e)} value={details.password} />  
                </div>
                
                <div className="form-button">
                <input type="submit" value="LOGIN" />
                </div>
            </div>
        </form>
        </div>
    )
    
}