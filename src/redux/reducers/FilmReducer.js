import { DAT_VE_PHIM, LAY_DS_BANNER, LAY_DS_CINEMA, LAY_DS_GHE, LAY_DS_PHIM, LAY_LICHCHIEU, LAY_LICHRAP, THEM_GHE, XOA_GHE, XOA_PHIM } from "../types/FilmType";

const initialState = {
  mangBanner: [],
  mangCinema: [],
  mangPhim: [],
  cinemaSchedule: [],
  movieSchedule: [],
  mangGhe: [],
  cvmGhe: [],
  resultTicket: ''
}

export const filmReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAY_DS_PHIM:
      state.mangPhim = action.mangPhim;
      return { ...state }

    case LAY_DS_BANNER:
      state.mangBanner = action.mangBanner;
      return { ...state }

    case LAY_DS_CINEMA:
      state.mangCinema = action.mangCinema;
      return { ...state }

    case LAY_LICHRAP:
      state.cinemaSchedule = action.cinemaSchedule;
      return { ...state }

    case LAY_DS_GHE:
      state.mangGhe = action.mangGhe;
      let j = 0;
      let arr = [];
      for (let i = 0; i < action.mangGhe.danhSachGhe.length; i++) {
        if ((i + 1) % 16 === 0) {
          let chair = action.mangGhe.danhSachGhe.slice(j * 16, (j + 1) * 16)
          arr.push({ "hang": String.fromCharCode(j + 65), "danhSachGhe": chair })
          j++;
        }
      }
      state.cvmGhe = arr;
      return { ...state }

    case THEM_GHE:
      for (let i = 0; i < state.cvmGhe.length; i++) {
        for (let j = 0; j < state.cvmGhe[i].danhSachGhe.length; j++) {
          if (state.cvmGhe[i].danhSachGhe[j].tenGhe === action.addChair.tenGhe && !action.addChair.daDat) {
            state.cvmGhe[i].danhSachGhe[j] = { ...action.addChair, order: true }
          }
        }
      }
      return { ...state }

    case XOA_GHE:
      for (let i = 0; i < state.cvmGhe.length; i++) {
        for (let j = 0; j < state.cvmGhe[i].danhSachGhe.length; j++) {
          if (state.cvmGhe[i].danhSachGhe[j].tenGhe === action.removeChair.tenGhe) {
            state.cvmGhe[i].danhSachGhe[j] = { ...state.cvmGhe[i].danhSachGhe[j], order: false }

          }
        }
      }
      return { ...state }

    case DAT_VE_PHIM:
      state.resultTicket = action.resultTicket;
      return { ...state }

    case LAY_LICHCHIEU:
      state.movieSchedule = action.movieSchedule;
      return { ...state }

    case XOA_PHIM:
      state.resultTicket = action.resultTicket;
      state.mangPhim = state.mangPhim.filter(item => item.maPhim !== action.maPhim)
      return { ...state }
    default:
      return state
  }
}
