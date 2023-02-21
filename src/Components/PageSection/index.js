/**https://en.wikipedia.org/wiki/Immediately_invoked_function_expression */
import { useState } from "react";
import Parser  from 'html-react-parser';
import { ButtonLink } from "../ButtonElements";
import { Button } from "../Inputs";
import { BtnWrap, BulletColumn, BulletIcon, BulletsWrap, 
    Column, ContactsContainer, Description, Heading, Img, 
    ImgWrap, MultiBtnWrap, PageContainer, PageRow, 
    PageWrapper, Subtitle, TextWrapper, Title, TitleWraper, TopLine } from "./PageElements";

const PageSection = (sectionData) => {
   const [data] = useState(sectionData.data);

   const maybeDefault = (module) => {
        if (typeof module === "object") {
            module = module.default;
        }

        return module;
    }
    
  return (
    <>
        <PageContainer darkmode={data.style.darkMode?1:0}  id={data.controller.id}>
            <PageWrapper>
                <TitleWraper>
                        {
                            (() => {
                                if (data.title) {
                                    return <Title darkmode={data.style.darkMode?1:0} >{data.title}</Title>
                                }
                            })()
                        }
                        {
                            (() => {
                                if (data.subtitle) {
                                    return  <Subtitle darkmode={data.style.darkMode?1:0} >{data.subtitle}</Subtitle>
                                }
                            })()
                        }
                </TitleWraper>
                <PageRow>
                    {data.content.map((item,i) => {
                        if(item.type === 'text')
                            return <Column gridarea={item.gridarea} key={item.type+i}>
                                    <TextWrapper>
                                        {
                                            (() => {
                                                if (item.topLine) {
                                                    return <TopLine>{item.topLine}</TopLine>
                                                }
                                            })()
                                        }
                                        {
                                            (() => {
                                                if (item.headline) {
                                                    return  <Heading darkmode={data.style.darkMode}>{item.headline}</Heading>
                                                }
                                            })()
                                        }
                                        <Description darkmode={data.style.darkMode?1:0}>{Parser(item.description)}</Description>
                                        {
                                            (() => {
                                                if (item.footer) {
                                                    return <Description darkmode={data.style.darkMode?1:0}>{Parser(item.footer)}</Description>;
                                                }
                                            })()
                                        }
                                        {
                                            (() => {
                                                if (item.contacts) {
                                                    return <ContactsContainer darkmode={data.style.darkMode?1:0}>
                                                    {
                                                        (() => {
                                                            if (item.contacts) {
                                                                return item.contacts.map((contact,i) => {
                                                                    return <a key={"contact"+i} href={"mailto:"+contact}>{contact}</a>;
                                                                });
                                                            }
                                                        })()
                                                    }
                                                    </ContactsContainer>
                                                }
                                            })()
                                        }
                                        {
                                            (() => {
                                                if (item.button) {
                                                    return <BtnWrap>  
                                                         {
                                                            (() => {
                                                                if (item.button.url) {
                                                                    return <ButtonLink
                                                                            primary={item.button.primary?1:0} 
                                                                            darkmode={data.style.darkMode?1:0} 
                                                                            href={item.button.url} 
                                                                            disabled={item.button.disabled} 
                                                                            target={item.button.target?item.button.target:"_blank"}
                                                                        >{item.button.text}</ButtonLink>
                                                                }else{
                                                                    return <Button 
                                                                        smooth={true} 
                                                                        duration={500} 
                                                                        spy={true} 
                                                                        exact="true" 
                                                                        offset={-80} 
                                                                        primary={item.button.primary?1:0} 
                                                                        darkmode={data.style.darkMode?1:0} 
                                                                        rounded={1}
                                                                        upper={1}
                                                                        disabled={item.button.disabled} 
                                                                        to={item.button.to?item.button.to:''} 
                                                                    >{item.button.text}</Button>
                                                                }
                                                            })()
                                                        }
                                                       
                                                    </BtnWrap>
                                                }else if(item.buttons){
                                                    return <MultiBtnWrap>
                                                        {item.buttons.map((button,i) => {
                                                            if (button.url) {
                                                                return <ButtonLink
                                                                        key={"multibtn"+i}
                                                                        primary={button.primary?1:0} 
                                                                        darkmode={data.style.darkMode?1:0} 
                                                                        href={button.url} 
                                                                        disabled={button.disabled} 
                                                                        target="_blank"
                                                                    >{button.text}</ButtonLink>
                                                            }else{
                                                                return <Button 
                                                                    rounded={1}
                                                                    key={"multibtn"+i}
                                                                    disabled={button.disabled} 
                                                                    smooth={true} 
                                                                    duration={500} 
                                                                    spy={true} 
                                                                    exact="true" 
                                                                    offset={-80} 
                                                                    primary={button.primary?1:0} 
                                                                    darkmode={data.style.darkMode?1:0} 
                                                                    to={button.to?button.to:''} 
                                                                >{button.text}</Button>
                                                            }
                                                        })}
                                                    </MultiBtnWrap>
                                                }
                                            })()
                                        }
                                    </TextWrapper>
                                </Column>
                        else if(item.type === 'img') 
                            return <Column gridarea={item.gridarea} key={item.type+i}>
                                    {
                                        (() => {
                                            if (item.topLine) {
                                                return <TopLine>{item.topLine}</TopLine>
                                            }
                                        })()
                                    }
                                    {
                                        (() => {
                                            if (item.headline) {
                                                return  <Heading darkmode={data.style.darkMode}>{item.headline}</Heading>
                                            }
                                        })()
                                    }
                                    <ImgWrap>
                                        <Img src={maybeDefault(item.img)} alt={item.alt}/>
                                    </ImgWrap>
                                </Column>
                        else if(item.type === 'bullets') 
                            return <Column gridarea={item.gridarea} key={item.type+i}>
                                    {
                                        (() => {
                                            if (item.topLine) {
                                                return <TopLine>{item.topLine}</TopLine>
                                            }
                                        })()
                                    }
                                    {
                                        (() => {
                                            if (item.headline) {
                                                return  <Heading darkmode={data.style.darkMode}>{item.headline}</Heading>
                                            }
                                        })()
                                    }
                                    <BulletsWrap>
                                        <tbody>
                                            {item.bullets.map((bullet,i) => {
                                                return <tr key={"bullet"+i}>
                                                    <BulletColumn><BulletIcon/></BulletColumn>
                                                    <BulletColumn>{Parser(bullet)}</BulletColumn>
                                                </tr>//<BulletItem key={item.type+i}>{Parser(bullet)}</BulletItem>
                                            })}
                                        </tbody>
                                    </BulletsWrap>
                                </Column>
                        else{
                            return <h1><BulletIcon/>null</h1>
                        }
                    })}
                </PageRow>
            </PageWrapper>
        </PageContainer>
    </>
  )
}

export default PageSection
