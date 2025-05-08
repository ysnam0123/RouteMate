import Button from '../components/common/button';
import NotFoundImg from '../assets/images/NotFound.svg';
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-[10%]">
      <img
        src={NotFoundImg}
        alt="NotFoundImg"
        className="w-[210px] h-[210px] mb-[70px]"
      />
      <h1 className="text-[54px] font-extrabold mb-[50px]">PAGE NOT FOUND</h1>
      <p className="text-[#4DA0FF] text-[20px] font-bold mb-[30px]">
        길을 잃으셨나요?
      </p>
      <Button className="bg-[#FF9149] w-[248px] h-[53px] text-[22px]">
        RouteMate와 길 찾기
      </Button>
    </div>
  );
}
