import  React, { useState, useEffect, useRef} from 'react';
import { BsMouse } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Dark, HoverPrimary, Platinum, Primary } from '../Colors';
import SelectRaw from 'react-select';
import { CheckboxContainer, HiddenCheckbox, Icon, StyledCheckbox, Text, BaseButton, BaseWrapper, BaseContainer, HWrapper, 
    IconButton, BaseH1, BaseLabel, FieldWrapper, CheckboxInput, ScrollDownContainer, 
    ScrollDownWrapper, TextboxInput, TextboxContainer, TextboxLabel, RadioContainer, RadioInput, 
    HiddenRadio, StyledRadio, RadioIcon, RadioLabel, RadioGroupContainer, GoTopContainer, GoTopWrapper, ProgressbarLabel, ProgressbarFiller, ProgressbarContainer, UlContainer, CButton, TextButton, LoadingbarContainer, LoadingbarFiller, FloatingStatusContainer} from './InputsElements';
import { FooterContainer, ScrollbarWrapper, Subtitle } from '../Survey/SurveyElements';
import { BiShapeSquare, BiShapePolygon, BiTrash, BiPencil, BiSave, BiXCircle} from 'react-icons/bi';
import Status, { statusType } from '../Status';
import ReactTagInput from '@pathofdev/react-tag-input';
import "@pathofdev/react-tag-input/build/index.css";
import axios from 'axios';
import { configs } from '../../Data';
import Parser  from 'html-react-parser';
import {  VideoDraw } from '../InitialSection/InitialElements';

export const Checkbox = function(props) { 
    const [checked, setChecked] = useState(props.checked);
    const [disabled, setDisabled] = useState(props.disabled?props.disabled:false);
   
    function handleCheckboxChange(e){
       if(disabled){ return;}
       setChecked(!checked);
       e.target.value = !checked;
       e.target.name = props.name;
       props.onChange(e, setDisabled);
    }


    useEffect(()=>{setChecked(props.checked)},[props.checked]);

    useEffect(()=>{
        if(props.value && props.value.options.find(r => r.option === props.name)){
            setChecked(props.value.options.find(r => r.option === props.name).value?true:false);
        }
        
        if(props.value){
            let record = props.value.options.find(r => r.option === "d34a4f95-040a-4436-a787-565e8f98e4db");
            if(record){
                setDisabled(record.value===""?false:true);
            }
        }

    },[props.value, props.name]);
    return (
        <CheckboxContainer>
            <CheckboxInput disabled={disabled} onClick={handleCheckboxChange}>
                <HiddenCheckbox onChange={() =>{}} />
                <StyledCheckbox checked={checked}>
                    <Icon viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                    </Icon>
                </StyledCheckbox>
                <Text>{props.children}</Text>
            </CheckboxInput>
        </CheckboxContainer>
    )
};

export const Radio = function(props) {
    const [checked, setChecked] = useState(props.checked);
    function handleRadioChange(e){
        setChecked(true);
        e.target.value = true;
        e.target.name = props.name;
        if(props.onChange){
            props.onChange(e);
        }
    }
    
    useEffect(()=>{
        setChecked(props.checked);
    },[props.checked]);

    return (
        <RadioContainer>
            <RadioInput onClick={handleRadioChange}>
                <HiddenRadio onChange={(e) =>{}} />
                <StyledRadio checked={checked}>
                    <RadioIcon viewBox="0 0 24 24">
                        <ellipse cx="12" cy="12" rx="8" ry="8"/>
                    </RadioIcon>
                </StyledRadio>
                <RadioLabel>{props.children}</RadioLabel>
            </RadioInput>
        </RadioContainer>
    )
};

export const RadioGroup = function(props) {
    const [selectedValue, setSelectedValue] = useState();
    const [disabled, setDisabled] = useState(props.disabled?props.disabled:false);

    function handleRadioChange(e){
        if(disabled){return;}
        if(selectedValue === e.target.name){return;}
        setSelectedValue(e.target.name);
        const data = {name:e.target.name, value:e.target.value};
        props.onChange(e, data, setDisabled);
    }
    
    useEffect(()=>{
        if(props.value){
            setSelectedValue(props.value.options[0].option)
        }
    },[props.value, props.name]);
    return (
        <RadioGroupContainer>
             {
                 props.radios.filter(radio => radio.type === "radio").map((item,i) => {
                     return <Radio name={item.option_id} key={"radio"+i} onChange={handleRadioChange} checked={selectedValue === item.option_id}>{props.language==="pt"?item.text_pt:item.text}</Radio>
                 })
             }
        </RadioGroupContainer>
    )
};

export const SelectCountry = function(props) {
    const [data, setData] = useState();
    let rawvalue = "";
    if(props.value){
        let op = props.value.options.find(r => r.option === props.name);
        rawvalue = {label:op.value, value:op.value};
    }
    const [value, setValue] = useState(rawvalue);
    
    const colourStyles = {
        menu: (styles)=>({
            ...styles,
            backgroundColor: Platinum
        }),
        control: (styles, { data, isDisabled, isFocused, isSelected })=> (
        {   ...styles, 
            "width":"200px",
            "&:hover": {
                borderColor: Primary,
                color: Dark
            }, 
            "&:active": {
                borderColor: Primary,
                color: Dark
            }, 
            backgroundColor: Platinum, 
            borderColor: "#adadad", 
            borderWidth: "3px",
            boxShadow: "none!important" 
        }),
        menuList: (styles)=> (
            {   ...styles, 
                "::-webkit-scrollbar": {
                    width: "8px",
                },
                "::-webkit-scrollbar-track": {
                    boxShadow: "nset 0 0 6px grey",
                    borderRadius: "5px"
                },
                "::-webkit-scrollbar-thumb": {
                    background: Primary,
                    borderRadius: "15px",
                    height: "3px",
                    transition: "all 0.2s ease-in-out"
                },
                "::-webkit-scrollbar-thumb:hover": {
                    background: HoverPrimary,
                    maxHeight: "10px",
                    transition: "all 0.2s ease-in-out",
                    cursor: "pointer"
                }
            }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => (
            {
                ...styles,
                backgroundColor: isFocused ? Primary : Platinum,
                color: isFocused ? Platinum : Dark,
                cursor: isDisabled ? 'not-allowed' : 'default'
        })
    };
    const selectOnChange = (e) =>{
        setValue(e);
        props.onChange({target:{name:props.name, value: e.value}});
    }
    //TODO memory leak
    useEffect(()=> {
        fetch('/data/countries.json',{ headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }}).then(function(response){
            return response.json();
        }).then(function(myJson) {
            setData(myJson);
        });
    }, []);
    return (
        <TextboxContainer >
            <TextboxLabel disabled={props.disabled}>{props.label+":"}</TextboxLabel>
            <SelectRaw placeholder={props.locale.controls.select} name={props.name} styles={colourStyles} value={value} options={data} onChange={selectOnChange}/>
        </TextboxContainer>
    )
};

export const TextBox = function(props) {
    const [value, setValue] = useState(props.value && props.value.options.find(r => r.option === props.name)?props.value.options.find(r => r.option === props.name).value:"");
    const [invalid, setInvalid] = useState(false);
    const [disabled, setDisabled] = useState(false);
    //const [questionDisabled, setQuestionDisabled] = useState(props.disabled?props.disabled:null);
    
    const handleFocusOut = (e) => {
        if(props.type !=="zipcode"){
            setValue(e.target.value);
            if(props.onChange){
                props.onChange(e, setDisabled);
            }
        }
    }
    const handleChange = (e) => {
        if(props.type ==="zipcode"){
            if(e.target.value.match("^\\d{4}-\\d{3}$")!=null) { 
                setInvalid(false);
                e.target.invalid = false;
            }else{
                setInvalid(true);
                e.target.invalid = true;
            }
            if(e.target.value.match("^[0-9]*-?[0-9]*$")!=null){
                setValue(e.target.value);
                if(props.onChange && !e.target.invalid){
                    props.onChange(e, setDisabled);
                }
                if(e.target.value === ''){
                    props.onChange(e, setDisabled);
                }
            }
        }else{
            setValue(e.target.value);
        }
    };

    useEffect(()=>{
        if(props.value && props.value.options.find(r => r.option === props.name)){
            setValue(props.value.options.find(r => r.option === props.name).value);
        }
        if(props.value){
            let record = props.value.options.find(r => r.option === "32140804-a7c3-42db-bcb0-7a53bc74946b");
            if(record){
                setDisabled(record.value);
            }
        }
    },[props.value, props.name]);

    useEffect(()=>{
        setDisabled(props.disabled);
    },[props.disabled]);

    useEffect(()=>{
        if(props.type ==="zipcode"){
            if(value && (value.match("^\\d{7}$")!=null || value.match("^\\d{8}$")!=null)){
                setValue(value.substring(0,4)+"-"+value.substring(4,7));
                setInvalid(false);
                props.onChange({target:{name:props.name,value:value.substring(0,4)+"-"+value.substring(4,7),invalid:false}}, setDisabled);
            }
        }
    },[value, props]);

    return (
        <TextboxContainer>
            <TextboxLabel disabled={props.disabled}>{props.label+":"}</TextboxLabel>
            <TextboxInput
                name={props.name}
                maxLength={props.type==="zipcode"?"8":props.maxLength?props.maxLength:"255"}
                disabled={disabled}
                value={value} 
                invalid={invalid}
                style={{"width":props.type==="zipcode"?"auto":"205px"}}
                onChange={handleChange}
                onBlur={handleFocusOut}
            />
        </TextboxContainer>
    )
};

export const SubSection = function(props) {
  const [visible, setVisible] = useState(false);
  const [subsectionid] = useState(props.sub_section_id);
  useEffect(()=> {
      //TODO put values on bd
      if(subsectionid === "2e05d5a4-81db-450e-80d7-743e721e3437"){
        const d = ["33497423-a001-45f5-aac3-9eea30610ba6", "4f6a07c2-c954-47cf-8605-81b2cc60511c",
                    "7478fdcc-f337-4924-9071-c1b6d8a24d5a", "b329196e-9aca-42f9-bb58-389e89712f72",
                    "b5bbc21f-0549-424d-a663-21402fa6613c","d34a4f95-040a-4436-a787-565e8f98e4db"];
        
        if(props.values){
            const q1 = props.values.find(r => r.question === "cd1710ac-115c-4665-95bf-2de7b69c5247");
            const q2 = props.values.find(r => r.question === "6daa7263-c851-4b4a-8944-696e7ed311c6");
            const o1 = q1 && q1.options.find(r => r.option === "32140804-a7c3-42db-bcb0-7a53bc74946b");
            if(q1 || q2){
                let c = q1 && q1.options.find(r => d.find(t => t === r.option));
                let e = q2 && q2.options.find(r => d.find(t => t === r.option));

                if(c && c.value !== ""){
                    setVisible(true);
                }else if(e && e.value && (o1?o1.value:false)){
                    setVisible(true);
                }else{
                    setVisible(false);
                }
            }else{
                setVisible(false);
            }
        }else{
            setVisible(false);
        }
      }else{
            setVisible(subsectionid !== "2e05d5a4-81db-450e-80d7-743e721e3437");
      }
  }, [props.values, subsectionid]);
    return (
        visible && <>{props.children}</>
    );
};

export const Question = function(props) {
    const [visible] = useState(true);
    return (
        visible && <Wrapper {...props}>
        <Subtitle>{props.language==="pt"?props.question.title_pt:props.question.title}</Subtitle>
        <Wrapper style={{ "display": "grid", "paddingLeft": "10px"}} horizontal={true}>
            {props.children}
        </Wrapper>
        </Wrapper>
    );
};

export const Input = function(props) {
    const [visible, setVisible] = useState(props.visible?props.visible:true);
    const [disabled, setDisabled] = useState(props.disabled?props.disabled:null);
    const [question] = useState(props.question?props.question:{});
    const [questionidrelated] = useState(props.question.option_id_related);

    const checkboxOnChange = (e) =>{
        const data = {name:e.target.name, value:e.target.value};
        const record = {question:question.question_id, option: data};
        ValuesChangeHandle(record);
    }

    const textboxOnChange = (e) =>{
        const data = {name:e.target.name, value:e.target.value};
        const record = {question:question.question_id, option: data};
        ValuesChangeHandle(record);
    }

    const radioOnChange = (e, data) =>{
        const record = {question:question.question_id, option: data};
        ValuesChangeHandle(record, true);
    }

    const selectOnChange = (e) =>{
        const data = {name:e.target.name, value:e.target.value};
        const record = {question:question.question_id, option: data};
        ValuesChangeHandle(record);
    }

    const ValuesChangeHandle = async(record, replace)  => {
        let data = {option:record.option.name,value:record.option.value};
        let index = props.gvalues && props.gvalues.findIndex(r => r.question === record.question);
        let q = props.gvalues && props.gvalues.find(r => r.question === record.question);
        let a = q && q.options.find(r => r.option === data.option);
        let o = question.options.find(r => r.option_id === record.option.name);
        
        if(o.type === "radio"){
            data = {...data, answer_id:(q && q.options[0].answer_id)};
        }
        if(a){
            data = {...data, answer_id:a.answer_id};
        }
        const dbrecord = await props.set(data,setDisabled);

        if(dbrecord){
            data = {...data, answer_id: dbrecord.answer_id};
            if(props.gvalues){
                props.setValues(state => {
                    if(index === -1){
                        index = 0;
                        return [...state, {question: record.question, options: [data]}];
                    }else{
                        return state.map(item => {
                            if(item.question === record.question){
                                if(replace){
                                    return {...item, options: [data]};
                                }
                                else{
                                    if(item.options.find(r => r.option === data.option)){
                                        return {...item, options: item.options.map(r => {
                                            return r.option === data.option?{...r, answer_id: data.answer_id,value:data.value} : r;
                                        })};;
                                    }
                                }
                                return {...item, options: [...item.options, data]};
                            }
                            else{
                                return item;
                            }
                        });
                    }
                }); 
            }else{
                props.setValues([{question:record.question,options:[data]}]);
            }
        }else{
            console.log("cannot update/create the question");
        }
    }
    
    useEffect(()=> {
        if(questionidrelated){
            if(props.gvalues && props.gvalues.find(r => r.question === question.question_id_related)){
                let option = props.gvalues.find(r => r.question === question.question_id_related).options.find(r => r.option === questionidrelated);
                if(option && option.value){
                    setVisible(true);
                }else{
                    setVisible(false);
                }
            }else{
                setVisible(false);
            }
        } 
    }, [props.gvalues, question.question_id_related, questionidrelated]);

    return (
        visible && 
        <Wrapper {...props}>
            <Question {...props}>
            {
                question.options.map((option,i,self) => {
                    if(option.type === "zipcode"){
                        return <TextBox key={option.type+i} name={option.option_id} value={props.values} disabled={disabled} label={props.language==="pt"?option.text_pt:option.text} onChange={textboxOnChange} type={option.type}/>
                    }else if(option.type === "checkbox"){
                        return <Checkbox key={option.type+i} name={option.option_id} value={props.values} disabled={disabled} onChange={checkboxOnChange}>{props.language==="pt"?option.text_pt:option.text}</Checkbox>
                    }else if(option.type === "radio"){
                        if(i === 0){
                            return <RadioGroup key={option.type+i} name={option.option_id} radios={self} value={props.values} disabled={disabled} onChange={radioOnChange} language={props.language}/>
                        }else{
                            return null;
                        }
                    }else if(option.type === "textbox"){
                        return <TextBox key={option.type+i} name={option.option_id} value={props.values} disabled={disabled} label={props.language==="pt"?option.text_pt:option.text} onChange={textboxOnChange} type={option.type}/>
                    }else if(option.type === "country"){
                        return <SelectCountry key={option.type+i} locale={props.locale} name={option.option_id} value={props.values} disabled={disabled} label={props.language==="pt"?option.text_pt:option.text} onChange={selectOnChange}/>
                    }else{
                        return <BaseContainer {...props}>{option.type}</BaseContainer>
                    }
                })
            }
            </Question>
        </Wrapper>
    );

};

export const GeometryInput = function(props) {
    const [visible] = useState(props.visible?props.visible:true);
    const [question] = useState(props.question?props.question:true);
    const [widget, setWidget] = useState();

	const callWidget = (e, type) => {
        setWidget(type);
        props.callDraw && props.callDraw(question, type);
        
	}

    useEffect(()=> {
        setWidget(false);
    }, [props.value]);
    
    useEffect(()=> {
        setWidget(false);
    }, [props.index]);

    useEffect(()=> {
        if(["editcancel", "removecancel", "editsave", "removesave"].includes(widget)){
            setWidget();
        }
    }, [widget]);
    
    return (
        visible && 
        <li style={{"display":props.selected?"block":"none"}} sel={props.selected}>
            <H1 style={{"fontSize": "20px","paddingTop":"5px", "marginBottom": "5px", "color":Platinum}}>{props.children}</H1>
            {props.selected && <div>
                {props.language==="pt"?question.note_pt:question.note}
                <Button style={{"fontSize":"15px"}} active={widget==="polygon"?1:0} icon='true' big={1} darkmode={1} primary={1} onClick={(e)=>callWidget(e, "polygon")}><BiShapePolygon/>{props.data.geometryinput.drawpolygon}</Button>
                <Button style={{"fontSize":"15px"}} active={widget==="rectangle"?1:0} icon='true' big={1} darkmode={1} primary={1} onClick={(e)=>callWidget(e, "rectangle")} ><BiShapeSquare/>{props.data.geometryinput.drawsquare}</Button>
                <Button style={{"fontSize":"15px"}} active={widget==="edit"?1:0} icon='true' big={1} darkmode={1} primary={1} onClick={(e)=>callWidget(e, "edit")} ><BiPencil/>{props.data.geometryinput.editshape}</Button>
                <Button style={{"fontSize":"15px"}} active={widget==="remove"?1:0} icon='true' big={1} darkmode={1} primary={1} onClick={(e)=>callWidget(e, "remove")} ><BiTrash/>{props.data.geometryinput.deleteshape}</Button>
                {widget && widget === "edit" && 
                    <div><Button style={{"fontSize":"15px"}} icon='true' big={1} darkmode={1} primary={1} onClick={(e)=>callWidget(e, "editsave")} ><BiSave/>{props.data.geometryinput.save}</Button>
                    <Button style={{"fontSize":"15px"}} icon='true' big={1} darkmode={1} primary={1} onClick={(e)=>callWidget(e, "editcancel")} ><BiXCircle/>{props.data.geometryinput.cancel}</Button></div>}
                {widget && widget === "remove" &&
                    <div> <Button style={{"fontSize":"15px"}} icon='true' big={1} darkmode={1} primary={1} onClick={(e)=>callWidget(e, "removesave")} ><BiSave/>{props.data.geometryinput.save}</Button>
                    <Button style={{"fontSize":"15px"}} icon='true' big={1} darkmode={1} primary={1} onClick={(e)=>callWidget(e, "removecancel")} ><BiXCircle/>{props.data.geometryinput.cancel}</Button></div>}
                
                </div>}
                <br/>
                <p>
                {Parser(props.data.geometryinput.inputtext)}
                {widget && props.data.tutorials && <VideoDraw disablePictureInPicture controlsList="nodownload" autoPlay loop muted src={props.data.tutorials[widget]} type='video/mp4'/>}
                </p>
        </li>
    );

};

export const GeometryList = function({pvisible,pitems,values,data,status,map,onChange,setValues,language,
    globalProgressIncrease, globalProgressDecrease}) {
    const [visible] = useState(pvisible?pvisible:true);
    const [selectedItems, setSelectedItems] = useState(pitems[0]);
    const [index, setIndex] = useState(0);

    const select = (e) => {
        if(e !== selectedItems){
            onChange(e);
            setSelectedItems(e);
        }
	}

    const draw = (question, type) => {
        let qValue = values && values.find(r => r.question === selectedItems.question_id)
        if((type === "polygon" ||type ===  "rectangle") && qValue && qValue.options[0].geometries.length > 4){
            status && status.show(statusType.warning, data.context.maxnumber);
            return;
        }
        map && map.EnableWidget(question, type);
	}

    const next = (e) => {
        map && map.clearLayer();
        globalProgressIncrease(5);
        setIndex(index+1);
	}

    const prev = (e) => {
        map && map.clearLayer();
        globalProgressDecrease(5);
        setIndex(index-1);
	}
    
    useEffect(()=> {
        let r = pitems[index];
        onChange(r);
        setSelectedItems(r);
    }, [index, pitems, onChange]);

    useEffect(()=> {
		map && map.setQuestion(selectedItems, values && values.find(r => r.question === selectedItems.question_id));
    }, [selectedItems, map, values]);

    let items = pitems.map((itemContent, i) => {
        return (
            <GeometryInput
                data={data}
                key={i}
                index={index}
                map={map}
                value={values && values.find(r => r.question === itemContent.question_id)}
                setValues={setValues}
                status={status}
                selected={selectedItems === itemContent?1:null}
                question={itemContent}
                onChange={select}
                callDraw ={draw}
                language={language}>
                {language==="pt"?itemContent.title_pt:itemContent.title}
            </GeometryInput>
        )
    })
    return (
        visible && <>
                <Wrapper horizontal='true' style={{"display": "flex", "margin": "10px 0px"}}>
                <div>{(index > 0) && <Button  style={{"fontSize":"15px", "padding": "7px 30px"}}  key="test1" big={1} darkmode={1} primary={1} onClick={(e)=>prev(index)} >
                {data.geometrylist.back}
                </Button>}</div>
                <div>{((pitems.length-1) !== index)  && <Button style={{"fontSize":"15px", "padding": "7px 30px"}} key="test2" big={1} darkmode={1} primary={1} onClick={(e)=>next(index)}>
                {data.geometrylist.next}
                </Button>}</div>
                </Wrapper>
                <ScrollbarWrapper style={{"paddingLeft":"8px","borderWidth": "0px"}}> 
                <ListContainer tabIndex={0}>
                {items}
                </ListContainer>
                </ScrollbarWrapper>
                </>
    );

};

export const Popup = function(props) {
    const [tags, setTags] = React.useState([]);
    const statusRef = useRef();

    const save = async (e) => {
        if(tags.length > 0 && (JSON.stringify(tags) !== props.values)){
            statusRef.current.show(statusType.info,props.data.tagsaving, 0);
            let data = {geometry_id:props.geometry_id, tags: JSON.stringify(tags)};
            const config = {
              headers: props.user && props.user.token && { Authorization: `Bearer ${props.user.token}` }
            };
            await axios.put(
                configs.apiUrl+"/geometries/"+data.geometry_id, data, config
                ).then(function (response) {
                    let data = response.data[0];
                    props.setMapValues(state => {
                        return state.map(item => {
                            if(item.question === data.question_id){
                                if(item.options.find(r => r.option === data.option_id)){
                                    return {...item, options: item.options.map(r => {
                                        return {...r, geometries:r.geometries.map(g => {
                                            if(g.geometry_id === data.geometry_id){
                                                return {...g, tags:data.tags};
                                            }
                                            return g;
                                        })};
                                    })};;
                                }
                                return {...item, options: [...item.options, data]};
                            }
                            else{
                                return item;
                            }
                        });
                    });
                    statusRef.current.show(statusType.success,props.data.tagsaved);
                }).catch(function (error) {
                  if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  } else if (error.request) {
                    console.log(error.request);
                  } else {
                    console.log('Error', error.message);
                  }
                  console.log(error.config);
                  statusRef.current.show(statusType.error,props.data.tagerror);
            });
        }
	}
    useEffect(()=> {
        if(props.values){
            setTags(JSON.parse(props.values));
        }else{
            setTags([]);
        }
    }, [props.values, props.geometry_id]);
    
    return (
        <Wrapper style={{width:"300px"}}>
            <H1>{props.data.title}</H1>
           
            {tags.length > 0 && <ReactTagInput 
                tags={tags} 
                placeholder={props.data.innertext}
                maxTags={5} 
                editable={true} 
                readOnly={props.mode !== 'view'?false:true} 
                removeOnBackspace={true} 
                onChange={(newTags) => setTags(newTags)} 
                validator={(value) => {
                    value.length > 40 && statusRef.current.show(statusType.info,props.data.maxnumbercharacter);
                    return value.length < 40;
                }}
            />}
            {props.mode === 'view' &&  tags < 1 && <p style={{"fontSize":"10px", "margin": "0px 0px 5px 0px"}}>{props.data.notag}</p>}
            {props.mode !== 'view' &&  <FooterContainer style={{"padding":"3px 0","height": "30px"}}>
                <Status ref={statusRef}/>
            </FooterContainer>}
            {props.mode !== 'view' &&  <Button style={{"fontSize":"15px", "padding": "7px 30px"}} onClick={save}>{props.data.savebutton}</Button>}
        </Wrapper>
    )
};

export const Button = function(props) {
    if(props.icon){
        return (
            <IconButton {...props}>
                {(() => {
                    if(props.labelAlign){
                        if(props.labelAlign === "right"){
                            return <>
                                {props.children}
                                {props.label && <Label style={{"cursor": "pointer"}}>{props.label}</Label>}
                            </>
                        }else if(props.labelAlign === "left"){
                            return <>
                                {props.label && <Label style={{"cursor": "pointer"}}>{props.label}</Label>}
                                {props.children}
                            </>
                        }else{
                            return <div style={{"display":"flex","flexDirection": "column","alignItems": "center"}}>
                                {props.children}
                                {props.label && <Label style={{"fontSize": "10px","cursor": "pointer"}}>{props.label}</Label>}
                            </div>
                        }
                    }else{
                        return <>{props.children}</>
                    }
                   
                })()}
            </IconButton>    
        );
    }else{
        return (
            <BaseButton {...props}>{props.children}</BaseButton>    
        );
    }
    
};

export const CircleButton = function(props) {
    return (
        <CButton {...props}>{props.children}</CButton>    
    );
};

export const Container = function(props) {
    return (
        <BaseContainer {...props}/>
    );
};

export const ListContainer = function(props) {
    return (
        <UlContainer {...props}/>
    );
};

export const Wrapper = function(props) {
    if(props.horizontal){
        return (
            <HWrapper {...props}/>
        );
    }else{
        return (
            <BaseWrapper {...props}/>
        );
    }
};

export const H1 = function(props) {
    return (
        <BaseH1 {...props}/>
    );
};

export const Label = function(props) {
    return (
        <BaseLabel {...props}/>
    );
};

export const Field = function(props) {
    if(props.type==='displayfield'){
        return (
            <FieldWrapper>
                <Label style={{"fontSize": "15px"}} >{props.label+(props.separator?props.separator:':')}</Label>
                <p {...props}>{props.children}</p>
            </FieldWrapper>
        );
    }else{
        return (
            <BaseLabel {...props}/>
        );
    }
};

export const LanguageBtn = function(props) {
    const language = localStorage.getItem("language");
    const changeLanguage = () =>{
        localStorage.setItem("language", language==="en"?"pt":"en");
        window.location.reload(false);
    }
    return <BaseButton style={{"padding":"15px", "fontSize":"15px"}} onClick={changeLanguage} rounded={true} disabled={props.disabled} type={props.type} darkmode={props.darkmode}>{language==="en"?"PT":"EN"}</BaseButton>;
};

export const LanguageSmallBtn = function(props) {
    const language = localStorage.getItem("language");
    const changeLanguage = () =>{
        localStorage.setItem("language", language==="en"?"pt":"en");
        window.location.reload(false);
    }
    return <TextButton onClick={changeLanguage} rounded={true} disabled={props.disabled} type={props.type} darkmode={props.darkmode}>{language==="en"?"PT":"EN"}</TextButton>;
};

export const ScrollDown = function(props) {
    return (
        <ScrollDownContainer scrollNav={props.scrollNav}>
            <ScrollDownWrapper scrollNav={props.scrollNav} big={1}>
                <BsMouse/>
            </ScrollDownWrapper>
            <ScrollDownWrapper animated={1} scrollNav={props.scrollNav} big={0}>
                <IoIosArrowDown/>
            </ScrollDownWrapper>
        </ScrollDownContainer>    
    );
};

export const GoTop = function(props) {
    return (
        <GoTopContainer scrollNav={props.scrollNav}>
            <GoTopWrapper animated={1} scrollNav={props.scrollNav} big={0}>
                <IoIosArrowUp onClick={props.toogleHome}/>
            </GoTopWrapper>
        </GoTopContainer>    
    );
};

export const ProgressBar = function({completed}) {
    const [percentage, setPercentage] = useState(completed);
    useEffect(()=>{
        setPercentage(completed);
    },[completed])
    return (
        <ProgressbarContainer>
            <ProgressbarFiller completed={percentage}>
                {percentage !== 0 && <ProgressbarLabel>{`${percentage}%`}</ProgressbarLabel>}
            </ProgressbarFiller>
      </ProgressbarContainer>
    );
};

export const LoadingBar = function({completed}) {
    const [percentage, setPercentage] = useState(completed);
    useEffect(()=>{
        setPercentage(completed);
    },[completed])
    return (
        <LoadingbarContainer completed={percentage}>
            <LoadingbarFiller completed={percentage}/>
      </LoadingbarContainer>
    );
};

export const FloatingStatus = function({children}) {
    return (
        <FloatingStatusContainer>
            {children}
      </FloatingStatusContainer>
    );
};


