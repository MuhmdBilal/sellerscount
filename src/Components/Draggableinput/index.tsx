import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormControlLabel, Switch } from "@mui/material";
import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { BsArrowsMove } from "react-icons/bs";
import "./index.css";

interface Box {
  id: string;
  content: string;
  placeholder?: string;
  checked?: boolean;
}

const SortableItem = ({
  id,
  content,
  placeholder,
  checked,
  onContentChange,
  onSwitchToggle,
  activeId,
}: Box & {
  activeId: string | null;
  onContentChange: (id: string, newContent: string) => void;
  onSwitchToggle: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: activeId === id ? 1000 : "auto",
  };

  const isSpecialItem = ["23", "20", "11", "8"].includes(id);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Col lg={12} md={12} xs={12}>
        <Form.Group className="form-group-panel btn-input hello-world">
          <input
            type="text"
            value={content}
            placeholder={placeholder}
            maxLength={50}
            onChange={(e) => onContentChange(id, e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch checked={checked} onChange={() => onSwitchToggle(id)} />
            }
            label=""
            className="switch-panels"
          />
          {isSpecialItem && (
            <button className="btn-configure me-2">Configure</button>
          )}
          <BsArrowsMove className="icon-move move-input-icon" />
        </Form.Group>
      </Col>
    </div>
  );
};

const DraggableInputs: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    { id: "1", content: "", placeholder: "Quick Info", checked: true },
    { id: "2", content: "", placeholder: "Ranks & Prices", checked: true },
    { id: "3", content: "", placeholder: "Alerts", checked: false },
    { id: "4", content: "", placeholder: "Buy Box Analysis", checked: true },
    { id: "5", content: "", placeholder: "Charts", checked: true },
    { id: "6", content: "", placeholder: "Profit Calculator", checked: true },
    { id: "7", content: "", placeholder: "Variations(Beta)", checked: true },
    // { id: "8", content: "", placeholder: "Google Sheets", checked: true },
    { id: "8", content: "", placeholder: "Notes & Tags", checked: true },
    // { id: "10", content: "", placeholder: "Discounts", checked: true },
    // { id: "11", content: "", placeholder: "Arbitage Hero Reverse Search", checked: true },
    // { id: "12", content: "", placeholder: "VAT Settings", checked: true },
    // { id: "13", content: "", placeholder: "European Marketplaces", checked: true },
    { id: "9", content: "", placeholder: "Offers", checked: true },
    // { id: "15", content: "", placeholder: "Lookup Details", checked: true },
    // { id: "16", content: "", placeholder: "Geo Location", checked: true },
    { id: "10", content: "", placeholder: "eBay", checked: true },
    { id: "11", content: "", placeholder: "Seller Central", checked: true },
    { id: "12", content: "", placeholder: "Search Again", checked: true },
    // { id: "20", content: "", placeholder: "Seller Tool Kit", checked: true },
    { id: "13", content: "", placeholder: "R.O.I", checked: true },
    { id: "14", content: "", placeholder: "Keepa", checked: true },
    // { id: "23", content: "", placeholder: "BQool", checked: true },
  ]);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = ({ active, over }: any) => {
    setActiveId(null);
    if (active.id !== over.id) {
      setBoxes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleContentChange = (id: string, newContent: string) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id ? { ...box, content: newContent } : box
      )
    );
  };

  const handleSwitchToggle = (id: string) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id ? { ...box, checked: !box.checked } : box
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={boxes} strategy={verticalListSortingStrategy}>
        {boxes.map((box) => (
          <SortableItem
            key={box.id}
            id={box.id}
            content={box.content}
            placeholder={box.placeholder}
            checked={box.checked}
            activeId={activeId}
            onContentChange={handleContentChange}
            onSwitchToggle={handleSwitchToggle}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DraggableInputs;
