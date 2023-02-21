import React from 'react';
import { Button, CircleButton, H1, Wrapper } from '../../Inputs';
import { ContentContainer, FooterContainer, FormContent, HeaderContainer} from '../SurveyElements';
import { MdClose } from 'react-icons/md';
import { Burnt, Platinum } from '../../Colors';

function Dialog({data, user, dialogType, setIsPageMasked, handleLogout, exit, children}) {
  const setVisisble = (visible) =>{
    setIsPageMasked(visible);
  }
  const pExit = () =>{
    if(dialogType === "exit"){
      exit();
    }else if(dialogType === "logout"){
      handleLogout();
    }
  }
  return (
    <FormContent style={{"padding":"10px"}} type={"dialog"}>
      <HeaderContainer style={{"justifyContent": "center",  "padding": "7px 0"}} >
        <Wrapper style={{"display": "flex", "justifyContent": "center","padding": "0"}}>
          <H1 style={{"fontSize": "25px", "marginBottom":"0"}}>{data.title}</H1>
        </Wrapper>
        <Wrapper style={{"display": "flex", "justifyContent": "flex-end", "position": "absolute", "padding": "0", "width": "423px",  "height": "34px"}}>
          <CircleButton style={{"fontSize":"25px"}} icon='true' big={1} darkmode={1} primary={1} onClick={()=>setVisisble(false)}><MdClose/></CircleButton>
        </Wrapper>
      </HeaderContainer>
      <ContentContainer style={{"justifyContent": "center", "alignItems": "center"}}>
        <H1 style={{"fontSize": "15px","paddingTop":"5px", "marginBottom": "5px", "color":Platinum}}>{data.exit.msubmission}</H1>
        <H1 style={{"fontSize": "15px","paddingTop":"5px", "marginBottom": "5px", "color":Platinum}}>{data.exit.mcode}</H1>
        <H1 style={{"fontSize": "30px","paddingTop":"5px", "marginBottom": "5px", "color":Platinum}}>{user.code}</H1>
        <H1 style={{"fontSize": "9px","paddingTop":"5px", "marginBottom": "5px", "color":Burnt}}>{data.exit.mwarning}</H1>
      </ContentContainer>
      <FooterContainer>
        <Wrapper style={{"display": "flex", "justifyContent": "space-evenly"}}>
          <Button style={{"fontSize":"15px", "padding": "7px 40px"}} big={1} darkmode={1} primary={1} onClick={()=>setVisisble(false)}>{data.label.back}</Button>
          <Button style={{"fontSize":"15px", "padding": "7px 40px"}} big={1} darkmode={1} primary={1} onClick={()=>pExit()}>{dialogType === "exit"?data.label.exit:data.label.logout}</Button>
        </Wrapper>
      </FooterContainer>
    </FormContent>
  )
}

export default Dialog
