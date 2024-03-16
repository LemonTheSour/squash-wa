"use client";
import { useState, useEffect } from "react";

interface PlayerCardProps {
  position: string;
  name: string;
  rating: string;
}

export default function PlayerCard({
  position,
  name,
  rating,
}: PlayerCardProps) {
  const [colour, setColour] = useState("white");

  useEffect(() => {
    if (Number(position) < 4) {
      setColour("gold");
    }
  }, [position]);

  return (
    <div
      className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl"
      style={{ backgroundColor: colour }}
    >
      <div className="flex">
        <div className="pr-2">{position} .</div>
        <div>{name}</div>
      </div>
      <div>{rating}</div>
    </div>
  );
}
