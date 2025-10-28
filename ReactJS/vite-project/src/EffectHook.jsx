import { useEffect } from "react";
function EffectHookExample() {
    useEffect(() => {
        // Side effect logic here
        console.log("Mounted");
        const cnt = setInterval(() => {
            console.log("Interval running");
        }, 1000);
        return () => {
            // Cleanup logic here
            console.log(cnt);
            clearInterval(cnt);
            console.log("Unmounted");
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    return <div>Check the console for effect logs.</div>;
}
export default EffectHookExample;