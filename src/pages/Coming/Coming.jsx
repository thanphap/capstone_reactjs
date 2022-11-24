import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listFilmAction } from '../../redux/action/filmAction';
import { GP_ID} from '../../util/setting';
import { NavLink } from 'react-router-dom'

export default function Coming() {
    let { mangPhim } = useSelector(state => state.filmReducer)
    let dispatch = useDispatch();
    useEffect(() => {
        getAPI()
    }, [])

    let renderListMovie = () => {
      let listMovie = mangPhim.filter(item => item.sapChieu === true)
        return listMovie.map((phim) => {
          return <div className="col-6 col-md-3 col-lg-2 grid-item" key={phim.maPhim}>
            <div className="halim-item">
              <NavLink className="halim-thumb" to={`/detail/${phim.maPhim}`}>
                <figure>
                  <img src={phim.hinhAnh} className="" alt="..." />
                </figure>
                <div className="icon_overlay" />
                <div className="halim-post-title-box">
                  <div className='halim-post-title'>
                    <h2 className="">{phim.tenPhim}</h2>
                    <p className=""></p>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        })
      }

    let getAPI = () => {
        let action = listFilmAction(GP_ID);
        dispatch(action);
    }
    
    return (
        <div className='container content'>
            <div className="section-bar">
            <div className="section-title">
              <span>PHIM SẮP CHIẾU</span>
            </div>
            <div className="row halim_box">
              {renderListMovie()}
            </div>
          </div>
        </div>
    )
}