import React from "react"
import type { NextPage } from 'next'
import { Address, sendSystemMessage, SystemMessageType, utf8ToBytes, WakuNode } from "@vapor/p2p"
import { ethers } from "ethers"
import { useWakuNode } from "@hooks/useWakuNode"

const TestPage: NextPage = () => {

  const [status, setStatus] = React.useState("Starting")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [messageList, setMessageList] = React.useState<string[]>([])

  const wakuNode = useWakuNode(setStatus, (message) => {
      setMessageList(messageList.concat(message.toString()))
    }
  )

  const clickHandler = async () => {
    const wallet = ethers.Wallet.createRandom()
    if (!wakuNode || !inputRef.current) return
    await sendSystemMessage(wakuNode, {
      type: SystemMessageType.JoinGame,
      sessionID: 1,
      settingsNames: ["test"],
      settingsValues: [utf8ToBytes("test")],
      privateKey: wallet.privateKey as Address
    })
    console.log("Message sent!")

    // Reset the text input.
    inputRef.current.value = ""
  }

  return <>
    <div><h1>Waku Node Status</h1></div>
    <div id="status">{status}</div>

    <label htmlFor="textInput">Message text</label>
    <input
      disabled={wakuNode === null}
      id="textInput"
      placeholder="Type your message here"
      type="text"
      ref={inputRef}
    />
    <button disabled={wakuNode === null} id="sendButton" type="button" onClick={clickHandler}>
      Send Message using Relay
    </button>

    <div><h1>Messages</h1></div>
    <ul id="messages">
      {messageList.map((item, index) => (
        <li key={`msg${index}`}>{item}</li>
      ))}
    </ul>
    <div id="messages"></div>
  </>
}

export default TestPage