import React from 'react'
import { red } from '@material-ui/core/colors'
import {
    createMuiTheme,
    ThemeProvider,
    Button,
    AppBar,
    Typography,
    IconButton,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import FavoriteIcon from '@material-ui/icons/Favorite';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: red[700]
        }
    }
})

const useStyles = makeStyles((theme) => ({
    // button: {
    //     margin: theme.spacing(1),
    //     width: 100,
    //     color: green
    // }
}))


export default function Test() {

    let classes = useStyles()


    return (
        <ThemeProvider theme={theme}>
            <AppBar>
                <Button
                    className={classes.button}
                    fullwidth='false'
                    size='large'
                    startIcon={<FavoriteIcon />}>
                    Favorites
               </Button>

            </AppBar>
        </ThemeProvider>
    )
}
