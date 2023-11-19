import React, { useState } from "react"
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import TextField from '@mui/material/TextField'
import Adam from '../../images/login/Adam_login.png'
import Ash from '../../images/login/Ash_login.png'
import Lucy from '../../images/login/Lucy_login.png'
import Nancy from '../../images/login/Nancy_login.png'

const SubTitle = styled.h3`
  width: 160px;
  font-size: 16px;
  color: #eee;
  text-align: center;
`

const Content = styled.div`
  display: flex;
  margin: 36px 0;
  background: #ffffff;
`

const Left = styled.div`
  margin-right: 48px;

  --swiper-navigation-size: 24px;

  .swiper {
    width: 160px;
    height: 220px;
    border-radius: 8px;
    overflow: hidden;
  }

  .swiper-slide {
    width: 160px;
    height: 220px;
    background: #dbdbe0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 95px;
    height: 136px;
    object-fit: contain;
  }
`

const Right = styled.div`
  width: 300px;
`

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Warning = styled.div`
  margin-top: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
`

interface SelectedLobbyProps {
  onNameChange: (name: string) => void
  onAvatarChange: (avatarIndex: number) => void
}

const avatars = [
  { name: 'adam', img: Adam },
  { name: 'ash', img: Ash },
  { name: 'lucy', img: Lucy },
  { name: 'nancy', img: Nancy },
]

const SelectedLobbyConfig: React.FC<SelectedLobbyProps> = ({ onNameChange, onAvatarChange}) => {
  const [nameFieldEmpty, setNameFieldEmpty] = useState<boolean>(false)

  return (
    <div className="flex flex-col items-start justify-start p-4 w-[50%] h-full border-[1px] border-white rounded-xl space-y-3">
      <Content>
        <Left>
          <SubTitle>Select an avatar</SubTitle>
          <Swiper
            navigation
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper: any) => {
              onAvatarChange(swiper.activeIndex)
            }}
          >
            {avatars.map((avatar) => (
              <SwiperSlide key={avatar.name}>
                <img src={avatar.img.src} alt={avatar.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Left>
        <Right>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            variant="outlined"
            color="secondary"
            error={nameFieldEmpty}
            helperText={nameFieldEmpty && 'Name is required'}
            onInput={(e) => {
              onNameChange((e.target as HTMLInputElement).value)
            }}
          />
        </Right>
      </Content>
    </div>
  )
}

export default SelectedLobbyConfig
