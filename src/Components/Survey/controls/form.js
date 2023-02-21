
import React from 'react';
import { Button, Container, Wrapper } from '../../Inputs';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import { AiOutlineLogout } from 'react-icons/ai';

function FormTools({data, next, back, type, showDialog, formIsValid, drawIsValid, children}) {
  const NextForm = (e) =>{
    next(e);
  }
  const PrevForm = (e) =>{
    back(e);
  }

  return (
    <Container style={{"display": "flex","padding":"0px"}}>
      {
      (() => {
        return <Wrapper style={{"display": "flex","justifyContent": "space-between", "width": "100%", "paddingTop": "20px"}}>
            {(() => {
               if(type === "form") {
                return <>
                  <Button style={{"fontSize":"40px"}} icon='true' labelAlign={"right"} label={data.btnback} big={1} darkmode={1} primary={1} onClick={PrevForm}><BiChevronLeftCircle/></Button>
                  <Button style={{"fontSize":"40px"}} icon='true' labelAlign={"center"} label={data.btnexit} big={1} darkmode={1} primary={1} onClick={(e) => showDialog("exit")}><AiOutlineLogout/></Button>
                  <Button style={{"fontSize":"40px"}} icon='true' labelAlign={"left"} label={data.btnnext} big={1} darkmode={1} primary={1} onClick={NextForm} ><BiChevronRightCircle/></Button>
                </>
               }else if(type === "draw") {
                return <>
                  <Button style={{"fontSize":"40px"}} icon='true' labelAlign={"right"} label={data.btnback} big={1} darkmode={1} primary={1} onClick={PrevForm}><BiChevronLeftCircle/></Button>
                  <Button style={{"fontSize":"40px"}} icon='true' labelAlign={"center"} label={data.btnexit} big={1} darkmode={1} primary={1} onClick={(e) => showDialog("exit")}><AiOutlineLogout/></Button>
                  {formIsValid && drawIsValid && 
                  <Button style={{"fontSize":"40px"}} icon='true' labelAlign={"left"} label={data.btnsubmit} big={1} darkmode={1} primary={1} onClick={NextForm}><BiChevronRightCircle/></Button>}
                </>
               }else if(type === "submit") {
                return <>
                    <Button style={{"fontSize":"40px"}} icon='true' labelAlign={"right"} label={data.btnback} big={1} darkmode={1} primary={1} onClick={PrevForm}><BiChevronLeftCircle/></Button>
                    <Button style={{"fontSize":"40px"}} icon='true' labelAlign={"center"} label={data.btnexit} big={1} darkmode={1} primary={1} onClick={(e) => showDialog("exit")}><AiOutlineLogout/></Button>
                </>
               }else{
                  return null;
               }
            })()}
            {children}
        </Wrapper>
      })()
      }
    </Container>
  )
}

export default FormTools
