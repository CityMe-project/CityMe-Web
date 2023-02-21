import React from 'react'
import Survey from '../Components/Survey'

const SurveyPage = (props) => {
  return (
    <>
      <Survey data={props.data.survey}/>
    </>
  )
}

export default SurveyPage
