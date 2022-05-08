import { Container, Heading, Box, Link, Flex, Spacer } from '@chakra-ui/react'
import { SwitchNetworkAlert } from '@/components/metaMask/SwitchNetworkAlert'
import { MetaMaskLeadBanner } from '@/components/metaMask/MetaMaskLeadBanner'
import { Footer } from '@/components/footer'
interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <SwitchNetworkAlert />
      <MetaMaskLeadBanner />
      <Box p="4">
        <Flex>
          <Box p={2}>
            <Heading size="md">Omise – HENKAKU</Heading>
          </Box>
          <Spacer />
          <Box p={2}>
            <Link href="/" p={4}>
              Home
            </Link>
            <Link href="/quests" p={4}>
              Quests
            </Link>
          </Box>
        </Flex>
      </Box>
      <Container maxW="4xl">{children}</Container>
      <Footer />
    </>
  )
}

export { Layout }
