import { ReactNode, createContext, useContext, useState } from "react";
import { HomeContextType } from "./types";

const HomeContext = createContext<HomeContextType | null>(null);

type Props = { children: ReactNode };

export const HomeContextProvider = ({ children }: Props) => {
  const tabOptions = ["Items", "Activity"];
  const dropdownOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Rarity: Low to High",
    "Rarity: High to Low",
    "Token ID: Low to High",
  ];
  const [currentTab, setCurrentTab] = useState(tabOptions[0]);
  const [minimalCards, setMinimalCards] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(
    dropdownOptions[0]
  );

  return (
    <HomeContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        tabOptions,
        minimalCards,
        setMinimalCards,
        showFilters,
        setShowFilters,
        selectedTraits,
        setSelectedTraits,
        dropdownOptions,
        selectedDropdownOption,
        setSelectedDropdownOption,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};