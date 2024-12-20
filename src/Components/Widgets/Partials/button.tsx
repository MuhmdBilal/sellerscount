import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { IoStar } from "react-icons/io5";

interface OffersProps {
  data: any;
  type?: string;
  productDetails?: any;
  getAllNotes?: any;
  notes?: any;
  setAllNotes?: any;
}
const Button = ({
  data,
  type,
  productDetails,
  getAllNotes,
  notes,
  setAllNotes,
}: OffersProps) => {
  return (
    <>
      <div className="offers-content d-flex gap-2 flex-wrap">
        {data?.map((item: any, rowIndex: any) =>
          item.type === "icon" ? (
            <Link
              key={rowIndex}
              to={item.link}
              target={item.target}
              // type="button"
              className="btn-refresh seller-btn"
            >
              {type === "notes" ? <IoStar /> : <TiHome />}
            </Link>
          ) : item.type === "button" ? (
            <button
              key={rowIndex}
              type="button"
              // onClick={() => addTextArea()}
              className="btn-refresh seller-btn"
            >
              {item.title}
            </button>
          ) : (
            <Link
              key={rowIndex}
              to={item.link}
              className="btn-refresh seller-btn"
              target={item.target}
              rel="noopener noreferrer"
            >
              {item.title}
            </Link>
          )
        )}
      </div>

      {/* {
        type && (
        textAreas.map((id) => ( */}
      {/* <div
        // key={id}
        className="text-area-wrapper"
      >
        <TextArea
          data={[]}
          handleClose={removeTextArea}
          productDetails={productDetails}
          notes={notes}
          setAllNotes={setAllNotes}
          textAreas={textAreas}
        />
      </div> */}
      {/* )
         ))
       } */}
    </>
  );
};

export default Button;
