import React, { MouseEventHandler } from "react";

export type LobbyListActionButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const LobbyListActionButton: React.FC<LobbyListActionButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-4 w-full rounded-xl border border-white hover:bg-zinc-950"
    >
      <span className="font-vapor text-white text-xl">Create Room</span>
    </button>
  );
};

export default LobbyListActionButton;
