import React from 'react'
import { Button } from '../../Inputs'
import { ContentWrapper, MainText, Subtitle} from '../SurveyElements'
import Parser from 'html-react-parser';

function SurveySubmit({onSubmit, data}) {
  const submit = (e) =>{
    onSubmit(e);
  }
  return (
    <ContentWrapper style={{"display": "flex","flexDirection": "column","justifyContent": "space-evenly","alignItems": "center"}}>
      <Subtitle>{Parser(data.title)}</Subtitle>
      <MainText>{Parser(data.midtext)}</MainText>
      <MainText>{Parser(data.endtext)}</MainText>
      <Button onClick={submit}>{data.btntext}</Button>
    </ContentWrapper>
  )
}

export default SurveySubmit
