import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";


function Homepage() {

  return (
   <div className="flex sm:h-[450px] md:h-[550px] lg:w-[90%] lg:h-[90%]  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
    <Sidebar/>
    <MessageContainer/>
   </div>
  );
}

export default Homepage;
