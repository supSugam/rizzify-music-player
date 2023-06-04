import React, { useEffect,useRef } from 'react';
import{SlVolumeOff,SlVolume1,SlVolume2} from 'react-icons/sl';

interface VolumeBarProps {
  value: number;
  min: number;
  max: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const VolumeBar:React.FC<VolumeBarProps> = ({ value, min, max, onChange, setVolume }) =>{

  const volumeBarRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if(volumeBarRef.current){
      volumeBarRef.current.style.setProperty('--progress',`${((value) / max) * 100}%`);
    }
  }, [value]);

return(
  <div className="hidden lg:flex flex-1 items-center justify-end">
    {value <= 1 && value > 0.6 && <SlVolume2 className='cursor-pointer hover:scale-105 transition-all duration-75' size={25} color="#FFF" onClick={() => setVolume(0)} />}
    {value <= 0.6 && value > 0 && <SlVolume1 className='cursor-pointer hover:scale-105 transition-all duration-75' size={25} color="#FFF" onClick={() => setVolume(0)} />}
    {(value === 0|| value <=0.01) && <SlVolumeOff className='cursor-pointer hover:scale-105 transition-all duration-75' size={25} color="#FFF" onClick={() => setVolume(0.5)} />}
    <input
      ref={volumeBarRef}
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className="relative 2xl:w-40 lg:w-32 md:w-32 h-1 ml-2 rounded-lg cursor-pointer outline-none volume--progress"
    />
  </div>
)
};

export default VolumeBar;
