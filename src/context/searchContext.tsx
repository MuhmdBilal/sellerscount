import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SearchContextValue {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>,
  isGobalFilter: any,
  setIsGobalFilter: any
}

export const SearchContext = createContext<SearchContextValue | undefined>(
  undefined
);

interface SearchStateProps {
  children: ReactNode;
}

const SearchState: React.FC<SearchStateProps> = (props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isGobalFilter, setIsGobalFilter] = useState<string>("");
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue, setIsGobalFilter, isGobalFilter }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
