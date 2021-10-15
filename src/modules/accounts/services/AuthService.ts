import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";

import { IServerContext } from "../../../context/IContext";

// create auth checker function
const authChecker: AuthChecker<IServerContext> = ({ context: { token } }) => {
  if (!token) {
    return false;
  }

  const [, tokenString] = token.split(" ");

  try {
    verify(tokenString, "chaveHiperSecreta");
  } catch {
    return false;
  }

  return true;
};

export { authChecker };
