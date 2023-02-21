import React, { useState } from 'react';
import { LanguageBtn } from '../Inputs';
import {SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap} from './SidebarElements';

const Sidebar = (navbar) => {
  const [data] = useState(navbar.data);
  return (
    <div>
      <SidebarContainer isOpen={navbar.isOpen} onClick={navbar.toggle}>
          <Icon onClick={navbar.toggle}>
              <CloseIcon />
          </Icon>
          <SidebarWrapper>
              <SidebarMenu>
                  <SidebarLink to="about" onClick={navbar.toggle}>{data && data.about}</SidebarLink>
                  <SidebarLink to="team" onClick={navbar.toggle}>{data && data.team}</SidebarLink>
                  <SidebarLink to="map" onClick={navbar.toggle}>{data && data.map}</SidebarLink>
                  <SidebarLink to="funding" onClick={navbar.toggle}>{data && data.funding}</SidebarLink>
                  <SidebarLink to="outputs" onClick={navbar.toggle}>{data && data.outputs}</SidebarLink>
                  <SidebarLink to="contact" onClick={navbar.toggle}>{data && data.contact}</SidebarLink>
              </SidebarMenu>
              <SideBtnWrap>
                <LanguageBtn primary='true' darkmode='true' />
              </SideBtnWrap>
          </SidebarWrapper>
      </SidebarContainer>
    </div>
  )
}

export default Sidebar
