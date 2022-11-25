import axios from "axios";
import { ACCESS_TOKEN, GP_ID, TOKENCYBER, URL_API } from "../../util/setting";
import { ADD_PHIM, DAT_VE_PHIM, LAY_DS_BANNER, LAY_DS_CINEMA, LAY_DS_GHE, LAY_DS_PHIM, LAY_LICHCHIEU, LAY_LICHRAP, THEM_GHE, XOA_GHE, XOA_PHIM } from "../types/filmType";

export const bannerFilmAction = () => {
    return (dispatch2) => {
        let promise = axios({
            method: 'get',
            url: `${URL_API}/QuanLyPhim/LayDanhSachBanner`,
            headers: {
                'TokenCybersoft': TOKENCYBER
            }
        });
        promise.then((result) => {
            let action2 = {
                type: LAY_DS_BANNER,
                mangBanner: result.data.content
            }
            dispatch2(action2)
        });
        promise.catch((error) => {
            console.log(error)
        });
    }
}

export const cinemaFilmAction = () => {
    return (dispatch2) => {
        let promise = axios({
            method: 'get',
            url: `${URL_API}/QuanLyRap/LayThongTinHeThongRap`,
            headers: {
                'TokenCybersoft': TOKENCYBER
            }
        });
        promise.then((result) => {
            let action2 = {
                type: LAY_DS_CINEMA,
                mangCinema: result.data.content
            }
            dispatch2(action2)
        });
        promise.catch((error) => {
            console.log(error)
        });
    }
}

export const listFilmAction = (maNhom = 'GP07') => {
    return (dispatch2) => {
        let promise = axios({
            method: 'get',
            url: `${URL_API}/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`,
            headers: {
                'TokenCybersoft': TOKENCYBER
            }
        });
        promise.then((result) => {
            let action2 = {
                type: LAY_DS_PHIM,
                mangPhim: result.data.content
            }
            dispatch2(action2)
        });
        promise.catch((error) => {
            console.log(error)
        });
    }
}



export const movieScheduleAction = (maPhim = '1425') => {
    return (dispatch2) => {
        let promise = axios({
            method: 'get',
            url: `${URL_API}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
            headers: {
                'TokenCybersoft': TOKENCYBER
            }
        });
        promise.then((result) => {
            let action2 = {
                type: LAY_LICHCHIEU,
                movieSchedule: result.data.content
            }
            dispatch2(action2)
        });
        promise.catch((error) => {
            console.log(error)
        });
    }
}

export const cinemaScheduleAction = (maHeThongRap = 'BHDStar') => {
    return (dispatch2) => {
        let promise = axios({
            method: 'get',
            url: `${URL_API}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${GP_ID}`,
            headers: {
                'TokenCybersoft': TOKENCYBER
            }
        });
        promise.then((result) => {
            let action2 = {
                type: LAY_LICHRAP,
                cinemaSchedule: result.data.content
            }
            dispatch2(action2)
        });
        promise.catch((error) => {
            console.log(error)
        });
    }
}

export const listChairAction = (maLichChieu = '22093') => {
    return (dispatch2) => {
        let promise = axios({
            method: 'get',
            url: `${URL_API}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
            headers: {
                'TokenCybersoft': TOKENCYBER
            }
        });
        promise.then((result) => {
            let action2 = {
                type: LAY_DS_GHE,
                mangGhe: result.data.content
            }
            dispatch2(action2)
        });
        promise.catch((error) => {
            console.log(error)
        });
    }
}

export const removeChairAction = (removeChair = {}) => {
    return (dispatch2) => {
        let action2 = {
            type: XOA_GHE,
            removeChair: removeChair
        }
        dispatch2(action2)
    }
}

export const addChairAction = (addChair = {}) => {
    return (dispatch2) => {
        let action2 = {
            type: THEM_GHE,
            addChair: addChair
        }
        dispatch2(action2)
    }
}

export const oderChairAction = (ticketChair = {}) => {
    return (dispatch2) => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            let promise = axios({
                method: 'post',
                url: `${URL_API}/QuanLyDatVe/DatVe`,
                data: ticketChair,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                    'TokenCybersoft': TOKENCYBER
                }
            })
            promise.then((result) => {
                let action2 = {
                    type: DAT_VE_PHIM,
                    resultTicket: result.data.content
                }
                dispatch2(action2)
                document.getElementById('openAlert').click();
            })
            promise.catch((error) => {
                console.log(error.response?.data);
            })
        }
        else {
            let action2 = {
                type: DAT_VE_PHIM,
                resultTicket: "Vui lòng đăng nhập trước khi đặt vé"
            }
            dispatch2(action2)
            document.getElementById('openAlert').click();
        }
    }
}

export const removeFilmAction = (maPhim = '') => {
    return (dispatch2) => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            let promise = axios({
                method: 'delete',
                url: `${URL_API}/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                    'TokenCybersoft': TOKENCYBER
                }
            })
            promise.then((result) => {
                let action2 = {
                    type: XOA_PHIM,
                    resultTicket: result.data.content,
                    maPhim: maPhim
                }
                dispatch2(action2)
            })
            promise.catch((error) => {
                console.log(error.response?.data);
            })
        }
        else {
            let action2 = {
                type: XOA_PHIM,
                resultTicket: "Vui lòng đăng nhập"
            }
            dispatch2(action2)
        }
    }
}

export const addFilmAction = (dataPhim=[]) => {
    return (dispatch2) => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            let promise = axios({
                method: 'post',
                url: `${URL_API}/QuanLyPhim/ThemPhimUploadHinh`,
                data: dataPhim,
                headers: {
                    'TokenCybersoft': TOKENCYBER,
                }
            })
            promise.then((result) => {
                console.log(result);
                let action2 = {
                    type: ADD_PHIM,
                    resultTicket: result.data.content,
                    addPhim:dataPhim
                }
                dispatch2(action2)
            })
            promise.catch((error) => {
                console.log(error.response?.data);
            })
        }
        else {
            let action2 = {
                type:  ADD_PHIM,
                resultTicket: "Vui lòng đăng nhập"
            }
            dispatch2(action2)
        }
    }
}
