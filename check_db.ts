
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function check() {
  const count = await prisma.bookingProduct.count()
  console.log(`Total Products: ${count}`)
  
  const products = await prisma.bookingProduct.findMany({
      select: { title: true, isActive: true, categoryId: true }
  })
  console.log(JSON.stringify(products, null, 2))
}

check()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
