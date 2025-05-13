import { twMerge } from "tailwind-merge";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;
export default function Button(props: ButtonProps) {
<<<<<<< HEAD
  const { children, className, ...rest } = props;
  return (
    <button
      className={twMerge(
        "w-[140px] h-[45px] bg-[var(--color-main-navy)] text-[var(--color-white)] rounded-[10px] text-base cursor-pointer",
=======
  let { children, className, ...rest } = props;
  return (
    <button
      className={twMerge(
        "w-[77px] h-[44px] text-white rounded-[10px] text-sm cursor-pointer",
>>>>>>> 4c468f32df8cb9c0dac2b786e37b6a99bd86802e
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
