import { ReactNode } from "react";

type Props = {
  condition?: boolean;
  wrapper: (children: ReactNode) => JSX.Element;
  children: ReactNode;
};

export default function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: Props) {
  return <>{condition ? wrapper(children) : children}</>;
}
