import React, { MouseEventHandler } from "react";

export type JoinLobbyActionButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
};

const JoinLobbyActionButton: React.FC<JoinLobbyActionButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={"flex items-center w-full justify-center p-2 rounded-xl border border-white hover:bg-zinc-950".concat(
        disabled ? "hover:bg-none opacity-25" : ""
      )}
    >
      <span className="font-vapor text-white">Join</span>
    </button>
  );
};

export default JoinLobbyActionButton;
