import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Sparkles, 
  Tag, 
  Trash2, 
  Calendar, 
  Smartphone,
  Star,
  Check
} from 'lucide-react';
import { TonalRoleSet, ThemeMode } from '../types';

interface InteractiveAppDemoProps {
  roles: TonalRoleSet;
  themeMode: ThemeMode;
  onShowSnackbar: (msg: string) => void;
}

interface NoteItem {
  id: string;
  title: string;
  category: 'Design' | 'System' | 'Inspiration';
  completed: boolean;
  starred: boolean;
  timestamp: string;
}

export const InteractiveAppDemo: React.FC<InteractiveAppDemoProps> = ({
  roles,
  themeMode,
  onShowSnackbar,
}) => {
  const [items, setItems] = useState<NoteItem[]>([
    {
      id: '1',
      title: 'Review Material Design 3 token spec for dynamic palettes',
      category: 'Design',
      completed: true,
      starred: true,
      timestamp: 'Today, 10:30 AM',
    },
    {
      id: '2',
      title: 'Verify WCAG AA contrast ratio for Tone 40 vs Tone 100',
      category: 'System',
      completed: false,
      starred: true,
      timestamp: 'Today, 2:15 PM',
    },
    {
      id: '3',
      title: 'Tune organic emphasized easing curve cubic-bezier(0.2, 0, 0, 1)',
      category: 'Inspiration',
      completed: false,
      starred: false,
      timestamp: 'Tomorrow, 9:00 AM',
    },
  ]);

  const [inputTitle, setInputTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Design' | 'System' | 'Inspiration'>('Design');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    const newItem: NoteItem = {
      id: Date.now().toString(),
      title: inputTitle.trim(),
      category: selectedCategory,
      completed: false,
      starred: false,
      timestamp: 'Just now',
    };

    setItems([newItem, ...items]);
    setInputTitle('');
    onShowSnackbar('Created new MD3 note item!');
  };

  const handleToggleComplete = (id: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const next = !item.completed;
        onShowSnackbar(next ? 'Task marked complete' : 'Task marked active');
        return { ...item, completed: next };
      }
      return item;
    }));
  };

  const handleToggleStar = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, starred: !item.starred } : item));
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    onShowSnackbar('Note removed');
  };

  const filteredItems = filterCategory === 'All' 
    ? items 
    : items.filter(i => i.category === filterCategory);

  return (
    <section id="playground" className="py-20 md:py-28 px-4 md:px-8 border-t"
      style={{
        backgroundColor: roles.surfaceContainerLowest,
        borderColor: `${roles.outline}20`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{
              backgroundColor: roles.secondaryContainer,
              color: roles.onSecondaryContainer,
            }}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Live Application Specimen
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: roles.onSurface }}>
            Material You in Real Use
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
            Test this live task & ideas organizer. Notice how every surface tone, chip,
            checkbox, and floating action button reacts in real time when you change the seed color.
          </p>
        </div>

        {/* Mock Device / App Frame */}
        <div
          className="max-w-3xl mx-auto rounded-[36px] md:rounded-[48px] p-6 md:p-10 border shadow-2xl transition-all"
          style={{
            backgroundColor: roles.surface,
            borderColor: `${roles.outline}30`,
          }}
        >
          {/* App Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b"
            style={{ borderColor: `${roles.outline}20` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm"
                style={{
                  backgroundColor: roles.primary,
                  color: roles.onPrimary,
                }}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: roles.onSurface }}>
                  Daily Horizon
                </h3>
                <span className="text-xs flex items-center gap-1" style={{ color: roles.onSurfaceVariant }}>
                  <Calendar className="w-3 h-3" />
                  Live Reactive State
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: roles.tertiaryContainer,
                  color: roles.onTertiaryContainer,
                }}
              >
                {items.filter(i => i.completed).length}/{items.length} Completed
              </span>
            </div>
          </div>

          {/* Quick Input Form */}
          <form onSubmit={handleAddItem} className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 group">
                <input
                  type="text"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  placeholder=" "
                  className="w-full h-14 px-4 pt-4 pb-1 rounded-t-xl text-sm font-medium border-b-2 outline-none transition-colors peer"
                  style={{
                    backgroundColor: roles.surfaceContainerLow,
                    borderColor: roles.outline,
                    color: roles.onSurface,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = roles.primary;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = roles.outline;
                  }}
                />
                <label
                  className="absolute left-4 top-2 text-[11px] font-medium transition-all pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[11px]"
                  style={{ color: roles.primary }}
                >
                  Create note or task item...
                </label>
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="h-14 px-4 rounded-xl text-xs font-semibold border outline-none cursor-pointer"
                  style={{
                    backgroundColor: roles.surfaceContainerLow,
                    borderColor: `${roles.outline}40`,
                    color: roles.onSurface,
                  }}
                >
                  <option value="Design">Design</option>
                  <option value="System">System</option>
                  <option value="Inspiration">Inspiration</option>
                </select>

                <button
                  type="submit"
                  className="h-14 px-6 rounded-full font-medium text-sm flex items-center justify-center gap-1.5 md-tap shadow-sm md-state-layer"
                  style={{
                    backgroundColor: roles.primary,
                    color: roles.onPrimary,
                  }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1">
              <span className="text-xs font-medium mr-1" style={{ color: roles.onSurfaceVariant }}>
                Filter:
              </span>
              {['All', 'Design', 'System', 'Inspiration'].map((cat) => {
                const isSelected = filterCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium md-tap border flex items-center gap-1 transition-all"
                    style={{
                      backgroundColor: isSelected ? roles.secondaryContainer : 'transparent',
                      color: isSelected ? roles.onSecondaryContainer : roles.onSurfaceVariant,
                      borderColor: isSelected ? roles.secondary : `${roles.outline}30`,
                    }}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    {cat}
                  </button>
                );
              })}
            </div>
          </form>

          {/* List of Note Items */}
          <div className="mt-6 space-y-3">
            {filteredItems.length === 0 ? (
              <div
                className="p-8 text-center rounded-2xl border border-dashed"
                style={{
                  borderColor: `${roles.outline}30`,
                  color: roles.onSurfaceVariant,
                }}
              >
                No items in this filter category. Add one above!
              </div>
            ) : (
              filteredItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group"
                    style={{
                      backgroundColor: item.completed
                        ? roles.surfaceContainerLowest
                        : roles.surfaceContainer,
                      borderColor: `${roles.outline}20`,
                      opacity: item.completed ? 0.75 : 1,
                    }}
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <button
                        onClick={() => handleToggleComplete(item.id)}
                        className="md-tap p-1 rounded-full flex-shrink-0"
                        title={item.completed ? 'Mark uncompleted' : 'Mark completed'}
                      >
                        {item.completed ? (
                          <CheckCircle2
                            className="w-5 h-5 transition-transform scale-105"
                            style={{ color: roles.primary }}
                          />
                        ) : (
                          <Circle
                            className="w-5 h-5 opacity-60 hover:opacity-100"
                            style={{ color: roles.onSurface }}
                          />
                        )}
                      </button>

                      <div className="min-w-0">
                        <p
                          className={`text-sm font-medium leading-snug truncate ${
                            item.completed ? 'line-through' : ''
                          }`}
                          style={{
                            color: item.completed ? roles.onSurfaceVariant : roles.onSurface,
                          }}
                        >
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                            style={{
                              backgroundColor:
                                item.category === 'Design'
                                  ? roles.primaryContainer
                                  : item.category === 'System'
                                  ? roles.secondaryContainer
                                  : roles.tertiaryContainer,
                              color:
                                item.category === 'Design'
                                  ? roles.onPrimaryContainer
                                  : item.category === 'System'
                                  ? roles.onSecondaryContainer
                                  : roles.onTertiaryContainer,
                            }}
                          >
                            {item.category}
                          </span>
                          <span className="text-[11px] opacity-60" style={{ color: roles.onSurfaceVariant }}>
                            {item.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleToggleStar(item.id)}
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        title="Star Note"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            item.starred ? 'fill-current' : 'opacity-40'
                          }`}
                          style={{
                            color: item.starred ? roles.primary : roles.onSurface,
                          }}
                        />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors opacity-40 hover:opacity-100"
                        title="Delete Note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
