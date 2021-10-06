import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="h-full flex flex-col justify-between items-center">
            <h1>Logo</h1>
            <div>
                <Link to="/login">
                    <button className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 mb-4 font-bold">Login</button>
                </Link>
                <Link to="/register">
                    <button className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 font-bold">Registration</button>
                </Link>
            </div>
            <Link to="/admin">
                <button className="h-10 px-5 text-gray-800 transition-colors duration-150 bg-gray-200 rounded-lg focus:shadow-outline hover:bg-white font-bold">Admin</button>
            </Link>
        </div>
        
    )
}

export default Home