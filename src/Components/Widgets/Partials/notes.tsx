import React, { useState } from "react";
import TextArea from "./textArea";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

interface NotesProps {
  data: any;
  productDetails: any;
  getAllNotes: any;
  notes?: any;
  setAllNotes?: any;
  searchResult: any;
}
const Notes = ({
  data,
  productDetails,
  getAllNotes,
  notes,
  setAllNotes,
  searchResult
}: NotesProps) => {
  const [textAreas, setTextAreas] = useState<any[]>([]);
  const [isLoading,setIsLoading] = useState(false)
  const [isEditAble, setIsEditable] = useState<{ [key: string]: boolean }>({});
  const addTextArea = () => {
    const newNoteId = Date.now();
    setTextAreas((prev: any) => [...prev, {
      id: newNoteId,
      note: ""
    }]);
    setIsEditable((prev : any) => ({ ...prev, [newNoteId]: true }));
  };
  return (
    <div id="notes" className="offers-content d-flex flex-column  flex-wrap ranks-offers">
          {isLoading ? (
          <div className="ranks-loader">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <></>
        )}
      <div className="d-flex gap-1">
        {data?.map((item: any, rowIndex: any) =>
          item.type === "icon" ? (
            <Link
              key={rowIndex}
              to={item.link}
              target={item.target}
              className="btn-refresh seller-btn"
            >
              <IoStar />
            </Link>
          ) : (
            <button
              key={rowIndex}
              type="button"
              onClick={() => addTextArea()}
              className="btn-refresh seller-btn"
            >
              {item.title}
            </button>
          )
        )}
      </div>
      <div className="text-area-wrapper">
        <TextArea
          data={[]}
          productDetails={productDetails}
          notes={notes}
          setAllNotes={setAllNotes}
          textAreas={textAreas}
          searchResult={searchResult}
          setIsLoading={setIsLoading}
          setTextAreas={setTextAreas}
          setIsEditable={setIsEditable}
          isEditAble={isEditAble}
        />
      </div>
    </div>
  );
};

export default Notes;
