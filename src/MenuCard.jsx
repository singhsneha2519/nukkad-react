import { useState } from "react";

const TINTS = {
  Coffee: ["#e2c3a3", "#8f5f3d"],
  "Non-coffee": ["#e6c9a0", "#a8703a"],
  Food: ["#e6b79a", "#9a5136"],
  Snack: ["#e8c58f", "#a1682b"],
  Dessert: ["#d9a98f", "#5d3424"],
};

export default function MenuCard({ item, size, onSize, onAdd, largeExtra }) {
  const [a, b] = TINTS[item.category] || ["#ddd", "#999"];
  const [imgFailed, setImgFailed] = useState(!item.image);
  return (
    <div className="bg-white border border-line rounded-2xl p-3 flex flex-col">
      {imgFailed ? (
        <div
          className="aspect-[4/3] rounded-xl mb-2"
          style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
        />
      ) : (
        <img
          src={item.image}
          alt={item.name}
          onError={() => setImgFailed(true)}
          className="aspect-[4/4] rounded-xl mb-2 object-cover w-full"
        />
      )}
      <div className="flex justify-between items-baseline">
        <h3 className="text-lg">{item.name}</h3>
        <span className="font-bold">₹{item.price}</span>
      </div>
      <p className="text-sm text-muted my-1 flex-1">{item.desc}</p>

      {item.hasSize && (
        <div className="flex gap-2 mb-2">
          {["Small", "Large"].map((s) => (
            <button
              key={s}
              onClick={() => onSize(item.name, s)}
              aria-pressed={size === s}
              className={`text-xs font-semibold rounded-full px-3 py-1 border ${
                size === s ? "bg-band border-accent" : "border-line"
              }`}
            >
              {s}
              {s === "Large" ? ` +₹${largeExtra}` : ""}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => onAdd(item, item.hasSize ? size || "Small" : "")}
        className="bg-brown text-white rounded-full py-2 text-sm font-bold"
      >
        ADD TO ORDER
      </button>
    </div>
  );
}
