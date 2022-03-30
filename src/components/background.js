import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Cards from './cards';
import CounterCards from './counterCards';
import { Button } from '@mui/material/Button';
import Bid from '../containers/Bid'
import TimePickers from './TimePickers';

export default function Background(props){
    
    const {games, signIn, user} = props
    const [render, setRender] = React.useState(null)
    const [openBid, setOpenBid] = React.useState(false)
    const [position, setPosition] = React.useState({})
    const [date, setDate] = React.useState(new Date())
    const [value, setValue] = React.useState(new Date());

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
        setDate(value)
        let currentGames = []
        const month = ['01','02','03','04','05','06','07','08','09','10','11','12']
        const currentDate = `${date.getFullYear()}-${month[date.getMonth()]}-${date.getDate()}`
        for (var i in games.games) {
            if(currentDate===games.games[i].date){
                currentGames.push(games.games[i])}
        }
        setRender(currentGames.map((e,index)=>{
            return <Cards top={e.top} topScore={e.topScore} bot={e.bot} botScore={e.botScore} date={handleDate(e.date)} bid={bid} />
        }))
    }
    const handleClose=()=>{
        setOpenBid(false)
    }


    return(
        <>
        <Container maxwidth='sm'>
            <>
                <>
                    <br></br>
                    <TimePickers onChange={(newValue) => {setValue(newValue);}}></TimePickers>
                    <Button variant="outlined" onClick={handleClick}>確定</Button>
                </>
                {render}    
            </>
        </Container>
        <Bid open={openBid} handleClose={handleClose} username={user} team={position.team} date={position.date}/>
        </>
    )
}