// ChannelNav.tsx
interface Channel {
  _id: string;
  name: string;
}

interface ChannelNavProps {
  channels: Channel[];
}

export default function ChannelNav({ channels }: ChannelNavProps) {
  return (
    <ul className="flex space-x-4 gap-0.5 mt-[10px] mb-[30px]">
      {channels.map((channel) => (
        <li
          key={channel._id}
          className="text-[#4DA0FF] border-[1px] rounded-xl py-[15px] px-[40px] text-[15px]
          hover:scale-[1.15] transition-all duration-75 ease-in-out cursor-pointer
          "
        >
          {channel.name}
        </li>
      ))}
    </ul>
  );
}
