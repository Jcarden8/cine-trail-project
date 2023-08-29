import {useState, createContext, useEffect} from 'react'

export const UserContext = createContext();

export default function UserContextProvider(props){
   
    const [user, setUser] = useState('')
    const [token, setToken] = useState('')
    
    useEffect(
        ()=>{
            
            setToken(localStorage.getItem('token'))
            setUser(JSON.parse(localStorage.getItem('userInfo')))
            

        }, [] 
     )
 
    return(
        <UserContext.Provider value={{user, setUser, token, setToken}}>
            {props.children}
        </UserContext.Provider>
    )
}