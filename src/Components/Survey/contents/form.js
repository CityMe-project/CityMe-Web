import {React, useEffect, useState} from 'react';
import {ScrollbarWrapper} from '../SurveyElements';
import { H1, Input, ProgressBar, SubSection, Wrapper} from '../../Inputs';
import axios from 'axios';
import { configs } from '../../../Data';
import { Platinum } from '../../Colors';

//https://www.digitalocean.com/community/tutorials/react-tabs-component
//https://dev.to/vponamariov/18-cards-with-form-design-tips-2dh6
//https://blog.prototypr.io/8-rules-for-perfect-form-design-4da09b0cc79

function SurveyForm({user, locale, data, get, mask, setFormIsValid, setNeverLived, children}) {
  const [language] = useState(localStorage.getItem("language")?localStorage.getItem("language"):"en");
  const [values, setValues] = useState();
  const [fData, setFData] = useState();
  const [section_id] = useState("56c25514-e38a-45fb-b532-6f97a2a92ad5");
  const [percentage, setPercentage] = useState(0);

  const set = async(rawdata, setDisabled) =>{
    let record = false;

    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };

    setDisabled && setDisabled(true);
    let data = {option_id: rawdata.option};
    if(typeof rawdata.value==="string"){
      data.complement = rawdata.value;
      if(rawdata.value === ""){
        setFormIsValid(false);
      }
    }
    
    if(!rawdata.answer_id){
      await axios.post(
        configs.apiUrl+"/answers", data, config
        ).then(function (response) {
          record = response.data;
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      }).finally(function(){
        setDisabled && setDisabled(false);
      }); 
    }else if(data.complement === "" || rawdata.value === false){
      await axios.delete(
        configs.apiUrl+"/answers/"+rawdata.answer_id, config
        ).then(function (response) {
          record = response;
      }).catch(function (error) { 
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      }).finally(function(){
        setDisabled && setDisabled(false);
      });
    }else{
      await axios.put(
        configs.apiUrl+"/answers/"+rawdata.answer_id, data, config
        ).then(function (response) {
          record = response.data;
      }).catch(function (error, r) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      }).finally(function(){
        setDisabled && setDisabled(false);
      });
    }
    return record;
  }

  useEffect(()=> {
    if(values){
      let numberofanswer = 7;
      let i = 0;
      let nvalues;
      let questions;
      let neverLived = false;
      if(fData){
        questions = fData.subsections.map((r)=>{
            return r.questions.map((q)=>{
                return q.question_id;
            })
        }).join().split(",");
      }
      
      let question = values.find(r => r.question === "cd1710ac-115c-4665-95bf-2de7b69c5247");
      if(question){
        let p1 = question.options.find(r => r.option ==="32140804-a7c3-42db-bcb0-7a53bc74946b");
        let p2 = question.options.find(r => r.option ==="d34a4f95-040a-4436-a787-565e8f98e4db");
        if(p2 && p2.value !== ""){
          nvalues = values.filter(r => !(['6daa7263-c851-4b4a-8944-696e7ed311c6','b7e3d11d-d30e-427e-8fb0-3a8a14ebe8db'].includes(r.question)));
        }else{
          nvalues = values.filter(r => !(["86ddff1a-62f8-4d13-a51b-83e865edb354", "20ed8779-0601-4742-9d78-5d4304bbf55f"].includes(r.question)));
        }
        
        if((p1 && p1.value === false) && !p2){
          setPercentage(0);
          return;
        }else if(p2 && p2.value === "" && !p1){
          setPercentage(0);
          return;
        }else if(p1 && p1.value === false && p2 && p2.value === ""){
          setPercentage(0);
          return;
        }
      }else{
        setPercentage(0);
        return;
      }
      let vs = nvalues?nvalues:values;
      for(let a in vs){
        if(questions && questions.includes(vs[a].question)){
          for(let e in vs[a].options){
            if(vs[a].options[e].option === "d34a4f95-040a-4436-a787-565e8f98e4db"){
              if(vs[a].options[e].value !== ""){
                numberofanswer = 6;
              }
            }

            if(vs[a].options[e].option === "a2d76edc-2a8b-4b18-b687-32a715170833"){
              neverLived = true;
            }
            
            if(vs[a].options[e].answer_id){
              if(vs[a].options[e].value === "" || vs[a].options[e].value === false){
                setFormIsValid(false);
              }
              i++;
            }
          }
        }
      }

      if(neverLived){
        numberofanswer = 4;
        if(i > 4){
          i = 4;
        }
        setNeverLived(true);
      }else{
        setNeverLived(false);
      }

      setPercentage(Math.round(i*100/numberofanswer));
      if(i === numberofanswer){
        setFormIsValid(true);
      }else{
        setFormIsValid(false);
      }
    }
  }, [values, fData, setFormIsValid, setNeverLived]);

  useEffect(()=> {
    mask(true);
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    async function getdata() {
      await axios.get(
        configs.apiUrl+"/sections/"+section_id, config
      ).then(function (response) {
        if(response.data.length > 0){
          setFData(response.data[0]);
        }
      }).catch(function (error) {
        console.log(error);
      }).finally(function(){
        mask(false);
      });
    }
    async function getAnswers() {
      await axios.get(
        configs.apiUrl+"/answers/survey", config
      ).then(function (response) {
        if(response.data){
          let test = Object.entries(response.data).map(([key,value],i) => {
            return {question:key, options:value.map((a) =>{
              return {option:a.option_id, answer_id:a.answer_id, value:a.complement?a.complement:true}
            })};
          });
          setValues(test);
        }
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      }).finally(function(){
        mask(false);
      });
    }
    getdata();
    getAnswers();
  }, [mask, user, section_id]);
  
  return (<>      {fData && 
        <Wrapper>
          <H1 style={{"fontSize": "30px","color":Platinum}}>{language === "pt"?fData.title_pt:fData.title}</H1> 
          <ProgressBar completed={percentage}/>
        </Wrapper>
      }
      <ScrollbarWrapper>
      <Wrapper>
      {fData && fData.subsections && fData.subsections.map((item,i) => {
        return <SubSection values={values} sub_section_id={item.sub_section_id} key={'test'+i}>
        {item.questions.map((question,i) => { 
          return <Input key={'question'+i} set={set} locale={locale} values={values && values.find(r => r.question === question.question_id)} setValues={setValues} gvalues={values} question={question} language={language}/>;
          })}
        </SubSection>
        })}
      </Wrapper>
    </ScrollbarWrapper></>
  )
}

export default SurveyForm
