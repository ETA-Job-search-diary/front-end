'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DateFormatter, DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';

const formatCaption: DateFormatter = (month, options) =>
  format(month, 'yyyy년 M월', { locale: options?.locale });

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
//TODO: 터치 이벤트 추가
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      formatters={{ formatCaption }}
      showOutsideDays={showOutsideDays}
      locale={ko}
      className={cn(
        'h-80 w-full min-w-max p-4 web:h-full web:p-5 web:pb-0',
        className,
      )}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'w-full flex justify-between items-center pl-1.5',
        caption_label: 'text-xs font-bold web:font-semibold',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 bg-transparent p-0 hover:opacity-100',
        ),
        nav_button_previous: 'mr-3',
        nav_button_next: 'ml-3',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex justify-between w-full',
        head_cell:
          'text-muted-foreground rounded-[9999px] w-7 web:w-9 font-normal text-xxs',
        row: 'flex justify-between w-full mt-1 web:mt-2',
        cell: 'rounded-[9999px] text-center text-xs web:text-xxs p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-[999px] last:[&:has([aria-selected])]:rounded-[9999px] focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 web:p-3 font-normal aria-selected:opacity-100 rounded-[9999px]',
        ),
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-5 w-5 text-[#949494] hover:text-black active:scale-110" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className=" h-5 w-5 text-[#949494] hover:text-black active:scale-110" />
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
