import { useState } from "react";
function ToggleByButton() {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled((prev) => !prev);
    };

    return (
        <div>
            {isToggled ? (
                <button onClick={handleToggle} className="bg-amber-400 rounded-2xl m-16 p-3">
                    ON
                </button>
            ) : (
                <button onClick={handleToggle} className="bg-red-400 rounded-2xl m-16 p-3">
                    OFF
                </button>
            )}
        </div>
    );
}

export default ToggleByButton;
