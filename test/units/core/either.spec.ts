import { Either, left, right } from '@/core/either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  }

  return left('error')
}

test('Success result', () => {
  const result = doSomething(true)

  expect(result.isRight()).toBe(true)
  expect(result.value).toEqual(10)
})

test('Error result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toBe(true)
  expect(result.value).toEqual('error')
})
