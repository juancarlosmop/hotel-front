export const  NotAuthorized=()=> {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
          <h1 className="text-4xl font-bold text-red-600 mb-4">403 – Unauthorized</h1>
          <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back
          </a>
        </div>
      </div>

    );
}