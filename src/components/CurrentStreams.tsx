import React, { useEffect } from 'react';
import { getProvider, fetchSigner } from '@wagmi/core';
import { Framework } from '@superfluid-finance/sdk-core';

const CurrentStreams = () => {
  const getFlow = async () => {
    const provider = getProvider();
    const signer = await fetchSigner();
    console.log(provider);
    console.log(signer);
    //Initialize SDK - here we using polygon and getting provider from wagmi
    const sf = await Framework.create({
      chainId: 80001, //TODO: GET BASED ON CHAIN
      provider,
      resolverAddress: '0x8c54c83fbde3c59e59dd6e324531fb93d4f504d3',
    });
    const fdaix = await sf.loadSuperToken(
      '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f'
    );
    const superSigner = await sf.createSigner({ signer: signer });
    console.log(signer);
    console.log(await superSigner.getAddress());
    const res = await fdaix.getAccountFlowInfo({
      account: await superSigner.getAddress(),
      providerOrSigner: superSigner,
    });
    console.log('Fetching streams : ', res);
  };
  //TODO: Implement Similar methods for updating flows and deleting flows

  const getFlowFromGraph = async () => {
    //TODO: Explore stuff you can get a lot of details here
    // https://console.superfluid.finance/subgraph?_network=mumbai
    // query FetchStreamsFromAddress($userAddress: String) {
    //   streams(where: {sender: $userAddress}) {
    //     id
    //     userData
    //     currentFlowRate
    //     # token {
    //     #   name
    //     #   symbol
    //     #   decimals
    //     # }
    //     receiver {
    //       id
    //       receivedTransferEvents {
    //         addresses
    //         transactionHash
    //         token
    //       }
    //     }
    //   }
    // }
  };
  useEffect(() => {
    getFlow();
  });
  return <div>CurrentStreams</div>;
};

export default CurrentStreams;
