import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import QuizButtonTypes from "./QuizButtonTypes";
import { QuizFormProps } from "@/entries/Entries";



const QuizForm = ({ form, onSubmit, isPending }: QuizFormProps) => {
  return (
    <>
      <Form
        {...form}
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a topic"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide any topic you would like to be quizzed on
                  here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={() => (
              <FormItem>
                <FormLabel>Number of Questions</FormLabel>
                <FormControl>
                  <Input
                    placeholder="How many questions?"
                    type="number"
                    value={form.getValues("amount") || ""}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      if (!isNaN(value)) {
                        form.setValue("amount", value)
                      }
                    }}
                    min={1}
                    max={10}
                  />
                </FormControl>
                <FormDescription>
                  You can choose how many questions you would like to be
                  quizzed on here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <QuizButtonTypes
            formGetValues={form.getValues}
            formSetValues={form.setValue}
          />
          <Button
            disabled={isPending}
            type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}

export default QuizForm