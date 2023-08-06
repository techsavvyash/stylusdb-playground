'use client';

import { useWatch } from 'react-hook-form';
import type { WizardForm } from '.';
import type { ExploreChallengeFetcher } from '../explore';
import { ExploreCard } from '../explore/explore-card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { TypographyH3 } from '../ui/typography/h3';

interface Props {
  form: WizardForm;
}

export function ChallengeCardEditor({ form }: Props) {
  const difficulty = useWatch({ control: form.control, name: 'difficulty' });
  const title = useWatch({ control: form.control, name: 'name' });
  const shortDescription = useWatch({ control: form.control, name: 'shortDescription' });

  const data: Pick<
    Awaited<ReturnType<ExploreChallengeFetcher>>[0],
    'difficulty' | 'name' | 'shortDescription' | 'user' | '_count' | 'updatedAt'
  > = {
    difficulty,
    name: title || 'Your Title Here',
    shortDescription: shortDescription || 'Your Short Description Here',
    user: {
      name: 'You',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    _count: {
      vote: 100,
      comment: 50,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    updatedAt: new Date(),
  };
  return (
    <>
      <TypographyH3 className="mx-auto mb-4 max-w-fit lg:mb-6">Create Challenge Card</TypographyH3>
      <div className="flex flex-wrap items-start justify-center gap-4 xl:px-24">
        <div className="w-full sm:w-2/3 lg:w-[333px] xl:w-[392px]">
          <ExploreCard challenge={data} />
        </div>
        <div className="flex w-full flex-col gap-1 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 pt-[0.8rem] dark:border-neutral-800 dark:bg-neutral-900 sm:w-2/3 lg:w-[calc(333px+79px+16px)] xl:w-[calc(392px+79px+16px)]">
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="mt-2">Difficulty: </FormLabel>
                  <Select
                    onValueChange={field.onChange as (value: string) => void}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-xl bg-neutral-200 dark:bg-neutral-800">
                        <SelectValue placeholder="Select a difficulty for your challenge" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl border border-neutral-300 bg-neutral-200 shadow-[0_0_2rem_#0008] dark:border-neutral-700 dark:bg-neutral-800">
                      <SelectItem className="rounded-t-lg brightness-150" value="BEGINNER">
                        BEGINNER
                      </SelectItem>
                      <SelectItem className="brightness-150" value="EASY">
                        EASY
                      </SelectItem>
                      <SelectItem className="brightness-150" value="MEDIUM">
                        MEDIUM
                      </SelectItem>
                      <SelectItem className="brightness-150" value="HARD">
                        HARD
                      </SelectItem>
                      <SelectItem className="rounded-b-lg brightness-150" value="EXTREME">
                        EXTREME
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Challenge Title:</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-xl bg-neutral-200 dark:bg-neutral-800"
                    placeholder="Enter a Challenge Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a Short Description"
                    className="resize-none rounded-xl bg-neutral-200 dark:bg-neutral-800"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
}
