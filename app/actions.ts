"use server"
import { prisma } from '@/lib/db'

//get requests
export async function getStars() {
  return await prisma.stars.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

//post requests
export async function addStar(prevState: unknown, data: FormData) {
  try{
  await prisma.stars.create({
    data: {
      content: data.get('content') as string,
    },
  })
  return { success: true }
  }catch(error){
    console.error('Error', error);
    return {
      success: false,
      message: 'Something went wrong',
      error: error
    }
  }
}

//put requests


//delete requests