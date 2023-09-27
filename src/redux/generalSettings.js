export const generalSettingsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'STORE_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
