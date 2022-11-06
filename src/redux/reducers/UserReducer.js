const initialState = {}

export const UserReducer =  (state = initialState, action) => {
  switch (action.type) {
  case "":

    return { ...state}
  default:
    return state
  }
}