import React from "react";
import { toast, ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

import { ModalProvider } from "@contexts/modal";
import { WalletProvider } from "@contexts/wallet";
import { StoreProvider } from "@store/store";

import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { lightTheme } from "@ensdomains/thorin";
import { ThemeProvider } from "styled-components";
import {
  scrollTestnet,
  arbitrumSepolia,
  baseSepolia,
  gnosisChiado,
  localhost,
} from "viem/chains";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  mainnet,
  sepolia,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    scrollTestnet,
    arbitrumSepolia,
    baseSepolia,
    gnosisChiado,
    localhost,
    sepolia,
    mainnet,
  ],

  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Vapor",
  projectId: "Vapor_1",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <StoreProvider>
          <ThemeProvider theme={lightTheme}>
            <ModalProvider>
              <Head>
                <title>vapor</title>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <meta property="og:description" content="matching" />
              </Head>
              <Script
                src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"
                strategy="beforeInteractive"
              />
              <Component {...pageProps} />
              <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
            </ModalProvider>
          </ThemeProvider>
        </StoreProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
