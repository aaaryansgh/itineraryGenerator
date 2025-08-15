import React from 'react'

const ItineraryDisplay = ({itinerary}) => {
  return (
    <div>
        <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {itinerary.destination} {itinerary.days.length}-Day Itinerary
      </h1>
      <p className="text-center text-lg mb-6">Budget: {itinerary.budget}</p>

      {itinerary.days.map((day, index) => (
        <section key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">{day.title}</h2>
          <div className="space-y-2">
            <p><strong>Morning ☀️</strong><br/>{day.morning.join(" • ")}</p>
            <p><strong>Afternoon 🍽️</strong><br/>{day.afternoon.join(" • ")}</p>
            <p><strong>Evening 🌆</strong><br/>{day.evening.join(" • ")}</p>
          </div>
        </section>
      ))}

      {/* Budget Table */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Estimated Budget</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">€</th>
              <th className="border px-4 py-2">₹</th>
            </tr>
          </thead>
          <tbody>
            {itinerary.budgetBreakdown.map((item, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{item.category}</td>
                <td className="border px-4 py-2">{item.eur}</td>
                <td className="border px-4 py-2">{item.inr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Tips */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
        <p className="font-semibold flex items-center gap-2"> Do’s</p>
        <ul className="list-disc list-inside">
          {itinerary.dos.map((tip, idx) => <li key={idx}>{tip}</li>)}
        </ul>
      </div>
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <p className="font-semibold">❌ Don’ts</p>
        <ul className="list-disc list-inside">
          {itinerary.donts.map((tip, idx) => <li key={idx}>{tip}</li>)}
        </ul>
      </div>
    </div>
    </div>
  )
}

export default ItineraryDisplay


