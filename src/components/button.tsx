import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;
export default function Button(props: ButtonProps) {
  const { children, className, ...rest } = props;
  return (
    <button
      // width, height, text-white, border-radius, font-size
      className={twMerge(
        'w-[77px] h-[44px] text-white rounded-[10px] text-sm font-semibold cursor-pointer active:scale-95 transition-all duration-100 ease-in shadow-[4px_6px_4px_rgba(0,0,0,0.25)]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
