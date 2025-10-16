import { TasksByDate } from '@/src/pages/list';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CustomCalendarProps {
  selectedDate: Date;
  onSelectDate: (day: Date) => void;
  tasks: TasksByDate;
}

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const CalendarView: React.FC<CustomCalendarProps> = ({
  selectedDate,
  onSelectDate,
  tasks,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = firstDayOfMonth.getDay(); 

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays: (Date | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <View style={{ marginVertical: 5, padding: 10, height: '51%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
      
      {/* Header com navegação de mês */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={{fontSize:20}}>⬅️</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold' }}>
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={{fontSize:20}}>➡️</Text>
        </TouchableOpacity>
      </View>

      {/* Dias da semana */}
      <View style={{ flexDirection: 'row' }}>
        {daysOfWeek.map((day, i) => (
          <Text
            key={i}
            style={{
              width: '14.28%',
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            {day}
          </Text>
        ))}
      </View>

      {/* Grid de dias */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {calendarDays.map((day, i) => {
          const isSelected =
            day &&
            selectedDate.getDate() === day.getDate() &&
            selectedDate.getMonth() === day.getMonth() &&
            selectedDate.getFullYear() === day.getFullYear();

          const key = day?.toISOString().split('T')[0];
          const hasTask = key && (tasks[key]?.length ?? 0) > 0;

          return (
            <TouchableOpacity
              key={i}
              disabled={!day}
              onPress={() => day && onSelectDate(day)}
              style={{
                width: '14.28%',
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                backgroundColor: isSelected ? '#ccc' : '#fff',
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 5,
                padding: 5,
              }}>
              {day ? (
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                  <Text>{day.getDate()}</Text>
                  {hasTask && <Text style={{ fontSize: 10 }}>📌</Text>}
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CalendarView;
