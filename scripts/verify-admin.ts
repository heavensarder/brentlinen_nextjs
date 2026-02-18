import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@brentlinenhire.co.uk'
  const password = 'Brentline2026@#'

  console.log(`Checking for admin: ${email}`)

  const admin = await prisma.admin.findUnique({
    where: { email },
  })

  if (!admin) {
    console.error('❌ Admin user NOT found in database!')
    return
  }

  console.log('✅ Admin user found.')
  
  const isValid = await bcrypt.compare(password, admin.password)
  
  if (isValid) {
    console.log('✅ Password matches hash.')
  } else {
    console.error('❌ Password does NOT match hash!')
    console.log('Stored hash:', admin.password)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
