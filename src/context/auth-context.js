import React from 'react'

const authContext = React.createContext({
    addIngredient: (type) => {},
    removeIngredient: (type) => {}
});

export default authContext;