export default function WriteInfoMenu({
  iconSrc,
  tagName,
}: {
  iconSrc: string
  tagName: string
}) {
  return (
    <>
      <div className="border border-[#D6D6D6] rounded-2xl w-[90px] h-[50px] p-2 flex gap-2 items-center">
        <div>
          <img src={iconSrc} alt="iconImage"></img>
        </div>
        <span className="text-[16px]">{tagName}</span>
      </div>
    </>
  )
}
