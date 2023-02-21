import React from 'react';
import { Button, Wrapper, Field,  LanguageSmallBtn } from '../../Inputs';
import { AiOutlineLogout } from 'react-icons/ai';
import { TiArrowBackOutline } from 'react-icons/ti';

import { MdAccountCircle } from 'react-icons/md';
import Tooltip from '../../Tooltip';
import { Dark } from '../../Colors';



function User({data, user, attemptLogout, contentType, showHelp, children}) {
  const onLogoutClick = (e) => {
    e.preventDefault();
    attemptLogout();
  }
  return (
    <>
    <Wrapper horizontal='true' style={{"padding":"20px","position":"absolute"}}>
        {
          user && <>
            <Tooltip direction='bottom' content={
                <Wrapper style={{"padding":"10px"}} >
                  <Field align="top" style={{"fontSize": "15px", "color":Dark}} type='displayfield' label={data.label.email} >{user.email}</Field>
                  <Field align="top" style={{"fontSize": "15px", "color":Dark}} type='displayfield' label={data.label.code} >{user.code}</Field>
                </Wrapper>
              }>
              <Button style={{"paddingRight":"5px"}} icon='true' big={1} darkmode={1} primary={1}><MdAccountCircle/></Button>
            </Tooltip>
            <Button style={{"paddingRight":"5px"}} icon='true' onClick={onLogoutClick} big={1} darkmode={1} primary={1}><AiOutlineLogout/></Button>
          </>
        }
        <LanguageSmallBtn primary='true' darkmode='true' />
      </Wrapper>
      <Wrapper horizontal='true' style={{padding: "20px", position: "absolute", width: "510px", marginRight: "200px"}}>
        <Button style={{"paddingRight":"5px"}} onClick={(e)=>{window.location.href = '../';}} icon='true' big={1} darkmode={1} primary={1}><TiArrowBackOutline/></Button>
      </Wrapper>
      {children}
    </>
  )
}

export default User
