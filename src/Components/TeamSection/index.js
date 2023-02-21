import React, { useState } from 'react';
import {PersonCard, PersonH2, PersonP, PersonPhoto, TeamContainer, TeamWrapper } from './TeamElements';
import { PageWrapper, Subtitle, Title, TitleWraper } from '../PageSection/PageElements';

const TeamSection = (sectionData) => {
    const [data] = useState(sectionData.data);
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    
  return (
    <>
      <TeamContainer darkmode={data.style.darkMode?1:0} id={data.controller.id}>
          <PageWrapper>
            <TitleWraper>
            {
                (() => {
                    if (data.title) {
                        return <Title darkmode={data.style.darkMode?1:0}>{data.title}</Title>
                    }
                })()
            }
            {
                (() => {
                    if (data.subtitle) {
                        return  <Subtitle darkmode={data.style.darkMode?1:0}>{data.subtitle}</Subtitle>
                    }
                })()
            }
            </TitleWraper>
            <TeamWrapper>
                {data.persons.map((person,i) => {
                    return <PersonCard onClick={()=> person.url?openInNewTab(person.url):false} darkmode={data.style.darkMode?1:0} key={'person'+i}>
                        <PersonPhoto src={person.img}></PersonPhoto>
                        <PersonH2 darkmode={data.style.darkMode?1:0}>{person.name}</PersonH2>
                        <PersonP darkmode={data.style.darkMode?1:0}>{person.role}</PersonP>
                        <PersonP bold={1} darkmode={data.style.darkMode?1:0}>{person.local}</PersonP>
                    </PersonCard>
                })}
            </TeamWrapper>
          </PageWrapper>
      </TeamContainer>
    </>
  )
}

export default TeamSection
