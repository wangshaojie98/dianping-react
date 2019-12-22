const initState = {
  error: null
}

export const actionTypes = {
  CLEAR_ERROR: 'APP/CLEAR_ERROR'
}

export const actions = {
  clearError: () => ({
    type: actionTypes.CLEAR_ERROR
  })
}

const reducer = (state = initState, action) => {
  if (action.type === actionTypes.CLEAR_ERROR) {
    return { ...state, error: null }
  } else if (action.error) {
    return { ...state, error: action.error }
  }
  return state;
}
export default reducer;

export const getError = (state) => {
  return state.app.error
}
