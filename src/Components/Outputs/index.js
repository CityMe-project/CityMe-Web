/*

var Jawg_Matrix = L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	subdomains: 'abcd',
	accessToken: '<your accessToken>'
});
*/

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Popup as RLPopup, FeatureGroup, MapContainer} from 'react-leaflet' ;
import { geoJson } from "leaflet";
import { EditControl } from "react-leaflet-draw" ;
import '../../../node_modules/leaflet-draw/dist/leaflet.draw.css';
import { Burnt, LayersColors } from '../Colors';
import axios from 'axios';
import { configs } from '../../Data';
import { Popup } from '../Inputs';
import { statusType } from '../Status';
import * as L from 'leaflet';
import VectorTileLayer from 'react-leaflet-vector-tile-layer';

const center = [38.7254, -9.1581 ];
const zoom = 14.3;

const Outputs = forwardRef(({contentType, localedata, status, user, mapValues, setMapValues}, ref) => {
    const [map, setMap] = useState();
    const [survey, setSurvey] = useState();
    const [value, setValue] = useState();
    const popupRef = useRef();
    
    const [popupValues, setPopupValues] = useState();
    const [popupGID, setPopupGID] = useState();

    const editor = useRef();
    const [drawControl, setDrawControl] = useState();
    const [iColor, setIColor] = useState(0);
    const [creating, setCreating] = useState(false);
    let colors = LayersColors;
    
    
    useImperativeHandle(ref, (abc) => ({
      setSurvey(survey) {
        popupRef.current.remove();
        setSurvey(survey);
      },
      clearLayer() {
        clearLayer();
      },
      showZoom() {
        if(map){
          map.zoomControl._container.style.display = "block";
        }
      },
      hideZoom() {
        if(map){
          map.zoomControl._container.style.display = "none";
        }
      }
    }));
    
    const clearLayer = () => {
      editor.current && editor.current.eachLayer(function(feature){
        feature.remove();
      });
    }


    useEffect(()=> {
      if(survey){
        console.log("worked", survey);
        survey.map((r, i) => {
          let gjson = {
            type:"Feature",
            properties:{answer_id: r.answer_id,option: r.option, geometryid:r.geometry_id, tags:r.tags},
            geometry:JSON.parse(r.geom)
          }
          
          let geom =new geoJson(gjson).getLayers()[0];
          geom.options.color = colors[r.question_order-1];
          geom.on("click", function(e){
            setPopupValues(r.tags);
            setPopupGID(r.geometry_id);
          });
          editor.current.addLayer(geom);
      })
      }
    }, [survey]);



    const whencreated = (map) => {
      setMap(map);
      map.zoomControl._container.style.display = "none";
    } 

    return (
      <MapContainer
          center={center}
          zoom={zoom}
          zoomControl={1}
          style={{ height: '100vh', width: '100wh' }}
          whenCreated={whencreated}>
          <VectorTileLayer
            //https://stadiamaps.com/
            //http://openstreetmap.org
            //styleUrl="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?access-token=31e9160a-24d6-49d1-9d53-1c268fe0ef45"
            //styleUrl="https://tiles.stadiamaps.com/styles/alidade_smooth.json"
            styleUrl="/data/alidade_smooth.json"
          />
         {map && 
          <FeatureGroup ref={editor} q={"question"}>
              <RLPopup ref={popupRef} maxWidth="500" maxHeight="auto" ><Popup mode={'view'} data={localedata && localedata.tags} user={user} setMapValues={setMapValues} geometry_id={popupGID} values={popupValues}></Popup></RLPopup>
            </FeatureGroup>
        }
        </MapContainer>
    )
});

export default Outputs
