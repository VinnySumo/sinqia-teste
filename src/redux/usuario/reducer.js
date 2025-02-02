import actionType from "./actionType";

const initialState = {
    isAuthenticated: false,
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.login:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case actionType.logout:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

export default userReducer;
