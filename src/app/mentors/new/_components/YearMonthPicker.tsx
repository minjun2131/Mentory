'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { YearMonthCalendar } from '@/components/ui/yearMonthCalendar';
import { UseFormReturn } from 'react-hook-form';

interface YearMonthDatePickerProps {
  name: string;
  placeholder: string;
  formReturn: UseFormReturn;
}

export function YearMonthDatePicker({ name, placeholder, formReturn }: YearMonthDatePickerProps) {
  const { watch, setValue } = formReturn;
  const date: Date = watch(name);

  const handleDateClick = (date: Date | undefined) => {
    setValue(name, date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn('', !date && 'text-muted-foreground')}>
          <CalendarIcon className="mr-1 h-4 w-4" />
          {date ? format(date, 'yyyy-MM-dd') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <YearMonthCalendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={watch(name)}
          onSelect={handleDateClick}
          fromYear={1940}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  );
}
