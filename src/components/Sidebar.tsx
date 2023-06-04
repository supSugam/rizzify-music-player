import React,{useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import {links} from '../assets/constants'
import { ReactSVG } from 'react-svg'

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
}
const NavLinks:React.FC<NavLinksProps> = ({forMobile}) => {
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

  if(!forMobile){
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
  if(forMobile){
    return (
      <div className='flex items-center w-full h-full justify-center gap-10'>
        {links.map((item) =>(
          <NavLink
            key={item.name}
            to={item.to}
            className='flex flex-col items-center gap-2 text-[var(--primary-grey)] text-[0.6rem] hover:text-white group'
          >
              <ReactSVG className="text-[1.6rem] text-[var(--primary-grey)] group-hover:text-white transition-all duration-150" src={item.icon}/>
              {item.name}
          </NavLink>
        )
        )}
      </div>
    )
  }

}

const Sidebar:React.FC = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>
    <div className="hidden md:flex flex-col w-[15rem] py-8 px-6 bg-darkblue backdrop-blur-md animate-slideleft">
      <Logo/>
      <NavLinks forMobile={false}/>
    </div>

    {/* Mobile Menu */}

    <div className="absolute md:hidden bottom-0 left-0 bg-[#09090b] w-full h-[4.2rem] px-8 flex items-center justify-between">
    <NavLinks forMobile={true}/>

    </div>
    </>
  )
}

export default Sidebar