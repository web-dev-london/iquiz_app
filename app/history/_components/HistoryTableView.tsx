
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { HistoryTableViewProps } from "@/entries/Entries"
import { columns } from '@/helper/links'
import { ChevronDown, ChevronUp, Clock, CopyCheck, Edit2 } from 'lucide-react'
import { default as Link, default as NextLink } from 'next/link'
import DeleteButton from '../../../components/DeleteButton'


const HistoryTableView = async ({ games, searchParams }: HistoryTableViewProps) => {

  const listOfTableHead = columns.map((column, index) => (
    <TableHead key={`${column}-${index}`} className="px-4 py-2 text-left text-sm font-semibold text-slate-900 dark:text-gray-200">
      <NextLink
        className="flex items-center"
        href={{
          query: {
            ...searchParams,
            orderBy: column.value
          }
        }}
      >
        {column.label}
        {searchParams.orderBy === column.value ?
          <ChevronUp className="ml-1 h-4 w-4" />
          : <ChevronDown className="ml-1 h-4 w-4" />
        }
      </NextLink>
    </TableHead>
  ))

  const listOfTableBody = games.map((game) => (
    <TableRow key={game.id} className="border-t border-slate-200 dark:border-gray-600">
      <TableCell className="px-4 py-3">
        {game.gameType === 'mcq' ? (
          <CopyCheck className="h-4 w-4 inline mr-1" />
        ) : (
          <Edit2 className="h-4 w-4 inline mr-1" />
        )}
        {game.gameType === 'mcq' ? 'Multiple Choice' : 'Open-Ended'}
      </TableCell>
      <TableCell className="px-4 py-3">
        <Link href={`/statistics/${game.id}`} className="text-base font-medium leading-none underline dark:text-blue-400">
          {game.topic}
        </Link>
      </TableCell>
      <TableCell className="px-4 py-3 ">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 dark:text-gray-400" />
          {new Date(game.timeEnded ?? 0).toLocaleDateString()}
        </div>
      </TableCell>
      <TableCell className="px-4 py-3">
        <DeleteButton id={game.id} />
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      <div className="my-6 overflow-hidden rounded-lg border border-slate-200 dark:border-gray-700">
        <Table className="min-w-full bg-white dark:bg-gray-800">
          <TableHeader className="bg-slate-100 dark:bg-gray-700">
            <TableRow>
              {listOfTableHead}
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-slate-900 dark:text-gray-200" >Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-slate-800 dark:text-gray-200">
            {listOfTableBody}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
export default HistoryTableView;