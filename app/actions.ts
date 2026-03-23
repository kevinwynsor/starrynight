"use server"
import { prisma } from '@/lib/db'
import { supabase } from '@/lib/supabase';

//get requests
export async function getStars() {
  const now = new Date();

  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0, 0, 0, 0
  );

  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23, 59, 59, 999
  );

  return await prisma.stars.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

//post requests
export async function addStar(prevState: unknown, data: FormData) {
  try{
  await prisma.stars.create({
    data: {
      content: data.get('content') as string,
    },
  })
  const channel = supabase.channel('stars')

  const send = await channel.httpSend('new_star',{msg: 'newStar'})

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