import {React, useState} from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { FaFacebook, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';
import { logo } from '../../Data';
import { NavLogo } from '../Navbar/NavbarElements';
import { FooterContainer, FooterLinkItems, 
  FooterLinksContainer, FooterLinksWrapper, 
  FooterWrap, Img, SocialIconLink, SocialIcons, 
  SocialMedia, SocialMediaWrap, WebSiteRights } from './FooterElements';

const Footer = (footer) => {
  const [data] = useState(footer.data);

  const maybeDefault = (module) => {
    if (typeof module === "object") {

        module = module.default;
    }

    return module;
  }

  const toogleHome= () =>{
    scroll.scrollToTop();
  }

  return (
    <FooterContainer>
    <FooterWrap>
        <FooterLinksContainer>
            <FooterLinksWrapper>
                <FooterLinkItems>
                  <SocialIconLink href={data.imgs.novaims.url} target="_blank"><Img src={data.imgs.novaims.img}/></SocialIconLink>
                </FooterLinkItems>
                <FooterLinkItems>
                  <SocialIconLink href={data.imgs.fct.url} target="_blank" ><Img src={data.imgs.fct.img}/></SocialIconLink>
                </FooterLinkItems>
            </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
            <SocialMediaWrap>
                <NavLogo to="/" onClick={toogleHome} src={maybeDefault(logo.light)}/>
                <WebSiteRights to='/'>{data.labels.projectReference}</WebSiteRights>
                <WebSiteRights><a rel="noreferrer"  href={data.labels.projectReferenceUrl} target="_blank" >{data.labels.projectReferenceCode}</a></WebSiteRights>
                <WebSiteRights>{data.labels.copyrights.replace("?", new Date().getFullYear())}</WebSiteRights>
                <SocialIcons>
                    <SocialIconLink href={data.links.twitter} target="_blank" aria-label="Twitter"><FaTwitter /></SocialIconLink>
                    <SocialIconLink href={data.links.facebook} target="_blank" aria-label="Facebook"><FaFacebook /></SocialIconLink>
                    <SocialIconLink href={data.links.instagram} target="_blank" aria-label="Facebook"><FaInstagram /></SocialIconLink>
                    <SocialIconLink href={data.links.github} target="_blank" aria-label="Github"><FaGithub /></SocialIconLink>
                </SocialIcons>
            </SocialMediaWrap>
        </SocialMedia>
    </FooterWrap>
</FooterContainer>
  )
}

export default Footer
