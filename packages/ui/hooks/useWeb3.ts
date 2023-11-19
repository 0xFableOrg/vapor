import { ethers } from "ethers"
import { useStore } from "@store/store"

export const useWeb3 = () => {
  const { store } = useStore()
  const { account, provider } = store

  // function to call getSessions to get all active sessions - feed to lobby index page
  // 2 - 
}
