export const Footer = ()=>{
   return(
    <footer className="bg-gray-100 text-gray-700 mt-10">
  <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h2 className="text-xl font-semibold mb-2">Hotel Buenavista</h2>
      <p className="text-sm">
        Experience unique relaxation and comfort in our facilities.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Contact</h3>
      <p className="text-sm">Email: info@hotelparaiso.com</p>
      <p className="text-sm">Phone: +52 55 1234 5678</p>
      <p className="text-sm">Direction: Playa Paraíso, Mexico</p>
    </div>
  </div>

  <div className="text-center py-4 bg-gray-200 text-sm">
    © {new Date().getFullYear()} Hotel Buenavista. All rights reserved.
  </div>
</footer>

   ); 
}