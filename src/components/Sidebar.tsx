import React,{useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import {links} from '../assets/constants'
import { ReactSVG } from 'react-svg'

import {AiOutlineClose,AiOutlineMenu,AiOutlinePlus,AiFillHeart} from 'react-icons/ai'
import {IoLibrary} from 'react-icons/io5'

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
  forMobile:boolean;
  forMobileSidebar:boolean;
  handleClick?:()=>void;
}
const NavLinks:React.FC<NavLinksProps> = ({forMobile,forMobileSidebar,handleClick}) => {
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
            className='flex items-center gap-4 text-[var(--primary-grey)] text-md font-semibold hover:text-white group'
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
      <div className='ml-2 mr-4 flex-1 mb-3 px-3 py-5 flex flex-col gap-2 text-lg  rounded-lg bg-[#121212]'>
        <div className='flex gap-4 items-center text-[var(--primary-grey)]'>
          <IoLibrary className=' text-[1.6rem]'/>
          <h3 className='text-[1.3rem] pt-[0.3rem] font-semibold'>Your Library</h3>
          <AiOutlinePlus className='ml-auto mt-auto text-[1.6rem]'/>
        </div>
        {/*  */}
        <div className='mt-5 flex flex-col gap-4 overflow-hidden'>
          <NavLink to={"/"} className='flex gap-5 items-center active:bg-opacity-20'>
            <div className='w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-md bg-primary-gradient'>
              <AiFillHeart/>
            </div>
            <div className='flex flex-col gap-1 text-sm font-semibold'>
              <h3>Liked Songs</h3>
              <p className='text-[var(--primary-grey)]'>Playlist • 315 Songs ♪</p>
            </div>
          </NavLink>

          <NavLink to={"/"} className='flex gap-5 items-center active:bg-opacity-20'>
            <div className='w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-md bg-primary-gradient'>
              <AiFillHeart/>
            </div>
            <div className='flex flex-col gap-1 text-sm font-semibold'>
              <h3 className='truncate'>Sky: Children of the Light</h3>
              <p className='text-[var(--primary-grey)]'>Playlist • Ace Tails ♪</p>
            </div>
          </NavLink>

          <NavLink to={"/"} className='flex gap-5 items-center active:bg-opacity-20'>
            <div className='w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-md bg-primary-gradient'>
              <AiFillHeart/>
            </div>
            <div className='flex flex-col gap-1 text-sm font-semibold'>
              <h3 className='truncate'>90s Pop</h3>
              <p className='text-[var(--primary-grey)]'>Playlist • sugarr ♪</p>
            </div>
          </NavLink>

          <NavLink to={"/"} className='flex gap-5 items-center active:bg-opacity-20'>
            <div className='w-[3.4rem] h-[3.4rem] flex items-center justify-center rounded-md bg-primary-gradient'>
              <AiFillHeart/>
            </div>
            <div className='flex flex-col gap-1 text-sm font-semibold'>
              <h3 className='truncate'>paint me as your villain</h3>
              <p className='text-[var(--primary-grey)]'>Playlist • zyeraxu ♪</p>
            </div>
          </NavLink>

        </div>
        </div>
      </>
    )
  }
  if(forMobile){
    return (
      <>
      <div className='flex items-center w-full h-full justify-center gap-8'>
        {links.map((item) =>(
          <NavLink
            key={item.name}
            to={item.to}
            className='flex flex-col flex-auto items-center gap-[0.35rem] text-[var(--primary-grey)] text-[0.9rem] hover:text-white group truncate'
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

}

const Sidebar:React.FC = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>
    <div className="hidden md:flex flex-col w-[16rem] py-8 px-6 bg-dark-gradient backdrop-blur-md animate-slideleft">
      <Logo forMobile={false}/>
      <NavLinks forMobile={false} forMobileSidebar={false}/>
    </div>

    {/* Mobile Menu */}
    {/* <div className="flex flex-col w-[16rem] py-8 px-6 bg-darkblue backdrop-blur-md animate-slideleft md:hidden absolute top-0 left-0 h-[calc(100vh-4.5rem)] z-20">
      <Logo/>
    <NavLinks forMobile={false} forMobileSidebar={true} />
    </div> */}
    <div className="absolute md:hidden block top-6 right-3 animate-slideright">
      {
        mobileMenuOpen ? (<AiOutlineClose onClick={()=>setMobileMenuOpen(false)} className="w-6 h-6 text-white"/>):(<AiOutlineMenu onClick={()=>setMobileMenuOpen(true)} className="w-6 h-6 text-white"/>)
      }
      </div>
      <div className={`absolute top-0 h-[calc(100vh-4.8rem)] w-4/5 bg-[#09090b] backdrop-blur-md md:hidden animate-slideleft flex flex-col gap-6 pl-2 pt-10 z-20 rounded-tr-sm rounded-br-sm smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <Logo forMobile={true}/>
        <NavLinks forMobile={false} forMobileSidebar={true} handleClick={()=>setMobileMenuOpen(!mobileMenuOpen)}/>
      </div>
    <div className="absolute md:hidden bottom-0 left-0 bg-[#09090b] w-full h-[4.8rem] px-8 py-2 flex items-center justify-between z-20">
    <NavLinks forMobile={true} forMobileSidebar={false}/>

    </div>
    </>
  )
}

export default Sidebar