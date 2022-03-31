import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { GET_GAMES_QUERY } from '../graphql';
import { useQuery } from '@apollo/client';

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

export default function BidCard(props) {

    const {index} = props
    const [loading, erro, data] = useQuery(GET_GAMES_QUERY, {variables: {input: {id: index.gameID}}})

  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardMedia
        component="img"
        alt="Team Picture"
        height="140"
        image={teamPics[`${index.bidFor}`]}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {index.result!==null?`Result: You ${index.result>=0?'Earned':'Lost'} ${index.result>=0?index.result:-index.result}`:`You Bet ${index.bidMoney} On ${index.bidFor}!`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          game date: {data.date}
        </Typography>
      </CardContent>
    </Card>
  );
}