export class ClientAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Client with email ${email} already exists`)
  }
}
