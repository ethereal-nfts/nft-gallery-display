import styled from 'styled-components'
const axios = require('axios').default;
import { useState, useEffect } from 'react';

const Card = styled.div`
  width:240px;
  margin:20px;
  text-align:left;
  height:360px;
  padding:20px;
  border-radius: 16px;
  background: #f7f8f5;
  box-shadow:  10px 10px 12px #e6e7e4, 
             -10px -10px 12px #fffffe;
  position:relative;
  display:inline-block;
`
const CardImageContainer = styled.div`
  width:200px;
  height:200px;
  margin-left:auto;
  margin-right:auto;
  position:relative;
  border-radius:16px;
  overflow:hidden;
`
const CardImageShadowOverlay = styled.div`
  position:absolute;
  top:0px;
  left:0px;
  width:200px;
  height:200px;
  border-radius: 8px;
  box-shadow: inset 5px 5px 5px #e3e4e1, 
              inset -5px -5px 5px #ffffff;

`
const CardImage = styled.img`
  display:block;
  border:solid 16px #f7f8f5;
  max-width:200px;
  max-height:200px;
`
const CardTitle = styled.h2`
  margin:0px;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  width:100%;
  display:block;
  border:solid 4px #f7f8f5;
  margin-left:-4px;
  font-size:18px;
  margin-top:8px;
  &:hover{
    overflow:visible;
    background: #f7f8f5;
    position:relative;
    width:max-content;
  }
`
const CardSubTitle = styled.a`
  margin:0px;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  width:200px;
  display:block;
  border:solid 4px #f7f8f5;
  margin-left:-4px;
  font-size:14px;
  font-weight:normal;
  color:#115f8a;
  text-decoration:underline;
`
const CardDescription = styled.p`
  position:absolute;
  margin:0px;
  overflow: hidden;
  text-overflow:ellipsis;
  width:200px;
  background:#f7f8f5;
  display:block;
  border:solid 4px #f7f8f5;
  margin-left:-4px;
  font-size:14px;
  font-weight:normal;
  height:65px;
  &:hover{
    overflow:visible;
    background: #f7f8f5;
    width:200px;
    height:initial;
  }
`

export default function OpenSeaCard({address,tokenId}) {
  const [cardData, setCardData] = useState(null)
  useEffect(()=>{
    (async () =>{
      const openSeaAsset = await axios.get(`https://api.opensea.io/api/v1/asset/${address}/${tokenId}/`).catch((err)=>{
        console.log("err",err)
        return {data:{hasData: false}}
      })
      openSeaAsset.data.hasData = true;
      setCardData(openSeaAsset.data)
    })()
  },[])
  return (
    <>
      {(cardData && cardData.hasData) &&
        <Card>
          <>
            <CardImageContainer>
              <CardImageShadowOverlay/>
              <CardImage src={cardData.image_url} />
            </CardImageContainer>
            <CardTitle>{cardData.name}</CardTitle>
            {cardData.collection && 
              <CardSubTitle target="_blank" href={cardData.permalink} >{cardData.collection.name}</CardSubTitle>
            }
            <CardDescription>{cardData.description}</CardDescription>
          </>
        </Card>
      }
    </>
  )
}
