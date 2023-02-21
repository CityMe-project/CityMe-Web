import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages'
import SurveyPage from './pages/survey';

function App() {
  const [data, setData] = useState();
  const languageExists = localStorage.getItem("language");
  
  useEffect(()=>{
    let locale = "en";
    if(!languageExists){
      localStorage.setItem("language", "en");
    }else{
      locale = languageExists;
    }
    fetch('/data/locale_'+locale+'.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function(response){
      return response.json();
    }).then(function(myJson) {
      setData(myJson);
    });
  },[languageExists]);

  return (
    <Router>
      <Routes>
        {data && <Route path='/' element={<Home data={data}/>} exact />}
        {data && <Route path='/survey' element={<SurveyPage data={data} />} exact/>}
        
      </Routes>
    </Router>
  );
}

export default App;
