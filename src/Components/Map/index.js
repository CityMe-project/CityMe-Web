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

const Map = forwardRef(({contentType, localedata, status, user, mapValues, setMapValues}, ref) => {
    const [map, setMap] = useState();
    const [question, setQuestion] = useState();
    const [value, setValue] = useState();
    const [feature, setFeature] = useState();
    const popupRef = useRef();
    
    const [popupValues, setPopupValues] = useState();
    const [popupGID, setPopupGID] = useState();

    const editor = useRef();
    const [drawControl, setDrawControl] = useState();
    const [iColor, setIColor] = useState(0);
    const [creating, setCreating] = useState(false);
    let colors = LayersColors;
    
    let drawConfigs = 
    {
      allowIntersection: false, // Restricts shapes to simple polygons
      shapeOptions: {
        clickable: false,
        dashArray: null,
        dashOffset: null,
        fill: true,
        fillColor: null,
        fillOpacity: 0.2,
        fillRule: "evenodd",
        interactive: true,
        lineCap: "round",
        lineJoin: "round",
        noClip: false,
        opacity: 1,
        pane: "overlayPane",
        smoothFactor: 1,
        stroke: true,
        weight: 3
      },
      drawError: {
        color: Burnt, // Color the shape will turn when intersects 
        message: localedata && localedata.errors.intersect // Message that will show when intersect 
      }
    };
    
    const MapEnableWidget = (question, type) => {
      if (type === "polygon") {
        drawControl._toolbars.draw._modes.polygon.handler.options.shapeOptions.color = colors[parseInt(question.order)-1];
        drawControl._toolbars.draw._modes.polygon.handler.enable();
      }else if(type === "rectangle"){
        drawControl._toolbars.draw._modes.rectangle.handler.options.shapeOptions.color = colors[parseInt(question.order)-1];
        drawControl._toolbars.draw._modes.rectangle.handler.enable();
      }else if(type === "edit"){ 
        drawControl._toolbars.edit._modes.edit.handler.enable();
      }else if(type === "editsave"){
        drawControl._toolbars.edit._modes.edit.handler.save();
        drawControl._toolbars.edit._modes.edit.handler.disable();
      }else if(type === "editcancel"){
        if(editor.current._layers && Object.keys(editor.current._layers).length !== 0){
          drawControl._toolbars.edit._modes.edit.handler.revertLayers();
        }
        drawControl._toolbars.edit._modes.edit.handler.disable();
      }else if(type === "remove"){
        drawControl._toolbars.edit._modes.remove.handler.enable();
      }else if(type === "removesave"){
        drawControl._toolbars.edit._modes.remove.handler.save();
        drawControl._toolbars.edit._modes.remove.handler.disable();
      }else if(type === "removecancel"){
        if(editor.current._layers && Object.keys(editor.current._layers).length !== 0){
          drawControl._toolbars.edit._modes.remove.handler.revertLayers();
        }
        drawControl._toolbars.edit._modes.remove.handler.disable();
      }
      setQuestion(question);
    }
    
    useImperativeHandle(ref, (abc) => ({
      setQuestion(q, v) {
        setQuestion(q);
        setValue(v);
      },
      EnableWidget(question, type) {
        MapEnableWidget(question, type);
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

    const onMounted = (drawControl) => {
      setDrawControl(drawControl);
      drawControl._container.style.display = "none";
    }
 
    const onCreated = (f) => {
      status.show(statusType.info, localedata.context.creatinggeometry, 0, true);
      setCreating(true);
      let json = f.layer.toGeoJSON();
      json.type = "create";
      setFeature(json);
    }
    
    const onEdited = (e) => {
      let f = {type:"edit", records:[]};
      e.layers.eachLayer((l) =>{
        f.records.push(l.toGeoJSON());
      });
      setFeature(f);
    }

    const onDeleted = (e) => {
      let f = {type:"remove", records:[]};
      e.layers.eachLayer((l) =>{
        f.records.push(l.toGeoJSON());
      });
      setFeature(f);
    }

    useEffect(()=> {
      if(value){
        clearLayer();
        //TODO edit the geometry not delete
        for (let oi = 0; oi < value.options.length; oi++) { 
          for (let gi = 0; gi < value.options[oi].geometries.length; gi++) { 
            let o = value.options[oi];
            let g = o.geometries[gi];
            let gjson = {
              type:"Feature",
              properties:{answer_id: o.answer_id,option: o.option, geometryid:g.geometry_id, tags:g.tags},
              geometry:JSON.parse(value.options[oi].geometries[gi].geom)
            }
            
            let geom =new geoJson(gjson).getLayers()[0];
            geom.options.color = colors[iColor];
            geom.on("click", function(e){
              setPopupValues(g.tags);setPopupGID(g.geometry_id);
            });
            editor.current.addLayer(geom);
            
            if(gi === value.options[oi].geometries.length-1 && creating){
              setCreating(false);
              setPopupValues(g.tags);
              setPopupGID(g.geometry_id);
              geom.bindPopup(popupRef.current).openPopup();
            }
          }          
        }
      }
    }, [value, colors, iColor]);

    useEffect(() => {
      if(question){
        setIColor(parseInt(question.order)-1);
      }
      if(popupRef.current){
        popupRef.current.remove();
      }
      if(drawControl){
        drawControl._toolbars.edit._modes.edit.handler.disable();
      }
    }, [question, drawControl]);

    useEffect(()=> {
      const config = {
        headers: user && user.token && { Authorization: `Bearer ${user.token}` }
      };

      function set(data) {
        setMapValues(state => {
          let index = state.findIndex(r => r.question === question.question_id);
          if(index === -1){
              index = 0;
              return [...state, {question: question.question_id, options: [
                {
                  answer_id: data.answer_id, 
                  option: data.option_id, 
                  geometries: [{geometry_id: data.geometry_id, geom: data.geom, tags: data.tags}]
                }
              ]}];
          }else{
              return state.map(item => {
                  if(item.question === question.question_id){
                      if(item.options.find(r => r.option === data.option_id)){
                          return {...item, options: item.options.map(r => {
                            if(data.edited){
                              return {...r, geometries:r.geometries.map(g => {
                                if(g.geometry_id === data.geometry_id){
                                  return {...g, geom:data.geom, tags:data.tags};
                                }
                                return g;
                              })};
                            }else if(data.removed){
                              let newgeoms = r.geometries.filter(r => r.geometry_id !== data.geometry_id);
                              return {...r, geometries: newgeoms};
                            } else if(r.option === data.option_id){
                              return {...r, answer_id: data.answer_id, geometries:[...r.geometries, {geometry_id:data.geometry_id,geom:data.geom,tags:data.tags}]}; 
                            } 
                            return r;
                          })};;
                      }
                      return {...item, options: [...item.options, data]};
                  }
                  else{
                      return item;
                  }
              });
          }
        });
        setFeature(null);
      }

      function setBatch(data, type) {
        for (let index = 0; index < data.records.length; index++) {
          const element = data.records[index];
          if(type ==="edited"){
            element.edited = true;
          }else if(type ==="removed"){
            element.removed = true;
          }
          set(element);
        }
      }
      
      async function setGeometry(data) {
        await axios.post(
        configs.apiUrl+"/geometries", data, config
        ).then(function (response) {
          set(response.data[0]);
          status.show(statusType.success, localedata.context.geometrycreated);
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
          status.show(statusType.error, localedata.errors.creatinggeometry);
        });
      }

      async function editGeometry(data) {
        await axios.post(
        configs.apiUrl+"/geometries/updatebatch", data, config
        ).then(function (response) {
          setBatch(response.data, "edited");
          status.show(statusType.success, localedata.context.geometriesedited);
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
          status.show(statusType.error, localedata.errors.editinggeometries);
        });
      }
      
      async function removeGeometry(data) {
        await axios.post(
        configs.apiUrl+"/geometries/deletebatch", data, config
        ).then(function (response) {
          setBatch(response.data, "removed");
          status.show(statusType.success, localedata.context.geometriesremoved);
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
          status.show(statusType.error, localedata.errors.removinggeometries);
        });
      }

      if(feature){
        if(feature.type==="create"){
          setGeometry({option_id:question.options[0].option_id, geom:JSON.stringify(feature.geometry)});
        }
        else if(feature.type==="edit"){
          let records = feature.records.map((r) =>{
              return {geometry_id:r.properties.geometryid, geom:JSON.stringify(r.geometry)};
          });
          if(records.length > 0){
            status.show(statusType.info, localedata.context.editinggeometries, 0, true);
            editGeometry(records);
          }else{
            status.show(statusType.warning, localedata.context.nothing);
          }
        }
        else if(feature.type==="remove"){
          let records = feature.records.map((r) =>{
            return {geometry_id:r.properties.geometryid};
          });
          if(records.length > 0){
            status.show(statusType.info, localedata.context.removinggeometries, 0, true);
            removeGeometry(records);
          }else{
            status.show(statusType.warning, localedata.context.nothing);
          }
        }
      }
    }, [feature, question, user, setMapValues, localedata]);
    
    const whencreated = (map) => {
      setMap(map);
      map.zoomControl._container.style.display = "none";
      L.drawLocal.draw.handlers.polygon.tooltip = {
        start: localedata&&localedata.handlers.polygon.start,
        cont: localedata&&localedata.handlers.polygon.cont,
        end: localedata&&localedata.handlers.polygon.end,
      };
      L.drawLocal.draw.handlers.rectangle.tooltip = {
        start: localedata&&localedata.handlers.rectangle.start,
      };
      L.drawLocal.edit.handlers.edit.tooltip = {
        text: localedata&&localedata.handlers.edit.text,
        subtext: localedata&&localedata.handlers.edit.subtext
      };
      L.drawLocal.edit.handlers.remove.tooltip = {
        text: localedata&&localedata.handlers.remove.text
      };
      L.drawLocal.draw.handlers.simpleshape.tooltip = {
        end: localedata&&localedata.handlers.simpleshape.end 
      };
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
            <EditControl
              onMounted={onMounted}
              position={'topright'}
              onEdited={onEdited} 
              onCreated={onCreated} 
              onDeleted={onDeleted} 
              edit={{
                    allowIntersection: false,
                    edit: true,
                    remove: true,
                }}
                draw={{
                  circle: false,
                  polyline: false,
                  circlemarker: false,
                  marker: false,
                  rectangle: drawConfigs,
                  polygon: drawConfigs
              }}/>
                <RLPopup ref={popupRef} maxWidth="500" maxHeight="auto" ><Popup data={localedata && localedata.tags} user={user} setMapValues={setMapValues} geometry_id={popupGID} values={popupValues}></Popup></RLPopup>
              </FeatureGroup>}
        </MapContainer>
    )
});

export default Map
