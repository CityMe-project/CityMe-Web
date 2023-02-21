import React from 'react'
import { HeaderContainer, NavbarContainer, NavLogo} from '../SurveyElements'
import { logo } from '../../../Data';
import {Title} from "../../PageSection/PageElements";

//https://www.digitalocean.com/community/tutorials/react-tabs-component

function SurveyHeader({collapse, hidden, label, children}) {
  return !hidden &&(
    <HeaderContainer style={{"justifyContent": "flex-end"}}>
    {children}
    <NavbarContainer height={collapse?'60':'120'}>
      {
      !label && <NavLogo heightInherit={collapse} to="/" src={logo.light.default} />
      ||
      label && <Title style={{"paddingTop":"40px"}} darkmode={1}>{label}</Title>
      }
    </NavbarContainer>
  </HeaderContainer>
  )
}

export default SurveyHeader
