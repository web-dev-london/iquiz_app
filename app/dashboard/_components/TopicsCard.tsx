
// import prisma from '@/prisma/client'
import Image from 'next/image';
import trend from '@/assets/trend.png';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import prisma from '@/prisma/client';
import WordCloudView from '../../../components/WordCloudView';


const TopicsCard = async () => {

  const topics = await prisma.topic_count.findMany({});
  const formattedTopics = topics.map((topic) => {
    return {
      text: topic.topic,
      value: topic.count,
    };
  });

  return (
    <>
      <Card className="col-span-4">

        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">
            Topics
          </CardTitle>
          <Image src={trend} alt="trend" width={30} height={30} priority />
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
          <WordCloudView formattedTopics={formattedTopics} />
        </CardContent>
      </Card>
    </>
  )
}

export default TopicsCard
