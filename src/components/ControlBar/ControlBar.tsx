import { IoOptionsOutline, IoSearchSharp } from "react-icons/io5";
import { RiArrowDownSLine, RiArrowLeftSLine } from "react-icons/ri";
import { BsFillGridFill, BsFillGrid3X3GapFill, BsCheck } from "react-icons/bs";
import "./ControlBar.css";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type Props = {
  isInItemsSection: boolean;
};

const ControlBar = ({ isInItemsSection }: Props) => {
  const {
    setShowFilters,
    showFilters,
    setMinimalCards,
    minimalCards,
    selectedTraits,
    dropdownOptions,
    selectedDropdownOption,
    setSelectedDropdownOption,
  } = useHomeContext()!;
  const dropdownRef = useRef(null);
  const [showDropdownOptions, setShowDropdownOptions] = useState(false);

  useOutsideClick(
    dropdownRef,
    setShowDropdownOptions,
    "control_dropdown_trigger"
  );

  return (
    <div className={`control_bar ${isInItemsSection ? "" : "hide"}`}>
      <button
        className="filter_button"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? (
          <RiArrowLeftSLine size={20} />
        ) : (
          <IoOptionsOutline size={20} />
        )}{" "}
        Filters{" "}
        {selectedTraits.length > 0 && (
          <div className="filter_counter">{selectedTraits.length}</div>
        )}
      </button>

      <div className="control_bar_search">
        <input type="text" placeholder="Search" />
        <IoSearchSharp size={20} />
      </div>

      <div className="control_dropdown_parent">
        <button
          className="control_dropdown_trigger"
          onClick={() => setShowDropdownOptions(!showDropdownOptions)}
        >
          {selectedDropdownOption} <RiArrowDownSLine size={20} />
        </button>

        {showDropdownOptions && (
          <div className="control_dropdown_list" ref={dropdownRef}>
            {dropdownOptions.map((option) => {
              const isSelected = selectedDropdownOption == option;
              return (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedDropdownOption(option);
                    setShowDropdownOptions(false);
                  }}
                >
                  {option}
                  {isSelected && <BsCheck size={15} display="block" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid_buttons">
        <button
          onClick={() => {
            setMinimalCards(true);
          }}
        >
          <BsFillGridFill opacity={minimalCards ? 0.25 : 1} size={20} />
        </button>
        <button
          onClick={() => {
            setMinimalCards(false);
          }}
        >
          <BsFillGrid3X3GapFill opacity={!minimalCards ? 0.25 : 1} size={20} />
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
