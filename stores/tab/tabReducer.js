import * as tabActionTypes from './tabAction'; //import constant

const initialState = {
    // selectTab: ""
    selectedTab: ""
}

const tabReducer = (state = initialState, action) => {
    switch (action.type) {
        case tabActionTypes.SET_SELECTED_TAB:
            console.log(action)
            return {
                // ...state,
                selectedTab: action.payload.selectedTab
            }
        default:
            return state
    }
}

export default tabReducer