import { useState } from "react";
import "./NumericFilters.css";
import { RiArrowUpSLine } from "react-icons/ri";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import { NumericFiltersType } from "../../context/HomeContext/types";

type Props = {
  title: string;
  isRarity: boolean;
};

const NumericFilters = ({ title, isRarity }: Props) => {
  const { numericFilters, setNumericFilters } = useHomeContext()!;
  const { minFloorAskPrice, maxFloorAskPrice, minRarityRank, maxRarityRank } =
    numericFilters;
  const [showList, setShowlist] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (isMin: boolean, valueUpdate: string) => {
    let updatedValues: NumericFiltersType;
    setShowError(isNaN(Number(valueUpdate)));

    if (isRarity) {
      updatedValues = isMin
        ? { ...numericFilters, minRarityRank: valueUpdate }
        : { ...numericFilters, maxRarityRank: valueUpdate };
    } else {
      updatedValues = isMin
        ? { ...numericFilters, minFloorAskPrice: valueUpdate }
        : { ...numericFilters, maxFloorAskPrice: valueUpdate };
    }

    setNumericFilters(updatedValues);
  };

  return (
    <div className="numeric_filter">
      <button className="filter_trigger" onClick={() => setShowlist(!showList)}>
        {title}{" "}
        <RiArrowUpSLine
          className="status_down_arrow"
          aria-expanded={showList}
          size={20}
        />
      </button>
      <div className="minmax" aria-expanded={showList}>
        <input
          type="text"
          placeholder="Min"
          value={isRarity ? minRarityRank : minFloorAskPrice}
          onChange={(e) => {
            handleChange(true, e.target.value);
          }}
        />{" "}
        to
        <input
          type="text"
          placeholder="Max"
          value={isRarity ? maxRarityRank : maxFloorAskPrice}
          onChange={(e) => {
            handleChange(false, e.target.value);
          }}
        />
      </div>
      {showError && <p className="numeric_input_error">Numeric inputs only</p>}
    </div>
  );
};

export default NumericFilters;
