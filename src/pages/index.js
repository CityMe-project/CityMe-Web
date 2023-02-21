import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import InitialSection from '../Components/InitialSection';
import TeamSection from '../Components/TeamSection';
import Footer from '../Components/Footer';
import PageSection from '../Components/PageSection';



const Home = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = ()  => {
      setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar data={data.navbar} isOpen={isOpen} toggle={toggle}/>
      <Navbar data={data.navbar} toggle={toggle}/>
      <InitialSection data={data.home} outputs={data.survey}/>
      <PageSection data={data.about}/>
      <PageSection data={data.objectives}/>
      <TeamSection data={data.team}/>
      <PageSection data={data.map}/>
      <PageSection data={data.funding}/>
      <PageSection data={data.outputs}/>
      <PageSection data={data.contact}/>
      <Footer data={data.footer}/>
    </>
  )
}

export default Home
