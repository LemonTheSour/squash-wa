"use client";

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
  return (
    <div>
      {Number(position) < 4 ? (
        <div className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl bg-yellow-400">
          <div className="flex">
            <div className="pr-2">{position} .</div>
            <div>{name}</div>
          </div>
          <div>{rating}</div>
        </div>
      ) : (
        <div className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl">
          <div className="flex">
            <div className="pr-2">{position} .</div>
            <div>{name}</div>
          </div>
          <div>{rating}</div>
        </div>
      )}
    </div>
  );
}
