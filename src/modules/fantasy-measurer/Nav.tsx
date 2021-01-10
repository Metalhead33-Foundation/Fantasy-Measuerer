import {Link, useMatch} from 'react-router-dom';
import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';

const FantasyMeasurerNav = () => {
    const match = useMatch('/fantasy-measurer')

    return (
        <List>
            <ListItem button component={Link} to="/fantasy-measurer" selected={match !== null}>
                <ListItemText primary="Fantasy Measurer" />
            </ListItem>
        </List>
    )
}

export default FantasyMeasurerNav