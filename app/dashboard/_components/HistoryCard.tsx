'use client';
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import history from '@/assets/time.png';

const HistoryCard = () => {
  const router = useRouter();

  return (
    <>
      <Card
        className="hover:cursor-pointer hover:opacity-75"
        onClick={() => {
          router.push("/history");
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">History</CardTitle>
          <Image src={history} alt="history" width={30} height={30} priority />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            View past quiz attempts.
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default HistoryCard
