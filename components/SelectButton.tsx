import { SelectButtonProps } from '@/entries/Entries'
import { Button } from './ui/button'


const SelectButton = ({ setSelectedChoice, selectedChoice, index, option }: SelectButtonProps) => {
  return (
    <>
      <Button
        key={`${option}-${index}`}
        variant={selectedChoice === index ? "default" : "outline"}
        className="justify-start w-full py-8 mb-4"
        onClick={() => setSelectedChoice(index)}
      >
        <div className="flex items-center">
          <div className="p-2 px-3 mr-5 border rounded-md">{index + 1}</div>
          <div className='text-wrap'>{option || "No option provided"}</div>
        </div>
      </Button>
    </>
  )
}

export default SelectButton