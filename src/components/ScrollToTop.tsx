import React,{useEffect} from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop:React.FC<{divRef?:HTMLDivElement|null}> = ({divRef}) => {
    const pathName = useLocation();
    useEffect(() => {
        divRef?.scrollTo({top:0,behavior:'smooth'})
    }, [pathName,divRef])
  return<></>
}

export default ScrollToTop;