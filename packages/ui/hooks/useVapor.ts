import { useEffect, useState } from "react";
import { useStore } from "@store/store";
import { StoreActionTypes } from "@type/store";
import { Vapor } from "@vapor/sdk";
import { VoidSigner, providers } from "ethers";

export const useVapor = (vaporContractAddr: string) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const { store, dispatch } = useStore();
  const { provider, account } = store;

  useEffect(() => {
    const asyncFn = async (provider: providers.Provider, account: string) => {
      const signer = new VoidSigner(account, provider);
      dispatch({
        payload: { vaporInstance: new Vapor(vaporContractAddr, signer) },
        type: StoreActionTypes.SET_VAPOR_INSTANCE,
      });
      setIsReady(true);
    };

    if (provider && account) {
      asyncFn(provider, account);
    }
  }, [provider, account, vaporContractAddr]);

  return { vapor: store.vaporInstance, isReady: isReady };
};
