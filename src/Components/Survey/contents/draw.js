import axios from 'axios';
import {React, useEffect, useState} from 'react';
import { configs } from '../../../Data';
import { Platinum } from '../../Colors';
import { GeometryList, H1, ProgressBar, SubSection } from '../../Inputs';

//https://www.digitalocean.com/community/tutorials/react-tabs-component
//https://dev.to/vponamariov/18-cards-with-form-design-tips-2dh6
//https://blog.prototypr.io/8-rules-for-perfect-form-design-4da09b0cc79

function DrawForm({user, localedata, data, get, mask, map, mapValues, setMapValues, mapController, setMapController, status, setDrawIsValid,
    globalProgressIncrease, globalProgressDecrease, children}) {
    const [language] = useState(localStorage.getItem("language")?localStorage.getItem("language"):"en");
    const [fData, setFData] = useState();
    const [section_id] = useState("9f11e6dd-dc6f-4735-b4ad-3be4952ac61c");
    const [percentage, setPercentage] = useState(0);

    useEffect(()=> {
        mask(true);
        const config = {
         headers: { Authorization: `Bearer ${user.token}` }
        };

        async function getdata() {
            await axios.get(
                configs.apiUrl+"/sections/"+section_id, config
            ).then(function (response) {
                if(response.data.length > 0){
                setFData(response.data[0]);
                }
            }).catch(function (error) {
                console.log(error);
            }).finally(function(e){
                mask(false);
            });
        }
        
        async function getGeometries() {
            await axios.get(
                configs.apiUrl+"/geometries/survey", config
            ).then(function (response) {
            if(response.data){
                let answers = [];
                for (let record in response.data) {
                    let q = response.data[record];
                    let f = answers.find(r => r.question === record);
                    if(!f){
                        answers.push({question:record,options:[]});
                        f = answers.find(r => r.question === record);
                    }
                    for(let i=0; i< q.length; i++){
                        let o = f.options.find(r => r.option === q[i].option_id);
                        if(!o){
                            f.options.push({answer_id: q[i].answer_id,option:q[i].option_id,geometries:[{geometry_id:q[i].geometry_id,geom:q[i].geom,tags:q[i].tags}]});
                        }else{
                            o.geometries.push({geometry_id:q[i].geometry_id,geom:q[i].geom,tags:q[i].tags});
                        }
                    }
                }
                setMapValues(answers);
            }
            mask(false);
            }).catch(function (error) {
            mask(false);
            });
        }
        getdata();
        getGeometries();
    }, [mask, user, section_id, setMapValues]);

    useEffect(()=> {
        if(mapValues){
            let valid = mapValues.map((r) =>{
                return r.options[0].geometries.length > 0
            });
            let t = valid.filter(Boolean).length;
            setPercentage(t*100/10);
            if(t*100/10 === 100){
                setDrawIsValid(true);
            }else{
                setDrawIsValid(false);
            }
        }
    }, [mapValues, setDrawIsValid]);
    
    return (
            <>
                {fData && <><H1 style={{"fontSize": "30px","padding":"10px 0", "color":Platinum}}>{language === "pt"?fData.title_pt:fData.title}</H1><ProgressBar completed={percentage}/></>}
                    {fData && fData.subsections.map((item,i) => {
                        return <SubSection style={{"paddingTop":"10px"}} sub_section_id={item.sub_section_id} key={'test'+i}>{/*<Subtitle>{item.title}</Subtitle><MainText>{Parser("asdasd")}</MainText>*/}
                            <GeometryList
                                data={localedata}
                                pitems={item.questions}
                                map={map}
                                status= {status}
                                values={mapValues}
                                setValues={setMapValues}
                                onChange={(selected) => {map.setQuestion(selected)}}
                                language={language}
                                globalProgressIncrease={globalProgressIncrease}
                                globalProgressDecrease={globalProgressDecrease}
                            />
                        </SubSection>
                    })}
            </>
    )
}


export default DrawForm