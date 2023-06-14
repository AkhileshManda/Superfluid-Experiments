import * as React from 'react';
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { polygonMumbai } from 'wagmi/chains';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.
import {
  configureChains,
  createClient,
  useAccount,
  useNetwork,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { GetServerSidePropsContext } from 'next';
import Superfluid from '@/components/Superfluid';
import CurrentStreams from '@/components/CurrentStreams';

const { chains, provider } = configureChains(
  [polygonMumbai],
  //YOU CAN ADD MORE CHAINS HERE FOR NOW ITS ONLY MUMBAI
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Purple Pay',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const getServerSideProps = ({ req }: GetServerSidePropsContext) => {
  return {
    props: {
      publicPage: true,
    },
  };
};

const HomePage = () => {
  const { isConnected } = useAccount();
  const [connected, setIsConnected] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsConnected(isConnected);
  }, [isConnected]);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className='flex h-screen items-center justify-center'>
          {connected ? (
            <div>
              <Superfluid />
              <CurrentStreams />
            </div>
          ) : (
            <ConnectButton />
          )}
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default HomePage;
