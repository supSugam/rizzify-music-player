import React,{useRef,useEffect} from 'react';

interface SeekbarProps {
  value: number;
  min: number;
  max: number;
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  playerExpanded?: boolean;
}

const Seekbar:React.FC<SeekbarProps> = ({ value, min, max, onInput,playerExpanded}) => {
  // converts the time to format 0:00
  const getTime = (time:number) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(progressBarRef.current){
      progressBarRef.current.style.setProperty('--progress',`${((value) / max) * 100}%`);
    }
  }, [value]);

  if(!playerExpanded){
    return (
    <div className="absolute w-full bottom-0 left-0 sm:relative flex flex-row items-center">
      {/* <button type="button" onClick={() => setSeekTime(appTime - 5)} className="hidden lg:mr-4 lg:block text-white">
        -
      </button> */}
      <p className="hidden sm:block text-white text-sm opacity-80 min-w-[2.25rem]">{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        ref={progressBarRef}
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="relative md:block w-full sm:w-24 lg:w-[30rem] md:w-[20rem] 2xl:w-96 mx-4 2xl:mx-6 rounded-lg h-1 cursor-pointer outline-none song--progress"
      />
      <p className="hidden sm:block text-white text-sm opacity-80 min-w-[2.25rem]">{max === 0 ? '0:00' : getTime(max)}</p>
      {/* <button type="button" onClick={() => setSeekTime(appTime + 5)} className="hidden lg:ml-4 lg:block text-white">
        +
      </button> */}
    </div>
  );
    }

    if(playerExpanded){
      return(
      <div className=" sm:flex flex-col items-center px-3">
              <input
        ref={progressBarRef}
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        id='expandedSeekbar'
        // md:block w-24 lg:w-[30rem] md:w-[20rem] 2xl:w-96 mx-4 2xl:mx-6
        className="relative w-full rounded-lg h-1 cursor-pointer outline-none song--progress thumb--visible"
      />
      </div>
      )
    }
    return <></>
};

export default Seekbar;
