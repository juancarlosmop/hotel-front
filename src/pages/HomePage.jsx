import { Link } from "react-router-dom";

export const HomePage=()=>{
    return(
        <>
            <section
            className="h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')"
              }}
            >
            <div className="bg-black bg-opacity-60 p-10 rounded-xl text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">Welcom to Hotel Buenavista</h1>
                <p className="text-xl mb-6 text-white">Your rest starts here</p>
                <Link
                 to="/rooms"
                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-300 transition"
                >
                Book Now
                </Link>
            </div>
            </section>
            <section className="bg-white text-gray-800 py-16 px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Exclusive services</h2>
            <p className="max-w-2xl mx-auto">
                Enjoy our comfortable rooms, luxury spa, panoramic pool, and personalized service so you can have an unforgettable experience.
            </p>
            </section>
         </>
    )

};