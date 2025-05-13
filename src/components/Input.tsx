import { twMerge } from "tailwind-merge";

type OnlyLiterals<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;
type ReactInputType = OnlyLiterals<
  React.InputHTMLAttributes<HTMLInputElement>["type"]
>;
type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type"> & {
  type?: Exclude<ReactInputType, "radio" | "checkbox" | "range">;
};

export default function Input(props: InputProps) {
  let { className, type = "text", ...rest } = props;

  return (
    <input
      type={type}
      className={twMerge(
<<<<<<< HEAD
        "w-full h-11 p-3 border-[1px] border-[var(--color-black)] rounded-[10px] mt-1 text-[var(--color-black)] text-base",
=======
        "border border-[#60B5ff] rounded-[10px] px-3 mt-1 text-black focus:border-[#ff9149] focus:outline-none",
>>>>>>> 4c468f32df8cb9c0dac2b786e37b6a99bd86802e
        className
      )}
      {...rest}
    />
  );
}
