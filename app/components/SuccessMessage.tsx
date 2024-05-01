import React, { ReactNode } from "react";

type SuccesMessageProps = {
  children: ReactNode;
  fade: boolean
};

export default function SuccessMessage({ children, fade }: SuccesMessageProps) {
  return (
    <p
      className={`bg-green-600 font-light p-2 text-center text-white text-sm transition-opacity duration-1000 ${ fade ? "opacity-0" : "opacity-100"}`}
    >
      {children}
    </p>
  );
}
