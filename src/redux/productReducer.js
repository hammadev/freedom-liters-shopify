export const productReducer = (state = [], action) => {
  switch (action.type) {
    case 'PRODUCTS':
      return {...state, all: action.Payload};
    case 'FEATURED_PRODUCTS':
      return {...state, featured: action.Payload};
    case 'ONSALE_PRODUCTS':
      return {...state, onsale: action.Payload};
    case 'LATEST_PRODUCTS':
      return {...state, latest: action.Payload};
    default:
      return state;
  }
};
