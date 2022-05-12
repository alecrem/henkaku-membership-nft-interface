import type { NextPage } from 'next'
import { useAccount, useNetwork } from 'wagmi'
import { useEffect, useState } from 'react'
import {
  Button,
  Text,
  Heading,
  Image,
  SimpleGrid,
  Box,
  Link,
  Spacer
} from '@chakra-ui/react'
import { Layout } from '@/components/layouts/layout'
import { getContractAddress } from '@/utils/contractAddress'
import { useTotalSupply } from '@/hooks/useTotalSupply'
import { useMounted } from '@/hooks/useMounted'
import { useBalanceOf } from '@/hooks/useBalanceOf'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const Home: NextPage = () => {
  const { activeChain } = useNetwork()
  const { data } = useAccount()
  const kamonNFT = getContractAddress({
    name: 'kamonNFT',
    chainId: activeChain?.id
  })
  const openSeaTokenBaseUrl = `https://testnets.opensea.io/assets/${kamonNFT}/`
  const { balanceOf } = useBalanceOf(kamonNFT, data?.address)
  const { totalSupply } = useTotalSupply(kamonNFT)
  const mounted = useMounted()

  return (
    <>
      <Layout>
        <Heading as="h2" color="white.600">
          Mint your Kamon - 家紋{' '}
        </Heading>
        <Text m="1rem">
          Kamon NFT is membership of henkaku community.{' '}
          {mounted && totalSupply && (
            <Text>🎉 {totalSupply.toString()} members minted so far 🎉</Text>
          )}
        </Text>
        <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing="10px">
          <div>
            <Image src={'/kamonNFT_427@2x.png'} alt="" />
          </div>
          <div>
            <Box w="100%" p={4} color="grey.600">
              <Heading as="h3" fontSize="1.2rem">
                Kamon - 家紋 NFT costs 1000 $HENKAKU
              </Heading>
              <Text m="1rem">Excluding Gas fee</Text>
              {mounted && balanceOf?.gte(1) ? (
                <>
                  <Button disabled={true} size="lg" colorScheme="teal">
                    You hold kamonNFT
                  </Button>
                  <Spacer mt={5} />
                  <Link href={`${openSeaTokenBaseUrl}`} isExternal>
                    Check with OpenSea <ExternalLinkIcon mx="2px" />
                  </Link>
                </>
              ) : (
                <Button as="a" href="/mintKamon" size="lg" colorScheme="teal">
                  Go and Mint your NFT
                </Button>
              )}
            </Box>
          </div>
        </SimpleGrid>
      </Layout>
    </>
  )
}

export default Home
