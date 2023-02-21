import React from 'react'
import Parser from 'html-react-parser';
import { ContentWrapper, MainText, ScrollbarWrapper, Subtitle} from '../SurveyElements'

function SurveyHome(props) {
  return (
      <ContentWrapper style={{"display": "flex","flexDirection": "column"}}>
      <ScrollbarWrapper style={{"paddingLeft":"8px","borderWidth": "0px"}}>
      { props.data.map((item,i) => {
        return <div key={'surveyhome'+i}><Subtitle style={{"paddingTop": "5px"}} >{Parser(item.Subtitle)}</Subtitle><MainText style={{"padding": "5px 0"}}>{Parser(item.MainText)}</MainText></div>
      })}
      </ScrollbarWrapper>
      </ContentWrapper>
  )
}

export default SurveyHome
