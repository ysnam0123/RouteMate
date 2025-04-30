import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;
export default function Button(props: ButtonProps) {
  const { children, className, ...rest } = props;
  return (
    <button
      className={twMerge(
        ' rounded-[10px] text-sm font-semibold cursor-pointer  flex flex-row gap-[5px]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
