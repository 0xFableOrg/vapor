import React, { useCallback } from "react";
import { useRouter } from "next/router";

import { useStore } from "@store/store";
import { ModalEnum, useModal } from "@contexts/modal";
import TypingText from "./Layout/TypingText";
import { useAccount, useConnect } from "wagmi";
import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';

interface LandingSectionProps {} // eslint-disable-line

const LandingSection: React.FC<LandingSectionProps> = () => {

  const router = useRouter();
  const { isConnected } = useAccount();
  
  const { openConnectModal } = useConnectModal();

  const handleEntryClick = useCallback(() => {
    if (isConnected) {
      router.push("/lobby");
    } else {
      // prompt user to connect
      openConnectModal && openConnectModal();
    }
  }, [router, isConnected, openConnectModal]);

  return (
    <div className="flex flex-col w-full h-[90vh] bg-black items-center justify-center space-y-10">
      <TypingText
        text={`⚔️ Virtual Arena for Peer-to-Peer Online Rendezvous ⚔️`}
        speed={100}
      />
      {/* <span className="text-white text-[35px] font-capian">
        Dive into the Dispersed Dominion: A Hub for Digital Duelists
      </span> */}
      <button
        onClick={handleEntryClick}
        type="button"
        className="flex flex-row items-center font-capian text-[20px] justify-center px-20 py-10 font-medium text-center text-white border-[1px] border-white select-none rounded-full shadow-sm"
        style={{
          backgroundImage: "url(/img/landingPageButton.jpeg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        enter
      </button>
    </div>
  );
};

export default LandingSection;
