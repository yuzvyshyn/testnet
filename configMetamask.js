export const network = async () => {
  if (window.ethereum)
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${Number(
              `${import.meta.env.VITE_APP_ETHCHAIN_ID}`
            ).toString(16)}`,
          },
        ],
      });
    } catch (error) {
      if (error) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${Number(
                  `${import.meta.env.VITE_APP_ETHCHAIN_ID}`
                ).toString(16)}`,
                chainName: `${import.meta.env.VITE_APP_ETHCHAIN_NAME}`,
                nativeCurrency: {
                  name: `${import.meta.env.VITE_APP_ETHCHAIN_CURRNAME}`,
                  symbol: `${import.meta.env.VITE_APP_ETHCHAIN_CURRSYMBOL}`,
                  decimals: 18,
                },
                blockExplorerUrls: [
                  `${import.meta.env.VITE_APP_ETHCHAIN_BLOCKEXPL}`,
                ],
                rpcUrls: [`${import.meta.env.VITE_APP_ETHCHAIN_RPCURL}`],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
    }
};

export const listen = async () => {
  if (window.ethereum)
    window.ethereum.on('accountsChanged', (account) => {
      const acc = localStorage.getItem('metaAcc');
      if (account !== acc && acc.length) allLogout();
      location.reload();
    });
  if (window.ethereum)
    window.ethereum.on('chainChanged', (chainId) => {
      const chain = `${Number(chainId)}`;
      const chainEnv = `${import.meta.env.VITE_APP_ETHCHAIN_ID}`;
      if (chain !== chainEnv) allLogout();
      location.reload();
    });
};
