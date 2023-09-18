import './App.css'
import SidePanel from './comopnents/SidePanel'
import HotelContent from './comopnents/HotelContent'

function App() {

  return (
    <div className='flex flex-col min-h-screen m-4'>
      <div className="w-screen">
        <button className='text-[#895e95] flex flex-row text-[14px] hover:underline'>
          <div className="rounded-full bg-[#895e95] flex pl-[2.5px] pt-[0px] h-[14px] w-[14px] text-white text-[10px] mr-[8px] mt-1">&#x2190;</div>
          SEE ALL LAS VEGAS HOTELS
        </button>
      </div>
      <div className="flex flex-row my-6">
        <SidePanel />
        <div className="mx-6">
          <HotelContent />
        </div>
      </div>
    </div>
  )
}

export default App
