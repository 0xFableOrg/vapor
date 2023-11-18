import Link from "next/link";

export type LobbyItemProps = {
  id: string | number;
};

const LobbyItem: React.FC<LobbyItemProps> = ({ id }) => {
  return (
    <div>
      <Link key={id} href={`/lobby/${id}`}>  
        <span className="text-white text-[20px] font-capian">
          <a style={{ margin: "10px", display: "block" }}>Lobby {id}</a>
        </span>
      </Link>
    </div>
  );
};

export default LobbyItem;
