import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';


type Props = {
  limit: number;
  handleLimitChange: (value: string) => void;
}

const SelectLimitView = ({ limit, handleLimitChange }: Props) => {
  return (
    <div className="relative inline-block">
      <Select onValueChange={handleLimitChange}>
        <SelectTrigger className=" flex justify-evenly items-center w-16 h-[35px] border border-gray-300 rounded-md shadow-sm focus:outline-none ">
          <SelectValue placeholder={limit.toString()}>{limit}</SelectValue>
          <ChevronDown size={22} />
        </SelectTrigger>
        <SelectContent className="mt-1 p-2 dark:bg-gray-800 rounded-md shadow-lg w-16 text-center">
          <SelectGroup>
            {[2, 4, 6, 8, 10, 12, 14, 16].map((value) => (
              <SelectItem
                key={value}
                value={value.toString()}
                className='hover:bg-gray-300 dark:hover:bg-gray-600 rounded-sm'
              >
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectLimitView