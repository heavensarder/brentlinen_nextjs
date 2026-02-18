import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  // Clean up existing data
  await prisma.booking.deleteMany({})
  await prisma.bookingProduct.deleteMany({})
  await prisma.bookingCategory.deleteMany({})

  // 1. Create Categories
  const categories = [
    { title: "Table Linen", imageRatio: "square" },
    { title: "Chef Wear", imageRatio: "portrait" },
    { title: "Bed & Bath", imageRatio: "landscape" },
    { title: "Event Drapes", imageRatio: "portrait" },
    { title: "Kitchen Essentials", imageRatio: "square" }
  ]

  const createdCategories: any = {}

  for (const cat of categories) {
    const c = await prisma.bookingCategory.create({
      data: cat
    })
    createdCategories[cat.title] = c.id
    console.log(`Created category: ${c.title}`)
  }

  // 2. Create Products
  const products = [
    // Table Linen (Square)
    {
      title: "Signature White Tablecloth",
      description: "Classic crisp white tablecloth for formal dining. Available in various sizes.",
      quantity: null, 
      price: 12.50,
      image: "https://images.pexels.com/photos/265940/pexels-photo-265940.jpeg?auto=compress&cs=tinysrgb&w=800",
      isActive: true,
      categoryId: createdCategories["Table Linen"]
    },
    {
      title: "Premium Napkin Set (50pk)",
      description: "Luxurious cotton-linen blend napkins. Soft touch, high absorbency.",
      quantity: 50, 
      price: 25.00,
      image: "https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=800",
      isActive: true,
      categoryId: createdCategories["Table Linen"]
    },
    {
        title: "Table Runner - Gold",
        description: "Elegant gold runner to add a touch of luxury to your table setting.",
        quantity: null,
        price: 8.00,
        image: "https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=800", 
        isActive: true,
        categoryId: createdCategories["Table Linen"]
    },

    // Chef Wear (Portrait)
    {
      title: "Head Chef Jacket",
      description: "Double-breasted, premium cotton chef jacket with black piping.",
      quantity: 1,
      price: 15.00,
      image: "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800",
      isActive: true,
      categoryId: createdCategories["Chef Wear"]
    },
    {
      title: "Kitchen Apron - Striped",
      description: "Durable butcher stripe apron with adjustable neck strap.",
      quantity: null,
      price: 6.50,
      image: "https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=800",
      isActive: true,
      categoryId: createdCategories["Chef Wear"]
    },

    // Bed & Bath (Landscape)
    {
      title: "Luxury King Duvet Set",
      description: "5-star hotel quality duvet cover and pillowcases. 600 thread count.",
      quantity: 1,
      price: 22.00,
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
      isActive: true,
      categoryId: createdCategories["Bed & Bath"]
    },
    {
        title: "Bath Towel Bundle",
        description: "Includes 2 bath sheets, 2 hand towels, and 2 face cloths. Ultra-soft Egyptian cotton.",
        quantity: 1,
        price: 18.50,
        image: "https://images.pexels.com/photos/4210339/pexels-photo-4210339.jpeg?auto=compress&cs=tinysrgb&w=800",
        isActive: true,
        categoryId: createdCategories["Bed & Bath"]
    },
    {
        title: "Spa Robe Waffle Weave",
        description: "Lightweight and absorbent waffle weave robe, perfect for spas and hotels.",
        quantity: null,
        price: 12.00,
        image: "https://images.pexels.com/photos/3209035/pexels-photo-3209035.jpeg?auto=compress&cs=tinysrgb&w=800",
        isActive: true,
        categoryId: createdCategories["Bed & Bath"]
    },

    // Event Drapes (Portrait)
    {
        title: "Velvet Backdrop Curtain",
        description: "Heavy velvet curtain for stage or event backdrops. Sound absorbing.",
        quantity: null,
        price: 45.00,
        image: "https://images.pexels.com/photos/2444917/pexels-photo-2444917.jpeg?auto=compress&cs=tinysrgb&w=800",
        isActive: true,
        categoryId: createdCategories["Event Drapes"]
    },
    {
        title: "Sheer Voile Drapes",
        description: "Light and airy sheer drapes for weddings and marquees.",
        quantity: null,
        price: 30.00,
        image: "https://images.pexels.com/photos/1030914/pexels-photo-1030914.jpeg?auto=compress&cs=tinysrgb&w=800",
        isActive: true,
        categoryId: createdCategories["Event Drapes"]
    },

    // Kitchen Essentials (Square)
    {
        title: "Glass Polishing Cloth",
        description: "Lint-free microfiber cloth for crystal clear glasses.",
        quantity: 10,
        price: 5.00,
        image: "https://images.pexels.com/photos/211710/pexels-photo-211710.jpeg?auto=compress&cs=tinysrgb&w=800",
        isActive: true,
        categoryId: createdCategories["Kitchen Essentials"]
    }
  ]

  for (const p of products) {
    await prisma.bookingProduct.create({
      data: p,
    })
    console.log(`Created product: ${p.title}`)
  }
  console.log(`Seeding finished.`)
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
