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
        "border border-[#60B5ff] rounded-[10px] px-3 mt-1 text-black focus:border-[#ff9149] focus:outline-none",
        className
      )}
      {...rest}
    />
  );
}
