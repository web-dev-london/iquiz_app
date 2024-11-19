import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TrophyStar from '@/assets/trophy-star.png';
import TrophySilver from '@/assets/2nd-place.png';
import TrophyBronze from '@/assets/3rd-place.png';
import awardIcon from "@/assets/award.png";
import Image, { StaticImageData } from "next/image";
import { ResultProps } from "@/entries/Entries";



const ResultsCard = ({ accuracy }: ResultProps) => {

  let TrophyImage: StaticImageData;

  if (accuracy > 75) {
    TrophyImage = TrophyStar;
  } else if (accuracy > 25) {
    TrophyImage = TrophySilver;
  } else {
    TrophyImage = TrophyBronze;
  }

  const listOfTrophies = accuracy > 75 ? (
    <>
      <Image src={TrophyImage} alt="trophy" width={110} height={110} priority />
      <div className="flex flex-col justify-center items-center text-xl font-semibold text-yellow-400">
        <span className="">Impressive!</span>
      </div>
    </>
  ) : accuracy > 25 ? (
    <>
      <Image priority src={TrophyImage} alt="trophy" width={110} height={110} />
      <div className="flex flex-col text-2xl font-semibold text-stone-400">
        <span className="">Good job!</span>
      </div>
    </>
  ) : (
    <>
      <Image priority src={TrophyImage} alt="trophy" width={110} height={110} />
      <div className="flex flex-col text-2xl font-semibold text-yellow-800">
        <span className="">Nice try!</span>
      </div>
    </>
  );


  return (
    <Card className="md:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl font-bold">Results</CardTitle>
        <Image priority src={awardIcon} alt="award" width={30} height={30} />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-3/5">
        {listOfTrophies}
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
