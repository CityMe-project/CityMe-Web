import React, { useEffect } from 'react';
import { Button, Checkbox, Container, Wrapper } from '../../Inputs';



function SurveyInitialForm({set, load, values, handle, verify, data, children}) {
  const beginSurvey = (e) =>{
    if(values.hasSurvey){ 
      set(e);
      load(e);
    }else{
      set(e, true);
    }
  }
  useEffect(()=>{verify()},[]);
  return (
    <>
      <Container>
        <Wrapper style={{"paddingBottom":"5px"}}>
          <Checkbox name='agreement' checked={values.agreement} onChange={handle}>{data.checkbox.agreement}</Checkbox>
          <Checkbox name='shared_info' checked={values.shared_info} onChange={handle}>{data.checkbox.shared_info}</Checkbox>
        </Wrapper>
        <Button big={1} disabled={!values.agreement || !values.shared_info} darkmode={1} primary={1} onClick={beginSurvey}>{values.hasSurvey?data.continue:data.begin}</Button>
        {children}
      </Container>
    </>
  )
}

export default SurveyInitialForm
