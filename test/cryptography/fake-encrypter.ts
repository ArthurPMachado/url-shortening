import { Encrypter } from '@/domain/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    const encryptValue = JSON.stringify(payload)

    return encryptValue
  }
}
