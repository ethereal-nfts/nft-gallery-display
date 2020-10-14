import styled from 'styled-components'
import OpenSeaCard from '../components/OpenSeaCard'
const nftAssets = require('../data/nft-assets.json')

const Content = styled.main`
  width:100%;
  padding:20px;
  text-align:center;
  background:#f7f8f5;
  min-height:100vh;
`

export default function Home() {
  return (
    <>
      <Content>
        {nftAssets.map((value, index) => {
          return (<OpenSeaCard key={index} address={value.address} tokenId={value.tokenId} />)
        })}
        
      </Content>
  </>
  )
}
