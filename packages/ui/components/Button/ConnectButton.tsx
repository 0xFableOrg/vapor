import React, { useCallback, useEffect, useState } from "react"

import { ModalEnum, useModal } from "@contexts/modal"
import { useWallet } from "@contexts/wallet"
import { useStore } from "@store/store"
import { shortenAddress } from "@utils/tool"
import { Container } from "@components/Templates/AddressContainer"
import { Button, Profile, mq } from "@ensdomains/thorin"
import styled, { css } from "styled-components"

const StyledButton = styled(Button)`
  ${({ theme }) => css`
    width: fit-content;

    ${mq.xs.min(css`
      min-width: ${theme.space["45"]};
    `)}
  `}
`

interface ConnectButtonProps {} // eslint-disable-line

const ConnectButton: React.FC<ConnectButtonProps> = () => {
  const { connected } = useWallet()
  const { setModal } = useModal()
  const { store } = useStore()
  const { account, provider } = store

  const [ens, setEns] = useState<string | null>(null)

  const handleConnect = () => {
    if (!connected) setModal(ModalEnum.WALLET_MODAL)
    if (connected) return
  }

  const getEnsName = useCallback(
    async (addr: string | undefined) => {
      let ensName: string | null | undefined
      if (addr) {
        ensName = await provider?.lookupAddress(addr)
      }
      return ensName
    },
    [provider]
  )

  useEffect(() => {
    if (account) {
      getEnsName(account).then((resolvedEns) => {
        if (resolvedEns) setEns(resolvedEns)
      })
    }
  }, [account, getEnsName])

  const copyToClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Container as="main" $variant="flexVerticalCenter">
      {!connected && (
        <StyledButton onClick={handleConnect}>{"connect"}</StyledButton>
      )}
      {connected && (
        <Profile
          address={account as string}
          ensName={ens || undefined}
        />
      )}
    </Container>
  )
}

export default ConnectButton
