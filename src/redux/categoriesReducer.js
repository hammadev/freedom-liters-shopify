export const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'CATEGORIES':
            return { ...state, ...action.Payload };
        default:
            return state;
    }
}
