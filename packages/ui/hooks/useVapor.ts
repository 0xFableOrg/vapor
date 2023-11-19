import { useEffect, useState } from "react";
import { useStore } from "@store/store";
import { StoreActionTypes } from "@type/store";
import { Vapor } from "@vapor/sdk";
import { providers } from "ethers";

export const useVapor = (vaporContractAddr: string, demoGameContractAddr: string) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const { store, dispatch } = useStore();
  const { provider, account } = store;

  useEffect(() => {
    const asyncFn = async (
      provider: providers.AlchemyProvider | providers.Web3Provider,
      account: string
    ) => {
      dispatch({
        payload: {
          vaporInstance: new Vapor(
            vaporContractAddr,
            demoGameContractAddr,
            provider.getSigner(account)
          ),
        },
        type: StoreActionTypes.SET_VAPOR_INSTANCE,
      });
      setIsReady(true);
    };

    if (provider && account) {
      asyncFn(provider, account);
    }
  }, [provider, account, vaporContractAddr, dispatch]);

  return { vapor: store.vaporInstance, isReady: isReady };
};
