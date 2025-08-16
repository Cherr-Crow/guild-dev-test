
export interface User {
  name: {
    title: string,
    first: string,
    last: string
  },
  email: string,
  login: {
    uuid: string,
    username: string,
    password: string
  },
}