import React from "react"
import { toast, ToastContainer } from "react-toastify"
import type { AppProps } from "next/app"
import Head from "next/head"
import Script from "next/script"

import { ModalProvider } from "@contexts/modal"
import { WalletProvider } from "@contexts/wallet"
import { StoreProvider } from "@store/store"

import "@styles/globals.css"
import "react-toastify/dist/ReactToastify.css"
import { lightTheme } from "@ensdomains/thorin"
import { ThemeProvider } from "styled-components"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StoreProvider>
      <ThemeProvider theme={lightTheme}>
        <ModalProvider>
          <WalletProvider>
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
          </WalletProvider>
        </ModalProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default MyApp
