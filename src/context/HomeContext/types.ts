export type HomeContextType = {
  tabOptions: string[];
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  minimalCards: boolean;
  setMinimalCards: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTraits: string[];
  setSelectedTraits: React.Dispatch<React.SetStateAction<string[]>>;
  dropdownOptions: string[];
  selectedDropdownOption: string;
  setSelectedDropdownOption: React.Dispatch<React.SetStateAction<string>>;
};