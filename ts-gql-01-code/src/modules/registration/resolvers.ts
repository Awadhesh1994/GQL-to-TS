import * as bcrypt from "bcryptjs";
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    signUp: (_, { name }: GQL.ISignUpOnQueryArguments) => `Bye ${name || "World"}`
  },
  Mutation: {
    register: async (
      _,
      { username, email, password}: GQL.IRegisterOnMutationArguments
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        username,
        email,
        password: hashedPassword
      });

      await user.save();
      return true;
    }
  }
};
