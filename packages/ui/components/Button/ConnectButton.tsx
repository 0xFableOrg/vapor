import React, { useCallback, useEffect, useState } from "react";

import { ModalEnum, useModal } from "@contexts/modal";
import { useWallet } from "@contexts/wallet";
import { useStore } from "@store/store";
import { Container } from "@components/Templates/AddressContainer";
import { Button, Profile, mq } from "@ensdomains/thorin";
import styled, { css } from "styled-components";
import { useAccount, useChainId, useConnect } from "wagmi";

const StyledButton = styled(Button)`
  ${({ theme }) => css`
    width: fit-content;

    ${mq.xs.min(css`
      min-width: ${theme.space["45"]};
    `)}
  `}
`;

interface ConnectButtonProps {} // eslint-disable-line

const ConnectButton: React.FC<ConnectButtonProps> = () => {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const chainId = useChainId();

  const [ens, setEns] = useState<string | null>(null);

  const handleConnect = () => {
    if (!isConnected) connect();
    if (isConnected) return;
  };

  const getEnsName = useCallback(
    async (addr: string | undefined) => {
      let ensName: string | null | undefined;
      if (addr && chainId === 1) {
        // only resolve ens if connected to eth mainnet
      }
      return ensName;
    },
    [chainId]
  );

  useEffect(() => {
    if (address) {
      getEnsName(address).then((resolvedEns) => {
        if (resolvedEns) setEns(resolvedEns);
      });
    }
  }, [address, getEnsName]);

  const copyToClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Container as="main" $variant="flexVerticalCenter">
      {!isConnected && (
        <StyledButton onClick={handleConnect} className="font-vapor">
          {"connect"}
        </StyledButton>
      )}
      {isConnected && (
        <Profile address={address as string} ensName={ens || undefined} />
      )}
    </Container>
  );
};

export default ConnectButton;
