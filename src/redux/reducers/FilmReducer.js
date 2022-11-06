const initialState = {}

export const FilmReducer =  (state = initialState, action) => {
  switch (action.type) {
  case "":

    return { ...state}
  default:
    return state
  }
}
