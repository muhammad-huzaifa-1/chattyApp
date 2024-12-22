import { X } from "lucide-react";
import { useChatStore } from "../Store/useChatStore";
import avatarPic from "./avatar.png"
import { useAuthStore } from "../Store/useAuthStore";

const ChatHeader = () => {
  const { selectUser, setSelectedUser } = useChatStore();
  const { onlineUser } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectUser.profilePic || avatarPic } alt={selectUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectUser.fullName}</h3>
            <p className="  text-sm text-base-content/70">
              {onlineUser.includes(selectUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;