import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonLink } from '../ButtonElements';
import Outputs from '../Outputs';
import SurveyHeader from '../Survey/contents/header';
import { Container, ContentContainer, FooterContainer, FormContent, FormWrap, PageContainer } from '../Survey/SurveyElements';
import {
    InitialContainer,
    InitialBg,
    InitialContent,
    InitialH1,
    InitialP,
    InitialBtnWrapper,
    ArrowForward,
    ArrowRight
} from './InitialElements';
import { TbArrowBackUp } from 'react-icons/tb';
import { Button as ButtonL, ScrollDown } from '../Inputs';
import { configs } from '../../Data';
import axios from 'axios';
import { GeometryList } from './outputs/geometriesList';
import { QuestionsList } from './outputs/questionsList';
import Tooltip from './outputs/Tooltip';

const InitialSection = (sectionData) => {
  const [scrollNav, setScrollNav] = useState(false);
  
  const mapRef = useRef(null);
  const tooltipRef = useRef(null);

  const [outputData, setOutputData] = useState();
  const [questionsData, setQuestionsData] = useState();
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(true);
  const [data] = useState(sectionData.data);
  const [selectedSurvey,setSelectedSurvey] = useState();
  const [filterQuestions,setFilterQuestions] = useState([]);
  
  const onHover = () =>{
    setHover(!hover);
  }

  const onChange = (e) =>{
    mapRef.current.clearLayer();
    let filteredSurvey = [];
    if(e){
      for (let i = 0; i < e.length; i++) {
        if(filterQuestions.find(x => x === e[i].question_id))
        {
          filteredSurvey.push(e[i]);
        }
      }
      mapRef.current.setSurvey(filteredSurvey);
    }
  }

  const onQuestionChange = (e) =>{
    console.log("onQuestionChange");
  }
  const changeNav = () => {
    if(window.cityme){
      if(window.scrollY >= 80){
        setScrollNav(true);
      }else{
        setScrollNav(false);
      }
    }else{
      setScrollNav(true);
    }
  }

  useEffect(()=>{
      window.addEventListener('scroll', changeNav);
      async function getdata() {
        await axios.get(
            configs.apiUrl+"/geometries/output"
        ).then(function (response) {
            setOutputData(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        await axios.get(
          configs.apiUrl+"/questions/7f430f76-0e6f-4032-8694-582180c885ca"
        ).then(function (response) {
          setQuestionsData(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }
    getdata();
  }, []);
  
  useEffect(()=> {
    onChange(selectedSurvey);
  }, [selectedSurvey]);

  useEffect(()=> {
    onChange(selectedSurvey);
  }, [filterQuestions]);
 
  return (
    <InitialContainer visible={visible} id={data && data.controller.id}>
      <InitialBg>
        <Outputs ref={mapRef} localedata={sectionData.outputs.draw} style={{"zIndex":1}}/>
      </InitialBg>
      <InitialContent visible={visible}>
        <InitialH1>{data && data.title}</InitialH1>
        <InitialP>{data && data.subtitle}</InitialP>
        <InitialBtnWrapper>
          <Button to="map"  
                  smooth={true} 
                  duration={500} 
                  spy={true} 
                  exact="true" 
                  offset={-80} 
                  onMouseEnter={onHover} 
                  onMouseLeave={onHover} 
                  primary={data && data.buttons[0].primary?1:0} 
                  darkmode={data && data.buttons[0].darkMode?1:0}
          >{data && data.buttons[0].text}{hover ? <ArrowForward />:<ArrowRight/>}</Button>
          <ButtonLink style={{marginLeft: "20px"}} onClick={(e)=>{setVisible(false); setScrollNav(true);window.cityme = false;}} primary={data && data.buttons[1].primary?1:0} 
                  darkmode={data && data.buttons[1].darkMode?1:0}
          >{data && data.buttons[1].text}</ButtonLink>
        </InitialBtnWrapper>
      </InitialContent>
      {!visible && 
        <PageContainer> 
          <Tooltip ref={tooltipRef} style={{"position":"fixed","left":"none","top":"none"}} direction="right"></Tooltip>
          <Container type={"outputs"}>
            <FormWrap flexdirection={"row"}>
              <FormContent type={"outputs"}>
                <SurveyHeader label={data && data.outputs.title} collapse={1}>
                    <div style={{position:"absolute", padding: "10px"}}>
                    <ButtonL icon='true' big={1} darkmode={1} primary={1} onClick={(e)=>{setVisible(true);setScrollNav(false);window.cityme = true;}}><TbArrowBackUp/></ButtonL>
                    </div>
                </SurveyHeader>
                <ContentContainer>
                {
                  outputData && <GeometryList locale={data && data.outputs} setSelectedSurvey={setSelectedSurvey} map={mapRef} surveys={outputData} onChange={onChange}></GeometryList>
                }
                </ContentContainer>
                <FooterContainer>
                </FooterContainer>
              </FormContent>
              <FormContent background={"transparent"} type={"outputs-questions"}>
                <ContentContainer>
                {
                  questionsData &&  <QuestionsList locale={data && data.outputs} setFilterQuestions={setFilterQuestions} tooltip={tooltipRef} map={mapRef} questions={questionsData} onChange={onQuestionChange}></QuestionsList>
                }
                </ContentContainer>
                <FooterContainer>
                </FooterContainer>
              </FormContent>
            </FormWrap>
          </Container>
      </PageContainer>
      }
    <ScrollDown scrollNav={scrollNav}/>
    </InitialContainer>
  )
}

export default InitialSection
