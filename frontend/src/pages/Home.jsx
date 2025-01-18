import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {

  const [ pickup, setPickup ] = useState ('')
  const [ destination, setDestination ] = useState('')
  const [panelOpen, setpanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [ vehiclePanel, setVehiclePanel ] = useState(false)
  const vehiclePanelRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
  const [ vehicleFound, setVehicleFound ] = useState(false)
  const [ waitingForDriver, setWaitingForDriver ] = useState(false)



  
  const submitHandler = (e) => {
    e.preventDefault()
  }

  // for location panel
  useGSAP(function () {
    if (panelOpen) {
        gsap.to(panelRef.current, {
            height: '65%',
            padding: 24
            // opacity:1
        })
        gsap.to(panelCloseRef.current, {
            opacity: 1
        })
    } else {
        gsap.to(panelRef.current, {
            height: '0%',
            padding: 0
            // opacity:0
        })
        gsap.to(panelCloseRef.current, {
            opacity: 0
        })
    }
  }, [ panelOpen ])


  // for vehicle panel
  useGSAP(function () {
    if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
  }, [ vehiclePanel ])


  // for confirm ride panel
  useGSAP(function () {
    if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(confirmRidePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
  }, [ confirmRidePanel ])


  // for vehicle found panel
  useGSAP(function () {
    if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(vehicleFoundRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ vehicleFound ])


  // for waiting for driver panel
  useGSAP(function () {
    if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(100%)'
        })
    }
  }, [ waitingForDriver ])


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className= 'absolute top-5 left-5 w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>

        <div className='h-[35%] p-6 bg-white relative'>

          <h5 ref={panelCloseRef} onClick={() => {
              setpanelOpen(false)
              }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className='text-2xl font-semibold'>Find a trip</h4>

          <form className='relative py-3' onSubmit={(e) => {
            submitHandler(e)
          }}>
              
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            
            <input 
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full' 
              type="text"
              onClick={() => {
                setpanelOpen(true)
              }}
              onChange={(e) => {
                setPickup(e.target.value)
              }} 
              placeholder='Add a pick-up location' 
            />
            <input 
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3' 
                type="text" 
                onClick={() => {
                setpanelOpen(true)
                }}
                onChange={(e) => {
                  setDestination(e.target.value)
                }}
                placeholder= 'Enter your destination' 
              />
          </form>
          <button
            className='bg-black text-white px-4 py-2 rounded-lg w-full'>
            Find Trip
          </button>

        </div>


        <div ref={panelRef} className='bg-white h-0' >
          <LocationSearchPanel
            setPanelOpen={setpanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
          />
        </div>

        <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
            <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
        </div>


        <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <ConfirmRide
            pickup={pickup}
            destination={destination}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>


        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            setVehicleFound={setVehicleFound}
          />
        </div>

        <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <WaitingForDriver
            setVehicleFound={setVehicleFound}
            setWaitingForDriver={setWaitingForDriver}
            waitingForDriver={waitingForDriver} 
          />
        </div>


      </div>

    </div>
  )
}

export default Home