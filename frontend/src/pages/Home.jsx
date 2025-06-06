import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import WelcomeBanner from '../components/WelcomeBanner'
import FacilitiesSection from '../components/FacilitiesSection'

const Home = () => {
  return (
    <div>
      <Header/>
      <WelcomeBanner/>
      <SpecialityMenu/>
      <FacilitiesSection/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home