export const schema = {
  id: 'id',
  name: 'products'
}

const reducer = (state = {}, action) => {
  if (action.response && action.response.products) {
    
    return { ...state, ...action.response.products }
  }
  return state;
}

export default reducer;