'use client';

import { trpc } from '@/utils/trpc'
import { Card } from 'primereact/card';
import { useState } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";

export default function Home() {
  const [name ,setName] =useState('')
  const [url ,setUrl] =useState('')
  const [description ,setDescription] =useState('')
  const mutation = trpc.saveBrand.useMutation();
  const {data,isFetching} = trpc.userById.useQuery()
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    mutation.mutate({ name,url,description });
    setName('')
    setUrl('')
    setName('')
  }
  if (isFetching) return <Loading/>
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 ">
      <form className='w-1/2 mb-8' onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Brand</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">urlt</label>
        <input type="text" id="url" value={url} onChange={(e)=> setUrl(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Description</label>
        <textarea id="description"  value={description} onChange={(e)=> setDescription(e.target.value)}className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3" placeholder="Leave a comment..." required/>
        <button type="submit" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">save</button>
      </form>
      <div className="grid grid-cols-4 gap-12">
      {data?.map((user)=>(
        <>
         <Card title={user.name} subTitle={user.url} className="max-w-5rem col-span-4 md:col-span-2 sm:col-span-1" key={user.id}>
            <p className="m-0">
              {user.descriptions}
            </p>
         </Card>
        </>
      ))}
      </div>
    </main>
  )
}

function Loading() {
  return <h1>🌀 Loading...</h1>;
}