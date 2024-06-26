import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { NavLink,Link } from 'react-router-dom'
import Logo from './Logo'
import {links} from '../assets/constants'
import { ReactSVG } from 'react-svg'
import Tilt from "react-parallax-tilt"
import { useDispatch } from 'react-redux'
import { toggleInfoModal, toggleModal } from '../redux/features/playerSlice'

import {AiOutlineClose,AiOutlineMenu,AiOutlinePlus,AiFillHeart} from 'react-icons/ai'
import {IoLibrary} from 'react-icons/io5'
import Sky from '../assets/skyy.jpg'
import zZz from '../assets/zZz.jpeg'

// interface NavBarIconProps{
//   icons:{
//     pageActive:any,
//     pageInactive:any
//   };
//   isActive:boolean;
//   forMobile:boolean;
// }
// const NavBarIcon:React.FC<NavBarIconProps> = ({icons,isActive,forMobile}) => {
//   return(
//     <ReactSVG className="text-[1.6rem] text-[var(--primary-grey)] group-hover:text-white transition-all duration-150"
//     src={isActive ? icons.pageActive : icons.pageActive}
// />
//   )
// }
interface NavLinksProps{
  forMobile?:boolean;
  forMobileSidebar?:boolean;
  handleClick?:()=>void;
}
const NavLinks:React.FC<NavLinksProps> = ({forMobile,forMobileSidebar,handleClick,}) => {

  const {likedSongs, isModalOpen,isInfoModalOpen } = useSelector((state: any) => state.player);

	const dispatch = useDispatch();

	const handleInfoModal = ():void => {
    handleClick && handleClick()
		dispatch(toggleInfoModal(!isInfoModalOpen));
		dispatch(toggleModal(!isModalOpen));
	};
  // For Differnt Icons (Depcrecated for now)
  // const navLinksRef = React.useRef<HTMLDivElement>(null);
  // const [activeLink, setActiveLink] = useState<HTMLAnchorElement|undefined>();
  // useEffect(() => {
  //   if(navLinksRef.current){
  //     const navLinks = Array.from(navLinksRef.current?.children) as HTMLAnchorElement[];
  //     const activeLink = navLinks.find((link)=>link.classList.contains('active'));
  //     setActiveLink(activeLink);
  //   }
  // }, []);

  // const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   setActiveLink(e.currentTarget);
  // };

  if(!forMobile && !forMobileSidebar){
    return (
      <div className='mt-10 ml-2 flex flex-col gap-6'>
        {links.map((item) =>(
          <NavLink
            key={item.name}
            to={item.to}
            className='flex items-center gap-4 text-[var(--primary-grey)] text-[1.2rem] font-semibold hover:text-white group'
          >

          <ReactSVG className="text-[1.6rem] text-[var(--primary-grey)] group-hover:text-white transition-all duration-150" src={item.icon}/>
          {item.name}
          </NavLink>
        )
        )}
      </div>
    )
  }
  if(forMobileSidebar){
    return(
      <>
      <div className='ml-2 mt-2 mr-4 flex flex-col gap-2 text-[1.2rem] font-semibold rounded-lg bg-[#121212]'>
      {
        links.map((item) =>(
        <NavLink key={item.name} to={item.to} onClick={()=> handleClick && handleClick()} className='flex flex-row justify-start text-[var(--primary-grey)] items-center gap-4 min-h-[3.6rem] pl-3'>
          <ReactSVG className="text-[1.6rem] text-[var(--primary-grey)]  transition-all duration-150" src={item.icon}/>
            {item.name}
          </NavLink>
        ))
      }
      </div>
      {/* Just for View (for now) */}
      <div className='ml-2 mr-4 flex-1 mb-3 px-3 py-5 flex flex-col gap-2 text-lg rounded-lg bg-[#121212] overflow-hidden'>
        <div className='flex gap-4 items-center text-[var(--primary-grey)]'>
          <IoLibrary className=' text-[1.6rem]'/>
          <h3 className='text-[1.3rem] pt-[0.3rem] font-semibold'>Your Library</h3>
          <button onClick={handleInfoModal}>

          <AiOutlinePlus className='ml-auto mt-auto text-[1.6rem]'/>
          </button>
        </div>
        {/*  */}
        <div className='mt-5 flex flex-col gap-4  overflow-y-scroll hide-scrollbar'>
          <Link to={"/"} className='flex gap-5 items-center active:bg-opacity-20'>
            <div className='w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-md bg-primary-gradient'>
              <AiFillHeart/>
            </div>
            <Link onClick={()=> handleClick && handleClick()} to={'/liked-songs'} className='flex flex-col gap-1 text-sm font-semibold'>
              <h3>Liked Songs</h3>
              {
                likedSongs.length === 1 && <p className='text-[var(--primary-grey)]'>Playlist • 1 Song ♪</p>
              }
              {
              likedSongs.length !== 1 &&<p className='text-[var(--primary-grey)]'>Playlist • {
                likedSongs.length > 0 ? `${likedSongs.length} Song` : 'No Songs'
                } ♪</p>
              }

            </Link>
          </Link>

          <div onClick={handleInfoModal} className='flex gap-5 items-center active:bg-opacity-20'>
            <div className='w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-md bg-primary-gradient'>
            <img src={Sky} alt='Sky COTL' className='w-full h-full rounded-md'/>
            </div>
            <div className='flex flex-col gap-1 text-sm font-semibold'>
              <h3 className='truncate'>Sky: Children of the Light</h3>
              <p className='text-[var(--primary-grey)]'>Playlist • Ace Tails ♪</p>
            </div>
          </div>

          <div onClick={handleInfoModal} className='flex gap-5 items-center active:bg-opacity-20'>
          <div className='w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-md bg-primary-gradient'>
          <span>🌦️</span>
          </div>
            <div className='flex flex-col gap-1 text-sm font-semibold'>
              <h3 className='truncate'>Rain Sounds</h3>
              <p className='text-[var(--primary-grey)]'>Playlist • sugarr ♪</p>
            </div>
          </div>

          <div onClick={handleInfoModal} className='flex gap-5 items-center active:bg-opacity-20'>
            <div className='w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-md bg-primary-gradient'>
              <img src={zZz} alt='Rain' className='w-full h-full rounded-md'/>
            </div>
            <div className='flex flex-col gap-1 text-sm font-semibold'>
              <h3 className='truncate'>zZz</h3>
              <p className='text-[var(--primary-grey)]'>Playlist • zyeraxu ♪</p>
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }
  if(forMobile){
    return (
      <>
      <div className='flex items-center w-full h-full justify-around gap-6'>
        {links.map((item) =>(
          <NavLink
          onClick={()=> handleClick && handleClick()}
            key={item.name}
            to={item.to}
            className='flex flex-col flex-auto items-center gap-[0.35rem] text-[var(--primary-grey)] text-[0.9rem] font-semibold hover:text-white group truncate'
          >
              <ReactSVG className="text-[1.8rem] text-[var(--primary-grey)] group-hover:text-white transition-all duration-150" src={item.icon}/>
              {item.name}
          </NavLink>
        )
        )}
      </div>
      </>
    )
  }

  return <></>;
}

const Sidebar:React.FC = () => {

  const {likedSongs, isModalOpen,isInfoModalOpen } = useSelector((state: any) => state.player);

	const dispatch = useDispatch();

	const handleInfoModal = ():void => {
		dispatch(toggleInfoModal(!isInfoModalOpen));
		dispatch(toggleModal(!isModalOpen));
	};

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>
    <div  className="hidden md:flex flex-col w-[18%] py-8 px-4 bg-dark-gradient backdrop-blur-md animate-slideleft">
      <Logo forMobile={false}/>
      <NavLinks forMobile={false} forMobileSidebar={false}/>
      <div className='flex flex-col gap-8 mt-10'>
        <div className='flex gap-4 items-center text-[var(--primary-grey)]  ml-2'>
        <IoLibrary className=' text-[1.5rem]'/>
          <h3 className='text-[1.3rem] font-semibold'>Your Library</h3>
          <button onClick={handleInfoModal}>
          <AiOutlinePlus className='ml-auto mt-auto text-[1.5rem]'/>
          </button>
        </div>
        <div>
        <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="#6156f4" glarePosition="all" tiltMaxAngleX={3} tiltMaxAngleY={3}>
        <Link to={"/liked-songs"} className='flex gap-3 items-center active:bg-opacity-20 p-2'>
            <div className='w-[3rem] h-[3rem] flex items-center justify-center rounded-md bg-primary-gradient'>
              <AiFillHeart/>
            </div>
            <div className='flex flex-col gap-1 text-sm font-semibold'>
            <Link to={'/liked-songs'} className='flex flex-col gap-1 text-sm font-semibold'>
              <h3>Liked Songs</h3>
              {
                likedSongs.length === 1 && <p className='text-[var(--primary-grey)]'>Playlist • 1 Song ♪</p>
              }
              {
              likedSongs.length !== 1 &&<p className='text-[var(--primary-grey)]'>Playlist • {
                likedSongs.length > 0 ? `${likedSongs.length} Song` : 'No Songs'
                } ♪</p>
              }

            </Link>
            </div>
          </Link>
          </Tilt>

      <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="#6156f4" glarePosition="all" tiltMaxAngleX={3} tiltMaxAngleY={3}>
        <div onClick={handleInfoModal} className='flex gap-3 items-center active:bg-opacity-20 p-2'>
            <div className='w-[3rem] h-[3rem] flex items-center justify-center rounded-md bg-primary-gradient'>
              <img src={Sky} alt='Sky COTL' className='w-full h-full rounded-md'/>
            </div>
            <div className='flex flex-col gap-1 text-sm font-semibold'>
              <h3>Sky: COTL</h3>
              <p className='text-[var(--primary-grey)]'>Playlist • Ace Tails ♪</p>
            </div>
          </div>
          </Tilt>

        <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="#6156f4" glarePosition="all" tiltMaxAngleX={3} tiltMaxAngleY={3}>
        <div onClick={handleInfoModal} className='flex gap-3 items-center active:bg-opacity-20 p-2'>
            <div className='w-[3rem] h-[3rem] flex items-center justify-center rounded-md bg-primary-gradient'>
              <span>🌦️</span>
            </div>
            <div className='flex flex-col gap-1 text-sm font-semibold'>
              <h3>Rain Sounds</h3>
              <p className='text-[var(--primary-grey)]'>Playlist • sugarr ♪</p>
            </div>
          </div>
          </Tilt>

          <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="#6156f4" glarePosition="all" tiltMaxAngleX={3} tiltMaxAngleY={3}>
        <div onClick={handleInfoModal} className='flex gap-3 items-center active:bg-opacity-20 p-2'>
            <div className='w-[3rem] h-[3rem] flex items-center justify-center rounded-md bg-primary-gradient'>
              <img src={zZz} alt='zZz' className='w-full h-full rounded-md'/>
            </div>
            <div className='flex flex-col gap-1 text-sm font-semibold'>
              <h3>zZz</h3>
              <p className='text-[var(--primary-grey)]'>Playlist • zyeraxu ♪</p>
            </div>
          </div>
          </Tilt>
          
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {/* <div className="flex flex-col w-[16rem] py-8 px-6 bg-darkblue backdrop-blur-md animate-slideleft md:hidden absolute top-0 left-0 h-[calc(100vh-4.5rem)] z-20">
      <Logo/>
    <NavLinks forMobile={false} forMobileSidebar={true} />
    </div> */}
    <div className="absolute md:hidden block top-7 right-4 animate-slideright">
      <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className='w-10 h-10 flex items-center justify-center'>
      {
        mobileMenuOpen ? (<AiOutlineClose size={30} className=" text-white"/>):(<AiOutlineMenu size={30} className=" text-white"/>)
      }
      </button>
    </div>
    {
      !mobileMenuOpen && (
        <div className="absolute md:hidden block top-6 left-4 animate-slideleft">
          <Logo forMobile={true}/>
        </div>
      )
    }

      <div className={`absolute top-0 h-[calc(100vh-4.8rem)] w-4/5 bg-[#09090b] backdrop-blur-md md:hidden animate-slideleft flex flex-col gap-6 pl-2 pt-10 z-20 rounded-tr-sm rounded-br-sm smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <Logo forMobile={true}/>
        <NavLinks forMobile={false} forMobileSidebar={true} handleClick={()=>{setMobileMenuOpen(!mobileMenuOpen)}}/>
      </div>
    <div className="absolute md:hidden bottom-[0%] left-[0%] bg-black w-full h-[4.8rem] px-6 py-4 flex items-center justify-around z-20">
    <NavLinks handleClick={()=>setMobileMenuOpen(false)} forMobile={true} forMobileSidebar={false}/>

    </div>
    </>
  )
}

export default Sidebar