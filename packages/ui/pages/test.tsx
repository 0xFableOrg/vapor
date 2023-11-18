import React, { useEffect } from "react"
import type { NextPage } from 'next'
import * as p2p from '@vapor/p2p'
import { Address, sendSystemMessage, SystemMessageType, utf8ToBytes, WakuNode } from "@vapor/p2p"
import { ethers } from "ethers"

const TestPage: NextPage = () => {
  const [wakuNode, setWakuNode] = React.useState<WakuNode|null>(null)
  const [status, setStatus] = React.useState("Starting")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [messageList, setMessageList] = React.useState<string[]>([])

  useEffect(() => {
    const asyncSetupWaku = async () => {
      setWakuNode(await p2p.setupWaku(setStatus, (message) => {
        setMessageList(messageList.concat(message.toString()))
      }))
      setStatus("Ready!")
    }
    void asyncSetupWaku()
  }, [])

  const clickHandler = async () => {
    const wallet = ethers.Wallet.createRandom()
    if (!wakuNode || !inputRef.current) return
    await sendSystemMessage(wakuNode, {
      type: SystemMessageType.JoinGame,
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