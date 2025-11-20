import { useContext } from "react";
import ThemeContext from "./component/ThemeContext.jsx";

export default function Home() {
    const {theme , setTheme} = useContext(ThemeContext);
    
    return (
        <div className={theme === 'light' ? 'bg-white text-black min-h-screen flex flex-col justify-center items-center' : 'bg-gray-800 text-white min-h-screen flex flex-col justify-center items-center'}>
            <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
            <p className="text-lg mb-6">This is a simple React application demonstrating Context API for theme management.</p>
            <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
                className={theme === 'light' ? 'bg-gray-800 text-white px-4 py-2 rounded' : 'bg-white text-black px-4 py-2 rounded'}
            >
                Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>
        </div>
    );
}