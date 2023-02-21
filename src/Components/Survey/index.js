//https://www.w3schools.com/howto/howto_js_scroll_indicator.asp percentage bar
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Container, ContentContainer, FooterContainer, FormContent, FormWrap, PageContainer} from './SurveyElements'
import Map from '../Map'
import 'leaflet/dist/leaflet.css';
import Mask from '../Mask';
import axios from 'axios';
import SurveyHome from './contents/home';
import { configs } from '../../Data';
import Status, { statusType } from '../Status';
import Login from './controls/login';
import SurveyForm from './contents/form';
import FormTools from './controls/form';
import SurveyHeader from './contents/header';
import SurveyInitialForm from './controls/initialform';
import User from './controls/user';
import DrawForm from './contents/draw';
import SurveySubmit from './contents/submit';
import Dialog from './contents/dialog';
import { FloatingStatus, LoadingBar } from '../Inputs';


const Survey = (props) => {
  const [data] = useState(props.data);
  const statusRef = useRef(null);
  const floatingstatusRef = useRef(null);
  

  const [isFormContentMasked, MaskFormContent] = useState(true);
  const [isPageMasked, setIsPageMasked] = useState(false);
  const [dialogType, setDialogType] = useState("exit");
  
  const [loginValues, setLoginValues] = useState({email:'',code:''});
  const [codeVisible, setCodeVisible] = useState(false);
  const [user, setUser] = useState();


  const [containerType, setContainerType] = useState('center');//center,right,full
  const [contentType, setContentType] = useState("home");//home,form,draw
  const [controlType, setControlType] = useState();//login,user,navigation

  //#region Begining of survey
  const [surveyData, setSurveyData] = useState({hasSurvey:false});
  const [originalSurveyData, setOriginalSurveyData] = useState({hasSurvey:false});
  const [globalProgress, setGlobalProgress] = useState();

  const SurveyHandleChange = (e)  => {
    const { name, value } = e.target;
    setSurveyData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const onGetSurvey = async(e)  => {
    MaskFormContent(true);
    if(e){
      e.preventDefault();
    }

    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };

    await axios.get(
      configs.apiUrl+"/surveys/user/", config
    ).then(function (response) {
      if(response.data.length > 0){
        setSurveyData({
          hasSurvey: true,
          survey_id: response.data[0].survey_id,
          agreement: true,
          shared_info:response.data[0].shared_info
        });
        setOriginalSurveyData({
          hasSurvey: true,
          survey_id: response.data[0].survey_id,
          agreement: true,
          shared_info:response.data[0].shared_info
        });
      }
    }).catch(function (error) {
      if(error.response.status===401){
        statusRef.current.show(statusType.error, data.erros.server);
      } 
    }).finally(function(){
      MaskFormContent(false);
    });
  }

  const onSetSurvey = async(e, newRecord)  => {
    MaskFormContent(true);
    if(e){
      e.preventDefault();
    }

    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };

    if(originalSurveyData.hasSurvey && JSON.stringify(surveyData) !== JSON.stringify(originalSurveyData)){
      await axios.put(
        configs.apiUrl+"/surveys/"+surveyData.survey_id, surveyData, config
        ).then(function (response) {
        MaskFormContent(false);
      }).catch(function (error) {
        if(error.response.status===401){
          statusRef.current.show(statusType.error, data.erros.server);
        }
        MaskFormContent(false);
      });
    }
    if(newRecord){
      await axios.post(
        configs.apiUrl+"/surveys", surveyData, config
        ).then(function (response) {
        setPage("form");
        //statusRef.current.show(statusType.success, data.context.surveysucess);
        MaskFormContent(false);
      }).catch(function (error) {
        if(error.response.status===401){
          statusRef.current.show(statusType.error, data.erros.server);
        }
        MaskFormContent(false);
      });
    }
    
  }

  const onLoadSurvey = async(e)  => {
    if(e){
      e.preventDefault();
    }
    setPage("form");
  }
  //#endregion

  //#region Submit
  const [formIsValid, setFormIsValid] = useState(false);
  const [neverLived, setNeverLived] = useState(false);
  const [drawIsValid, setDrawIsValid] = useState(false);
  //#endregion

  //#region Demographic Questionnaire
  const [formData, setFormData] = useState();
  
  const onGetSections = async(e)  => {
    MaskFormContent(true);
    if(e){
      e.preventDefault();
    }

    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };

    await axios.get(
      configs.apiUrl+"/sections", config
    ).then(function (response) {
      if(response.data.length > 0){
        setFormData(response.data);
      }
    }).catch(function (error) {
      if(error.response.status===401){
        statusRef.current.show(statusType.error, data.errors.server);
      } 
      MaskFormContent(false);
    });
  }

  const formController = {
    user: user,
    locale: data,
    data: formData,
    get: onGetSections,
    mask: MaskFormContent,
    setFormIsValid: setFormIsValid,
    setNeverLived: setNeverLived
  }
  //#endregion
  
  //#region Map-based Questions
  const mapRef = useRef(null);
  const [mapValues, setMapValues] = useState(); 
  const [helpTooltip, setHelpTooltip] = useState(false);

  const showHelp = () => {
    setHelpTooltip(!helpTooltip);
  }
  const globalProgressIncrease = (count) =>{
    setGlobalProgress(globalProgress+count);
  }
  const globalProgressDecrease = (count) =>{
    setGlobalProgress(globalProgress-count);
  }

  const drawController = {
    user: user,
    data: formData,
    get: onGetSections,
    mask: MaskFormContent,
    map: mapRef.current,
    mapValues: mapValues,
    setMapValues: setMapValues,
    status: floatingstatusRef.current,
    setDrawIsValid: setDrawIsValid,
    globalProgressIncrease: globalProgressIncrease,
    globalProgressDecrease: globalProgressDecrease
  }
  //#endregion

  const setPage = (mode) => {
    if(mode === "homelogin"){
      setCodeVisible(false);
      setContainerType('center');
      setContentType('home');
      setControlType("login");
    }else if(mode === "homeuser"){
      setContainerType('center');
      setContentType('home');
      setControlType("user");
    }else if(mode === "form"){
      setContainerType('full');
      setContentType('form');
      setControlType("navigation");
    }else if(mode === "draw"){
      setContainerType('right');
      setContentType('draw');
      setControlType("navigation");
    }else if(mode === "submit"){
      setContainerType('centersmall');
      setContentType('submit');
      setControlType("navigation");
    }
  }

  const handleChange = (e)  => {
    const { name, value } = e.target;
    setLoginValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleLogout = () => {
    MaskFormContent(true);
    setTimeout(() => {
      setUser();
      setLoginValues({email:'',code:''});
      setPage("homelogin");
      localStorage.setItem("user", "");
      MaskFormContent(false);
      window.location.reload(false);
    }, 1000);
  };

  const onVerify = async(e)  => {
    await axios.post(
      configs.apiUrl+"/loginVerify",
      loginValues
    ).then(function (response) {
      if(response.data.success){
        if(response.data.submited){
          statusRef.current.show(statusType.info,data.errors.alreadysubmited);
        }else{
          setCodeVisible(true);
        }
      }else{
        onRegister();
      }
    }).catch(function (error) {
      console.log("error");
      if(error.response){
        if(error.response.status===401){
          statusRef.current.show(statusType.warning,error.response.message);
        }
      }else{
        statusRef.current.show(statusType.error, data.errors.server);
      }
    }).finally(function(){
        MaskFormContent(false);
    });
  }

  const onReconnect = useCallback(async(data) => {
    axios.post(
      configs.apiUrl+"/loginVerify", data
    ).then(function (response) {
      if(response.data.success){
        setUser(data);
        setPage('homeuser');
      }else{
        setUser();
        setPage('homelogin');
        statusRef.current.show(statusType.warning, data.errors.lostsession);
      }
    }).catch(function (error) {
      setPage('homelogin');
      if(error.response){
        if(error.response.status===401){
          statusRef.current.show(statusType.warning,error.response.message);
        }
      }else{
        statusRef.current.show(statusType.error, data.errors.server);
      }
    }).finally(function(){
      MaskFormContent(false);
    });
  }, []);

  const onRegister = async(e)  => {
    await axios.post(
      configs.apiUrl+"/register",
      loginValues
    ).then(function (response) {
      doLogin(response.data);
      MaskFormContent(false);
    }).catch(function (error) {
      if(error.response.status===401){
        statusRef.current.show(statusType.error, data.errors.server);
      }
    });
  }

  const onLogin = async(e)  => {
    await axios.post(
      configs.apiUrl+"/login",
      loginValues
    ).then(function (response) {
      doLogin(response.data);
      statusRef.current.show(statusType.success, data.context.loginsuccess);
    }).catch(function (error) {
      if(error.response.status===401){
        statusRef.current.show(statusType.error, data.errors.server);
        setPage('homelogin');
      }
    }).then(function (data){
      MaskFormContent(false);
    });
  }

  const doLogin = (response) =>{
    localStorage.setItem("user", JSON.stringify(response.data));
    setUser(response.data);
    setPage("homeuser");
  }

  const onReload = async(e)  => {
    e.preventDefault();
    setCodeVisible(false);
  }

  const onSubmit = async(e)  => {
    e.preventDefault();
    MaskFormContent(true);
    if(!codeVisible){
      onVerify();
    }else{
      onLogin();
    }
  }

  //#region Constrollers
  const login = {
    values: loginValues,
    set: setLoginValues,
    handle: handleChange,
    withCode: codeVisible,
    onReload: onReload,
    onSubmit: onSubmit,
    disabled: false
  };

  const initialFormController = {
    set: onSetSurvey,
    load: onLoadSurvey,
    values: surveyData,
    handle: SurveyHandleChange,
    verify: onGetSurvey,
  };

  const attemptLogout = () =>{
    setIsPageMasked(true);
    setDialogType("logout");
  }

  const showDialog = (type)  => {
    setIsPageMasked(true);
    setDialogType(type);
  }

  const dialogController = {
    data: data.dialog,
    user: user,
    dialogType: dialogType,
    setIsPageMasked: setIsPageMasked,
    handleLogout: () =>{
      handleLogout();
      setIsPageMasked(false);
    },
    exit: () =>{
      setPage("homeuser");
      setIsPageMasked(false);
    }
  }

  const userController = {
    user: user,
    attemptLogout: attemptLogout,
    showHelp: showHelp
  };
  //#endregion

  //#region FormController
  const onNextForm = async(e)  => {
    if(e){
      e.preventDefault();
    }

    mapRef.current && mapRef.current.hideZoom();
    if(contentType === "form"){
      if(!formIsValid){
        statusRef.current.show(statusType.info,data.errors.forminvalid);
        return;
      }
      setGlobalProgress(55);
      mapRef.current && mapRef.current.showZoom();
      if(neverLived){
        mapRef.current && mapRef.current.hideZoom();
        setPage("submit");
      }else{
        setPage("draw");
      }
    }else if(contentType === "draw"){
      if(!drawIsValid){
        statusRef.current.show(statusType.info,data.errors.drawinvalid);
        return;
      }
      setPage("submit");
    }
  }

  const onPrevForm = async(e)  => {
    if(e){
      e.preventDefault();
    }
    debugger;
    mapRef.current && mapRef.current.hideZoom();
    if(contentType === "submit"){
      mapRef.current && mapRef.current.showZoom();
      setPage("draw");
    }else if(contentType === "draw"){
      setGlobalProgress(0);
      setPage("form");
    }else if(contentType === "form"){
      setGlobalProgress(0);
      setPage("homeuser");
    }
  }

  const onFinalSubmit = async(e)  => {
    if(e){
      e.preventDefault();
    }
    MaskFormContent(true);
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };

    if((formIsValid && drawIsValid) || neverLived){
      await axios.post(
        configs.apiUrl+"/surveys/submit", {submited:true}, config
      ).then(function (response) {
        if(response.data){
            statusRef.current.show(statusType.success, data.context.surveysubmited);
            handleLogout();
        }
      }).catch(function (error) {
        console.log(error);
        statusRef.current.show(statusType.error, data.errors.server);
      }).finally(function(e){
        MaskFormContent(false);
      });
    }else{
      statusRef.current.show(statusType.error, data.errors.surveysubmited);
      MaskFormContent(false);
    }
  }

  const formControlsController = {
    data: data.controls,
    next: onNextForm,
    back: onPrevForm,
    type: contentType,
    showDialog: showDialog,
    formIsValid: formIsValid,
    drawIsValid: drawIsValid
  }

  const submitController = {
    onSubmit: onFinalSubmit
  }
  //#endregion
  
  useEffect(() => {
    if(!statusRef){
      return null;
    }
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(loggedInUser);
      onReconnect(foundUser);
    }else{
      setPage('homelogin');
      MaskFormContent(false);
    }
  }, [onReconnect]);
  
  return (
    <PageContainer> 
      <LoadingBar completed={globalProgress} />
      {
        //#region PageMask
        (() => {
          if (isPageMasked) {
            return <Mask style={{"height":"100%"}} fullpage='true' loading={false}>
              {
                //#region PageMask
                (() => {
                  return <Dialog {...dialogController} />
                })()
                //#endregion 
              } 
            </Mask>
          }
        })()
        //#endregion 
      } 
      <Container type={containerType}>
        <FormWrap>
          <FormContent type={containerType}>
            {
              //#region Content Mask
              (() => {
                if (isFormContentMasked) {
                  return <Mask/>
                }
              })()
              //#endregion 
            }
            <SurveyHeader collapse={contentType==="form"||contentType==="draw"?1:0}>
              {contentType==="home" && <User data={data.login} {...userController} contentType={contentType} />}
            </SurveyHeader>
            <ContentContainer>
            {
              //#region Content
              (() => {
                if (contentType === "home") {
                  return <SurveyHome data={data.home}/>
                }else if (contentType === "form") {
                  return <SurveyForm {...formController}/>;
                }else if (contentType === "draw") {
                  return <DrawForm localedata={data.draw} {...drawController}/>;
                }else if (contentType === "submit") {
                  return <SurveySubmit {...submitController} data={data.submit}/>;
                }else{
                  return null;
                }
              })()
              //#endregion 
            }
            {
              //#region Controls
              (() => {
                if(controlType === "login") {
                  return <Login {...login} data={data.login}/>
                }else if(controlType === "user") {
                  return user && <SurveyInitialForm {...initialFormController} data={data.initialform} />
                }else if(controlType === "navigation") {
                  return <FormTools {...formControlsController} />
                }else{
                  return null;
                }
                
              })()
              //#endregion 
            }
            </ContentContainer>
            <FooterContainer>
            {
              //#region Status
              (() => {
                return <Status ref={statusRef}/>;
              })()
              //#endregion 
            }
            </FooterContainer>
          </FormContent>
        </FormWrap>
      </Container>
      <Map contentType={contentType} localedata={data.draw} status={floatingstatusRef.current} user={user} mapValues={mapValues} setMapValues={setMapValues} ref={mapRef}/>
      <FloatingStatus>
        <Status style={{"width": "35%"}} ref={floatingstatusRef}/>
      </FloatingStatus>
    </PageContainer>
  )
}

export default Survey

//example 
/*
<div type="center" class="sc-kHOZwM iufPEL">
  <header style="">LOGO</header>
  <content style="flex: 1;width: 100%;"></main>
  <footer>status</footer>
</div>*/