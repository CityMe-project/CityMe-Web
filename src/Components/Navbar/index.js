import React, { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import {FaBars} from 'react-icons/fa';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn
} from './NavbarElements';
import { GoTop, LanguageBtn } from '../Inputs';
import { logo } from '../../Data';

const Navbar = (navbar) => {
  const [scrollNav, setScrollNav] = useState(false);
  const [data] = useState(navbar.data);

  const changeNav = () => {
      if(window.scrollY >= 80){
        setScrollNav(true);
      }else{
        setScrollNav(false);
      }
  }

  const maybeDefault = (module) => {
    if (typeof module === "object") {

        module = module.default;
    }

    return module;
  }
  
  useEffect(()=>{
      window.addEventListener('scroll', changeNav);
  }, []);

  const toogleHome= () =>{
    scroll.scrollToTop();
  }
  
  return (
      <>
        <Nav scrollNav={scrollNav}>
            <NavbarContainer>
                <NavLogo to="/" src={scrollNav?maybeDefault(logo.dark):maybeDefault(logo.light)} onClick={toogleHome}/>
                <MobileIcon onClick={navbar.toggle}>
                    <FaBars />
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks to="about" smooth={true} duration={500} spy={true} exact='true' offset={-80} >{data && data.about}</NavLinks>    
                    </NavItem>
                    <NavItem>
                        <NavLinks to="objectives" smooth={true} duration={500} spy={true} exact='true' offset={-80} >{data && data.objectives}</NavLinks>    
                    </NavItem>
                    <NavItem>
                        <NavLinks to="team" smooth={true} duration={500} spy={true} exact='true' offset={-80} >{data && data.team}</NavLinks>    
                    </NavItem>
                    <NavItem>
                        <NavLinks to="map" smooth={true} duration={500} spy={true} exact='true' offset={-80} >{data && data.map}</NavLinks>    
                    </NavItem>
                    <NavItem>
                        <NavLinks to="funding" smooth={true} duration={500} spy={true} exact='true' offset={-80} >{data && data.funding}</NavLinks>    
                    </NavItem>
                    <NavItem>
                        <NavLinks to="outputs" smooth={true} duration={500} spy={true} exact='true' offset={-80} >{data && data.outputs}</NavLinks>    
                    </NavItem>
                    <NavItem>
                        <NavLinks to="contact" smooth={true} duration={500} spy={true} exact='true' offset={-80} >{data && data.contact}</NavLinks>    
                    </NavItem>
                </NavMenu>
                <NavBtn>
                {/*<ButtonRoute primary='true' darkmode='true' to="/survey">{data.survey}</ButtonRoute>*/}
                <LanguageBtn primary='true' darkmode='true' />
                </NavBtn>
            </NavbarContainer>
        </Nav>
        <GoTop scrollNav={scrollNav} toogleHome={toogleHome}/>
      </>
  )
}

export default Navbar
