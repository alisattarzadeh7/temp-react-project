import React, { useEffect } from 'react';
import {
  Picker,
  format,
  newDate,
  DatePickerConfig,
} from '@persian-tools/persian-mobile-datepicker';

const config: DatePickerConfig = {
  year: {
    caption: {
      text: 'سال',
    },
  },
  month: {
    caption: {
      text: 'ماه',
    },
  },
  day: {
    caption: {
      text: 'روز',
    },
  },
};

export default (props) => {
  const [selectedDateEvents, setSelectedDateEvents] = React.useState([]);

  function handleSubmit(selectedDate) {
    const date = format(selectedDate.date, 'yyyy/MM/dd');
    const { events } = selectedDate;

    props.setSelectedDate(date);
    setSelectedDateEvents(events);
  }

  useEffect(() => () => {
    let isMounted = true;
    if (isMounted) {
      props.setShowDatepicker(false);
    }
    return () => {
      isMounted = false;
    };
    }, []);

  return (
    <Picker
      isOpen={props.showDatepicker}
      config={config}
      minDate={newDate({ year: 1300, month: 1, day: 0 })}
      maxDate={newDate({ year: 1400, month: 12, day: 31 })}
      onSubmit={handleSubmit}
      onChange={handleSubmit}
      onClose={() => props.setShowDatepicker(false)}
      highlightWeekends
    />
  );
};
