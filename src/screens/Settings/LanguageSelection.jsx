import React from 'react'
import {Dialog, DialogContent, DialogTitle, Divider, Menu, MenuItem} from "@mui/material";
import Trans, {supportedLanguages} from "../../components/Trans";
import {useDispatch, useSelector} from "react-redux";
import {setLanguage} from "../../redux/actions/LayoutActions";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles({
    popUpStyles:{
        left:props=>props.isLtr ?  'initial' : '0px',
        right:props=>props.isLtr ? '0px' : 'initial',
    }
})


const LanguageSelection = ({anchorEl,setAnchorEl}) => {
    const dispatch = useDispatch()
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const language = useSelector(state=>state.layout.language)
    const isLtr = language === 'EN';
    const classes = useStyles({isLtr})
    return (
        <>
            <Menu
                marginThreshold={0}
                elevation={2}
                anchorEl={anchorEl}
                id="simple-menu"
                keepMounted
                open={open}
                onClose={handleClose}
                className={isLtr ? 'ltrApp' : 'rtlApp'}
            >
                {supportedLanguages.map((item) => {
                    return (
                        <MenuItem
                            key={item}
                            onClick={() => {
                                dispatch(setLanguage(item))
                                handleClose()
                            }}

                        >
                            <span><Trans>{item}</Trans></span>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    )
}
export default LanguageSelection;