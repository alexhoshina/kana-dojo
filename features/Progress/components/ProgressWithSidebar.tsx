'use client';
import { useState } from 'react';
import SimpleProgress from './SimpleProgress';
import StreakProgress from './StreakProgress';
import AchievementProgress from '@/features/Achievements/components/AchievementProgress';
import { TrendingUp, Flame, Trophy } from 'lucide-react';
import { useClick } from '@/shared/hooks/useAudio';
import SidebarLayout from '@/shared/components/layout/SidebarLayout';
import { ActionButton } from '@/shared/components/ui/ActionButton';

type ViewType = 'statistics' | 'streak' | 'achievements';

const viewOptions: { value: ViewType; label: string; icon: React.ReactNode }[] =
  [
    {
      value: 'statistics',
      label: 'Stats',
      icon: <TrendingUp className='w-5 h-5' />
    },
    { value: 'streak', label: 'Streak', icon: <Flame className='w-5 h-5' /> },
    {
      value: 'achievements',
      label: 'Achievements',
      icon: <Trophy className='w-5 h-5' />
    }
  ];

const ProgressWithSidebar = () => {
  const { playClick } = useClick();
  const [currentView, setCurrentView] = useState<ViewType>('statistics');

  return (
    <SidebarLayout>
      {/* View Toggle Switch */}
      <div className='flex justify-center px-2'>
        <div className='inline-flex flex-wrap justify-center rounded-2xl bg-[var(--card-color)] border border-[var(--border-color)] p-2 gap-2'>
          {viewOptions.map(option => {
            const isSelected = currentView === option.value;
            return (
              <ActionButton
                key={option.value}
                onClick={() => {
                  setCurrentView(option.value);
                  playClick();
                }}
                colorScheme={isSelected ? 'main' : undefined}
                borderColorScheme={isSelected ? 'main' : undefined}
                borderBottomThickness={isSelected ? 6 : 0}
                className={
                  isSelected
                    ? 'w-auto px-5 py-2.5 text-sm gap-1.5 sm:gap-2'
                    : 'w-auto px-5 py-2.5 text-sm gap-1.5 sm:gap-2 bg-transparent text-[var(--secondary-color)] hover:text-[var(--main-color)] hover:bg-[var(--border-color)]/50'
                }
              >
                {option.icon}
                <span className='max-sm:hidden'>{option.label}</span>
              </ActionButton>
            );
          })}
        </div>
      </div>
      {currentView === 'statistics' && <SimpleProgress />}
      {currentView === 'streak' && <StreakProgress />}
      {currentView === 'achievements' && <AchievementProgress />}
    </SidebarLayout>
  );
};

export default ProgressWithSidebar;
