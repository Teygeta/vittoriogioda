import { Prisma, PrismaClient } from '@prisma/client'
import { consola } from 'consola'
import { green } from 'recolors'
import { UniqueEnforcer } from 'enforce-unique'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const unique = new UniqueEnforcer()

/**
 * Creates a unique email.
 *
 * ```ts
 * faker.internet.email().toLowerCase()
 * ```
 */
function uniqueLowercaseEmail(): string {
  return unique.enforce(() => {
    return faker.internet.email().toLowerCase()
  })
}

/**
 * Creates a user with a default unique email.
 */
function createUser(data?: Partial<Prisma.UserCreateInput>) {
  return Prisma.validator<Prisma.UserCreateInput>()({
    email: uniqueLowercaseEmail(),
    ...data,
  })
}

async function seed() {
  consola.log(green('Seeding...\n'))

  const testUser = await prisma.user.create({
    data: createUser({
      email: 'user@example.com',
    }),
  })
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
