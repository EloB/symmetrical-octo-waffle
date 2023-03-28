import { Button } from "@volvo/ui";
import { css } from "@emotion/css";
import clsx from "clsx";
import { PFC } from "../types";

const root = css`
  color: red;
`;

type CarProps = {};
const Car: PFC<"div", CarProps> = ({ as, className, ...props }, ref) => {
  const Component = as || "div";

  return <Component ref={ref} className={clsx(root, className)} {...props} />;
};

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Button />
      <Car>Hello</Car>
    </div>
  );
}
