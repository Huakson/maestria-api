import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
  async execute(userId: string): Promise<string> {
    const token = sign({}, "chaveHiperSecreta", {
      subject: userId,
      expiresIn: "60s",
    });
    return token;
  }
}

export { GenerateTokenProvider };
