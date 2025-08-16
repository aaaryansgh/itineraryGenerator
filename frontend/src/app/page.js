"use client"
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import ItineraryDisplay from './itineraryDisplay'

const page = () => {
  const [destination, setDestination] = useState("");
    const [days, setDays] = useState(3);
    const [interest, setInterest ] = useState("");
    const [budget, setBudget]=useState("");
    const [itinerary, setItinerary] = useState("");
    const [loading, setLoading] = useState(false);
    const generateItinerary = async () => {
    setLoading(true);
    const res = await axios.post("https://itinerarygenerator-backend.onrender.com/generate-itinerary", {
      destination,
      days,
      interest,
      budget,
    },{withCredentials: true});
    setItinerary(res.data);
    setLoading(false)
  };
  return (
    <div className='flex flex-col items-center gap-2 justify-center min-h-screen'>
      <h1 className='text-3xl font-bold'>AI Travel Itinerary Planner</h1>
      <input className='border-1 border-black p-2 rounded-lg' placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <input className='border-1 border-black p-2 rounded-lg' type="number" value={days} onChange={(e) => setDays(e.target.value)} />
      <input className='border-1 border-black p-2 rounded-lg' placeholder="Preferences" value={interest} onChange={(e) => setInterest(e.target.value)} />
      <input className='border-1 border-black p-2 rounded-lg' placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
      <button className='bg-black text-white p-2 rounded-lg' onClick={generateItinerary}>{loading ? "Generating..." : "Generate Itinerary"}</button>
      {itinerary && (
        <div className="mt-4 p-4 border">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Your Travel Itinerary</h2>
          <p className="text-lg text-gray-800 mb-2">
            <strong>Destination:</strong> {destination}
          </p>
          <p className="text-lg text-gray-800 mb-2">
            <strong>Days:</strong> {days}
          </p>
          <p className="text-lg text-gray-800 mb-2">
            <strong>Interests:</strong> {interest}
          </p>
         
         {itinerary && <ItineraryDisplay itinerary={itinerary} />}
          
        </div>
        
      )}
    </div>
  )
}

export default page
