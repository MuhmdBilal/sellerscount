
import React, { useEffect, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import {
  deleteNotes,
  getNotes,
  putNotes,
  saveNote,
} from "../../../Service/services";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

interface TextAreaProps {
  data: any;
  productDetails?: any;
  setAllNotes?: any;
  textAreas?: any;
  notes?: any;
  searchResult: any;
  setIsLoading: any;
  setTextAreas: any;
  setIsEditable: any;
  isEditAble: any;
}

const TextArea = ({
  productDetails,
  setAllNotes,
  textAreas,
  searchResult,
  setIsLoading,
  setTextAreas,
  setIsEditable,
  isEditAble,
}: TextAreaProps) => {
  const [noteDeleteLoading, setNoteDeleteLoading] = useState<any>(null);
  const [errorMessages, setErrorMessages] = useState<{ [key: number]: string }>(
    {}
  );
  const [originalNotes, setOriginalNotes] = useState<{ [key: number]: any }>(
    {}
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
    id: number
  ) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index] = { ...newTextAreas[index], note: e.target.value };
    setTextAreas(newTextAreas);
    setErrorMessages((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[id];
      return updatedState;
    });
  };

  const handleSaveNote = async (item: any) => {
    try {
      if (!item.note.trim()) {
        setErrorMessages((prevState) => ({
          ...prevState,
          [item.id]: "Note cannot be empty.",
        }));
        return;
      }
      setIsLoading(true);
      if (typeof item.id === "number") {
        const object = {
          asin: searchResult,
          note: item.note,
        };
        await saveNote(object);
      } else {
        const object = {
          asin: searchResult,
          noteId: item.id,
          newNote: item.note,
        };
        await putNotes(object);
        toggleEdit(item.id, false);
      }
      getAllNote();
    } catch (e) {
      console.error("Error saving note:", e);
    }
  };

  const getAllNote = async () => {
    try {
      let noteArray = [];
      const getNote = await getNotes(searchResult);
      if (getNote?.data?.notes.length > 0) {
        for (const note of getNote?.data?.notes) {
          const object = {
            id: note?.id,
            note: note?.note,
          };
          noteArray.push(object);
          setOriginalNotes((prev) => ({ ...prev, [note.id]: note.note }));
        }
        setTextAreas(noteArray);
      }
    } catch (e) {
      console.log("e", e);
    } finally {
      setIsLoading(false);
    }
  };
  const toggleEdit = (id: any, value: boolean) => {
    setIsEditable((prev: any) => ({ ...prev, [id]: value }));
    if (!value) {
      setTextAreas((prev: any) =>
        prev.map((item: any) =>
          item.id === id
            ? { ...item, note: originalNotes[id] || item.note }
            : item
        )
      );
    }
  };

  const removeTextArea = (id: any) => {
    const newTextAreas = textAreas.filter((item: any) => {
      return item.id !== Number(id);
    });
    setTextAreas(newTextAreas);
  };

  const handleDeleteNote = async (noteId: any) => {
    try {
      setNoteDeleteLoading(noteId);
      const response = await deleteNotes(noteId);
      if (response) {
        const newTextAreas = textAreas.filter((item: any) => {
          return item.id !== noteId;
        });
        setTextAreas(newTextAreas);
      }
    } catch (err: any) {
      toast.error(err?.message ?? err);
    } finally {
      setNoteDeleteLoading(null);
    }
  };

  useEffect(() => {
    if (searchResult) getAllNote();
  }, [searchResult]);

  return (
    <div>
      {textAreas?.map((item: any, index: number) => (
        <div key={index} className="default-textarea d-flex mt-1 nat-note">
          <div className="nat-note-left">
            <textarea
              name="note"
              className="textarea-note-text"
              value={item.note}
              onChange={(e) => handleChange(e, index, item.id)}
              disabled={!isEditAble[item.id]}
            />
            {errorMessages[item.id] && (
              <div className="error-message-textarea">
                {errorMessages[item.id]}
              </div>
            )}
          </div>
          <div className="d-flex flex-column gap-1">
            {typeof item.id === "number" ? (
              <>
                <button
                  className="btn-refresh seller-btn"
                  onClick={() => handleSaveNote(item)}
                >
                  <BiSolidSave className="icon-text" />
                </button>
                <button
                  className="btn-refresh seller-btn"
                  onClick={() => removeTextArea(item.id.toString())}
                >
                  <IoClose className="icon-text" />
                </button>
              </>
            ) : (
              <>
                {isEditAble[item.id] ? (
                  <>
                    <button
                      className="btn-refresh seller-btn"
                      onClick={() => handleSaveNote(item)}
                    >
                      <BiSolidSave className="icon-text" />
                    </button>
                    <button
                      className="btn-refresh seller-btn"
                      onClick={() => toggleEdit(item.id, false)}
                    >
                      <IoClose className="icon-text" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn-refresh seller-btn"
                      onClick={() => toggleEdit(item.id, true)}
                    >
                      <FaPenToSquare className="icon-text" />
                    </button>
                    <button
                      className="btn-refresh seller-btn"
                      onClick={() => handleDeleteNote(item.id)}
                      disabled={!!noteDeleteLoading}
                    >
                      {noteDeleteLoading === item.id ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <RiDeleteBinLine size={18} />
                      )}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextArea;