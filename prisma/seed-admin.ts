import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'info@brentlinenhire.co.uk' 
  const password = 'BrentLinen@2025!Secure' 
  
  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      password: hashedPassword,
      name: 'Admin',
    },
  })

  console.log(`==============================================`)
  console.log(`Admin user created/updated successfully!`)
  console.log(`Email: ${email}`)
  console.log(`Password: ${password}`)
  console.log(`==============================================`)
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
