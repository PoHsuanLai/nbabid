import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Cards from './cards';
import CounterCards from './counterCards';
import { Button, Typography } from '@mui/material';
import Bid from '../containers/Bid'
import TimePickers from './TimePickers';

export default function Background(props){
    
    const {games, signIn, user} = props
    const [start, setStart] = React.useState(false)
    const [render, setRender] = React.useState(null)
    const [renderdown, setRenderDown] = React.useState(null)
    const [openBid, setOpenBid] = React.useState(false)
    const [position, setPosition] = React.useState({})

    const handleDate = (date) => {
        let dateChar = date.split('')
        let newDate=[parseInt(`${dateChar[0]}${dateChar[1]}${dateChar[2]}${dateChar[3]}`),
                    parseInt(`${dateChar[5]}${dateChar[6]}`), parseInt(`${dateChar[8]}${dateChar[9]}`)]
        return (newDate)
    }
    const bid = (position) => {
        if(!signIn) {
            alert('Please Sign In First!')
            return
        }
        setOpenBid(true)
        setPosition({team: position.team, date: position.date})
    }
    const handleClick= ()=> {
        setStart(true)
        let newDate = []
        for (var i in games.games) newDate.push(handleDate(games.games[i].date))
        setRender(games.games.map((e,index)=>{
            return <Cards top={e.top} topScore={e.topScore} bot={e.bot} botScore={e.botScore} date={newDate[index]} bid={bid} />
        }))
        setRenderDown(games.games.map((e,index)=>{
            return <CounterCards top={e.top} topScore={e.topScore} bot={e.bot} botScore={e.botScore} date={newDate[index]} bid={bid} />
        }))
    }
    const handleClose=()=>{
        setOpenBid(false)
    }


    return(
        <>
        <Container maxwidth='sm'>
            <Box sx={{ bgcolor: '#FFFFFF'}} >
                {   start?
                    render.concat(renderdown)
                    :
                <TimePickers></TimePickers>
            }
            </Box>
        </Container>
        <Bid open={openBid} handleClose={handleClose} username={user} team={position.team} date={position.date}/>
        </>
    )
}