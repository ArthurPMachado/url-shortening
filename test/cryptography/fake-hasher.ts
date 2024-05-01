import { HashComparer } from '@/domain/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/application/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    const hashedValue = plain.concat('-hashed')

    return hashedValue
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    const isPlainValid = plain.concat('-hashed') === hash

    return isPlainValid
  }
}
