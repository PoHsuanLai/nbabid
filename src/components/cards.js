import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const teamPics={
    MIL: 'https://ssl.gstatic.com/onebox/media/sports/logos/Wd6xIEIXpfqg9EZC6PAepQ_96x96.png',
    TOR: 'https://ssl.gstatic.com/onebox/media/sports/logos/745IgW4NSvnRxg-W9oczmQ_96x96.png',
    WSH: 'https://ssl.gstatic.com/onebox/media/sports/logos/NBkMJapxft4V5kvufec4Jg_96x96.png',
    POR: 'https://ssl.gstatic.com/onebox/media/sports/logos/_bgagBCd6ieOIt3INWRN_w_96x96.png',
    BKN: 'https://ssl.gstatic.com/onebox/media/sports/logos/iishUmO7vbJBE7iK2CZCdw_96x96.png',
    NOP: 'https://ssl.gstatic.com/onebox/media/sports/logos/JCQO978-AWbg00TQUNPUVg_96x96.png',
    ATL: 'https://ssl.gstatic.com/onebox/media/sports/logos/pm5l5mtY1elOQAl9ZEcm2A_96x96.png',
    NYK: 'https://ssl.gstatic.com/onebox/media/sports/logos/-rf7eY39l_0V7J4ekakuKA_96x96.png',
    OKC: 'https://ssl.gstatic.com/onebox/media/sports/logos/b4bJ9zKFBDykdSIGUrbWdw_96x96.png',
    CLE: 'https://ssl.gstatic.com/onebox/media/sports/logos/NAlGkmv45l1L-3NhwVhDPg_96x96.png',
    MIA: 'https://ssl.gstatic.com/onebox/media/sports/logos/0nQXN6OF7wnLY3hJz8lZJQ_96x96.png',
    PHI: 'https://ssl.gstatic.com/onebox/media/sports/logos/US6KILZue2D5766trEf0Mg_96x96.png',
    BOS: 'https://ssl.gstatic.com/onebox/media/sports/logos/GDJBo7eEF8EO5-kDHVpdqw_96x96.png',
    CHI: 'https://ssl.gstatic.com/onebox/media/sports/logos/ofjScRGiytT__Flak2j4dg_96x96.png',
    SAS: 'https://ssl.gstatic.com/onebox/media/sports/logos/FKwMB_85FlZ_7PTt1f7hjQ_96x96.png',
    LAC: 'https://ssl.gstatic.com/onebox/media/sports/logos/F36nQLCQ2FND3za-Eteeqg_96x96.png',
    DEN: 'https://ssl.gstatic.com/onebox/media/sports/logos/9wPFTOxV_zP1KmRRggJNqQ_96x96.png',
    LAL: 'https://ssl.gstatic.com/onebox/media/sports/logos/4ndR-n-gall7_h3f7NYcpQ_96x96.png',
    DAL: 'https://ssl.gstatic.com/onebox/media/sports/logos/xxxlj9RpmAKJ9P9phstWCQ_96x96.png',
    ORL: 'https://ssl.gstatic.com/onebox/media/sports/logos/p69oiJ4LDsvCJUDQ3wR9PQ_96x96.png',
    DET: 'https://ssl.gstatic.com/onebox/media/sports/logos/qvWE2FgBX0MCqFfciFBDiw_96x96.png',
    PHX: 'https://ssl.gstatic.com/onebox/media/sports/logos/pRr87i24KHWH0UuAc5EamQ_96x96.png',
    SAC: 'https://ssl.gstatic.com/onebox/media/sports/logos/wkCDHakxEThLGoZ4Ven48Q_96x96.png',
    HOU: 'https://ssl.gstatic.com/onebox/media/sports/logos/zhO6MIB1UzZmtXLHkJQBmg_96x96.png',
    MIN: 'https://ssl.gstatic.com/onebox/media/sports/logos/21Zm6e_zGiWXsaLCQyjVig_96x96.png',
    GSW: 'https://ssl.gstatic.com/onebox/media/sports/logos/ovwlyYHRKZ90s7zn_qlMCg_96x96.png',
    CHA: 'https://ssl.gstatic.com/onebox/media/sports/logos/ToeKy5-TrHAnTCl-qhuuHQ_96x96.png',
    IND: 'https://ssl.gstatic.com/onebox/media/sports/logos/andumiE_wrpDpXvUgqCGYQ_96x96.png',
    MEM: 'https://ssl.gstatic.com/onebox/media/sports/logos/3ho45P8yNw-WmQ2m4A4TIA_96x96.png',
    UTAH: 'https://ssl.gstatic.com/onebox/media/sports/logos/SP_dsmXEKFVZH5N1DQpZ4A_96x96.png',
}

export default function Cards(props){
    const {top, topScore, bot, botScore, date, bid} = props

    if(topScore===null ){
        return(
        <Card sx={{ maxWidth: 475, display: 'flex', ml: 10, mt: 2, mb:2}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardMedia component='img' height='90' src={teamPics[`${top}`]} sx={{width: 90, mt: 3, ml: 3,mr: 1}}/>
                    {   topScore===null?
                        <CardActions sx={{ml:5}}>
                            <Button size='large' onClick={()=>bid({team: 'top', date: `${date[0]}-${date[1]}-${date[2]}`})}>
                                <Typography sx={{fontSize:20}}>
                                    BID
                                </Typography>
                            </Button>
                        </CardActions>:
                        <></>
                    }
                </Box>

                <CardContent sx={{color: 'text.primary',  mt:4}}>
                    <Typography variant='h5' sx={{fontSize: 37, fontWeight:800}}>{topScore} </Typography>
                </CardContent>

                <CardContent sx={{ display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='subtitle1' color='text.secondary' component='div' sx={{mt: 5}}>{date[1]}/{date[2]}</Typography>
                    <Typography variant='subtitle1' color='text.secondary' component='div' sx={{mt: 6.5}}>vs</Typography>
                </CardContent>

                <CardContent sx={{color: 'text.primary', fontWeight: 800, mt:4}}>
                <Typography variant='h5' sx={{fontSize: 37, fontWeight:800}}>{botScore} </Typography>
                </CardContent>
                 <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardMedia component='img' height='90' src={teamPics[`${bot}`]} sx={{width: 90, mt: 3, mr: 3, ml:1, right:0.2}}/>
                    {topScore===null?
                        <CardActions sx={{mr: 5}}>
                            <Button size='large' onClick={()=>bid({team: 'bot', date: `${date[0]}-${date[1]}-${date[2]}`})}>
                                <Typography sx={{fontSize:20}}>
                                    BID
                                </Typography>
                            </Button>
                        </CardActions>:
                        <></>
                    }
                </Box>
            </Box>
        </Card>
    )}
    else {
        return <></>
    }
}