import React from 'react'
import {useEffect,useRef} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {Swiper, SwiperSlide} from 'swiper/react'
import {FreeMode} from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'

import PlayPause from './PlayPause'
import {playPause,setActiveSong} from '../redux/features/playerSlice'
import {useGetTopChartsQuery} from '../redux/services/shazamCore'

interface TopPlayProps {}

const TopPlay:React.FC<TopPlayProps> = () => {
  return (
    <div>TopPlay</div>
  )
}

export default TopPlay