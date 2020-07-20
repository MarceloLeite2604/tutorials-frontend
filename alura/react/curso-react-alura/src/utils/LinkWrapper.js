import React from 'react';
import { NavLink } from 'react-router-dom';

/* LinkWrapper will be a High Order Component (HOC) to wrap React Link component. */
const LinkWrapper = props => {
    /* Use spread operator to repass all properties to  "NavLink" component. */
    /* If, by any chance, someone also inform an "activeStyle" property, the property will also be repassed to NavLink. Since the spread operator is after the original "activeStyle" defined here, the passed property will be overwritten (last property definition remains). */
    return (    
        <NavLink activeStyle={{fontWeight: "bold"}} {...props} />
    );
}

export default LinkWrapper;