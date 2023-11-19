import React, { useCallback } from "react";
import { utils } from "ethers";
import Image from "next/image";

import { useModal } from "@contexts/modal";
import { useStore } from "@store/store";
import { WalletType } from "@type/common";
import { StoreActionTypes } from "@type/store";
import { configMetamask, configWalletConnect } from "@utils/provider";

interface CreateGameModalProps {} // eslint-disable-line

const CreateGameModal: React.FC<CreateGameModalProps> = () => {
  const { dispatch } = useStore();
  const { setModal } = useModal();

  return (
    <div
      id="default-modal"
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full y-full h-modal backdrop-blur-sm"
    >
      <div className="relative w-full h-full max-w-md px-4 md:h-auto">
        <div className="relative bg-black border-[1px] border-white rounded-xl shadow">
          <div className="flex items-center justify-between px-6 py-4 border-b rounded-t border-white">
            <h3 className="font-vapor text-[20px] font-semibold text-white">
              Room creation
            </h3>
            <button
              type="button"
              className="text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-white/10"
              onClick={() => {
                setModal(null);
              }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="flex flex-col p-6">
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGameModal;
