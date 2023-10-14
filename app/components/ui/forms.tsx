import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export function FormCard({ children, ...props }:{children: ReactNode}){
  return (
    <section {...props} className='border rounded-3xl w-full'>{children}</section>
  )
}

export function Input({ children, ...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <input {...props} className='border rounded-full p-4 focus:border-2 w-64 text-xl'>{children}</input>
    )
}


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className="border-4 border-double hover:border-solid rounded-full py-1 px-6 color-primary" type="submit">
      {children}
    </button>
  );
}