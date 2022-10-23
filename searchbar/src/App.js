import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios"

function App() {
  const [input,setInput]=useState('')
  const [result, setresult]=useState([])
  const [error,seterror]=useState('')
  const search=()=>{
    axios({
      url:"http://localhost:5002/search/"+input,
  method:"GET"
  
  }).then((respose)=>{
      console.log(respose.data)
      setresult( respose.data)
      if(respose.data.length===0){
        seterror('No Ad found')
      }
      else{
        seterror('')
      }
    },(err)=>{
    })
  }
 
  return (
    <div className="App">
      <input type="Search"onChange={(e)=>{setInput(e.target.value)}}></input>
      <button className="btn btn-primary" onClick={search} style={{width:'65px',height:'35px'}}>Search</button><br/>
      {error}
      {result && result.map((e)=>{
        return(<>
       <div class="col-md-4">
          <h4 class="col-lg-6">{e.headline}</h4>
          
          {e.primaryText}
          <img  src={e.imageUrl} ></img>
          {console.log(e.imageUrl)}
          <h2>{e.CTA}</h2>
          </div>
          </>)
      })}
    </div>
  );
}

export default App;
