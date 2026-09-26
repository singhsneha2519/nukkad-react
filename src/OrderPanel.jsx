const MODES = ["Delivery", "Dine in", "Take away"];

export default function OrderPanel({ cart, bump, mode, setMode, whatsapp }) {
  const keys = Object.keys(cart);
  const total = keys.reduce((sum, k) => sum + cart[k].price * cart[k].qty, 0);
  const lines = keys.map(
    (k) => `${cart[k].qty} x ${cart[k].name}${cart[k].size ? ` (${cart[k].size})` : ""}`
  );
  const message = `Hi, order for ${mode}:\n${lines.join("\n")}\nTotal: ₹${total}`;
  const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <aside className="bg-white border border-line rounded-2xl p-5 sticky top-4 self-start">
      <h3 className="text-xl mb-3">Your order</h3>

      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`text-xs font-bold rounded-lg py-2 border ${
              mode === m ? "bg-band border-accent" : "border-line"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {keys.length === 0 && (
        <p className="text-sm text-muted py-2">Your order is empty. Add something from the menu.</p>
      )}

      {keys.map((k) => (
        <div key={k} className="flex justify-between items-center border-b border-line py-2 text-sm">
          <div>
            {cart[k].name}
            <small className="block text-muted">
              {cart[k].size ? `${cart[k].size} · ` : ""}₹{cart[k].price}
            </small>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              aria-label={`Remove one ${cart[k].name}`}
              onClick={() => bump(k, -1)}
              className="w-7 h-7 rounded-full border border-line bg-band"
            >
              −
            </button>
            <span>{cart[k].qty}</span>
            <button
              aria-label={`Add one ${cart[k].name}`}
              onClick={() => bump(k, 1)}
              className="w-7 h-7 rounded-full border border-line bg-band"
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between font-bold text-lg py-3">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={keys.length === 0}
        className={`block text-center rounded-full py-3 text-sm font-bold text-[#2B1200] bg-accent ${
          keys.length === 0 ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        PLACE ORDER ON WHATSAPP
      </a>
    </aside>
  );
}
