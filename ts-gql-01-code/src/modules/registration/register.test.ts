import { request } from "graphql-request";
import { AddressInfo } from "net";
import { startServer } from "../../startServer";
import { User } from "../../entity/User";

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  const { port } = app.address() as AddressInfo;
  getHost = () => `http://127.0.0.1:${port}`;
});

const username = "awadhesh"
const email = "awadhesh31dec@outlook.com";
const password = "ankit";

const mutation = `
mutation {
  register(username: "${username}", email: "${email}", password: "${password}")
}
`;

test("Register user", async () => {
  const response = await request(getHost(), mutation);
  expect(response).toEqual({ register: true });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});
