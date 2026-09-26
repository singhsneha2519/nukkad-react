import { useMemo, useState } from "react";
import cafe from "./cafe.json";
import MenuCard from "./MenuCard.jsx";
import OrderPanel from "./OrderPanel.jsx";

function useIsOpen() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === "hour").value) % 24;
  return hour >= cafe.openHour && hour < cafe.closeHour;
}

export default function App() {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [sizeSel, setSizeSel] = useState({});
  const [cart, setCart] = useState({});
  const [mode, setMode] = useState("Dine in");
  const open = useIsOpen();

  const filtered = useMemo(
    () =>
      cafe.menu.filter(
        (m) =>
          (cat === "All" || m.category === cat) &&
          m.name.toLowerCase().includes(query.toLowerCase())
      ),
    [cat, query]
  );

  function addToCart(item, size) {
    const key = `${item.name}|${size}`;
    const price = item.price + (size === "Large" ? cafe.largeExtra : 0);
    setCart((prev) => {
      const next = { ...prev };
      next[key] = next[key]
        ? { ...next[key], qty: next[key].qty + 1 }
        : { name: item.name, size, price, qty: 1 };
      return next;
    });
  }

  function bump(key, delta) {
    setCart((prev) => {
      const next = { ...prev };
      next[key] = { ...next[key], qty: next[key].qty + delta };
      if (next[key].qty <= 0) delete next[key];
      return next;
    });
  }

  const bookHref = `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to book a table for "
  )}`;

  return (
    <div className="bg-bg text-ink min-h-screen">
      {/* top bar */}
      <div className="bg-band text-sm text-muted">
        <div className="max-w-5xl mx-auto px-5 flex justify-between py-1.5 gap-3 flex-wrap">
          <span>Good coffee, good mood</span>
          <span>{cafe.hoursText}</span>
        </div>
      </div>

      {/* nav */}
      <nav className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
        <a href="#" className="font-display text-2xl tracking-wide leading-none">
          {cafe.name.toUpperCase()}
        </a>
        <div className="hidden md:flex gap-6 font-bold text-sm">
          <a href="#why">About</a>
          <a href="#menu">Menu</a>
          <a href="#visit">Visit</a>
        </div>
        <a href="#menu" className="bg-brown text-white rounded-full px-6 py-2.5 text-xs font-bold">
          ORDER ONLINE
        </a>
      </nav>

      {/* hero */}
      <header className="text-center px-5 py-16 bg-gradient-to-b from-band to-bg">
        <p className="italic text-muted text-xl">Welcome to {cafe.name}</p>
        <h1 className="text-5xl md:text-7xl font-bold my-3">{cafe.tagline}</h1>
        <p className="max-w-md mx-auto text-muted mb-6">{cafe.intro}</p>
        <a href="#menu" className="bg-brown text-white rounded-full px-6 py-3 text-xs font-bold">
          VIEW OUR MENU
        </a>
      </header>

      {/* menu + order */}
      <section id="menu" className="max-w-5xl mx-auto px-5 py-12">
        <h2 className="text-3xl text-center mb-2">Coffee menu</h2>
        <p className="text-muted text-center mb-6">
          Pick a size, add to your order, and send it to us on WhatsApp.
        </p>

        <div className="grid md:grid-cols-[1fr_320px] gap-6 items-start">
          <div>
            <input
              type="search"
              placeholder="Search the menu"
              aria-label="Search the menu"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-line rounded-full px-5 py-2.5 mb-4 bg-white"
            />
            <div className="flex flex-wrap gap-2 mb-5">
              {cafe.categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className={`rounded-full px-4 py-2 text-sm font-bold border ${
                    cat === c ? "bg-accent border-accent text-[#2B1200]" : "border-line bg-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="text-muted text-sm">Nothing matches that search. Try another word.</p>
            ) : (
              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))" }}>
                {filtered.map((item) => (
                  <MenuCard
                    key={item.name}
                    item={item}
                    size={sizeSel[item.name]}
                    onSize={(name, s) => setSizeSel((p) => ({ ...p, [name]: s }))}
                    onAdd={addToCart}
                    largeExtra={cafe.largeExtra}
                  />
                ))}
              </div>
            )}
          </div>

          <OrderPanel cart={cart} bump={bump} mode={mode} setMode={setMode} whatsapp={cafe.whatsapp} />
        </div>
      </section>

      {/* visit */}
      <section id="visit" className="bg-band">
        <div className="max-w-5xl mx-auto px-5 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl text-brown mb-3">Visit us today</h2>
            <p className="mb-4">
              Come for the coffee, stay for the good vibes. {cafe.address}.
            </p>
            <a href={cafe.mapsUrl} target="_blank" rel="noopener noreferrer" className="bg-brown text-white rounded-full px-6 py-2.5 text-xs font-bold mr-2">
              FIND OUR LOCATION
            </a>
            <a href={bookHref} target="_blank" rel="noopener noreferrer" className="bg-accent text-[#2B1200] rounded-full px-6 py-2.5 text-xs font-bold">
              BOOK A TABLE
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
             {["#b9a07f,#4c3624", "#d7b699,#6d4630", "#c2a17c,#3f2a1b"].map((g, i) => {
              const [a, b] = g.split(",");
               const src = cafe.visitImages && cafe.visitImages[i];
                 return src ? (
      <img
        key={i}
        src={src}
        alt=""
        className="aspect-[3/4] rounded-xl object-cover w-full"
        onError={(e) => { e.target.style.display = "none"; }}
      />
    ) : (
      <div
        key={i}
        className="aspect-[3/4] rounded-xl"
        style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
      />
    );
  })}
</div>


        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-5 py-8 text-sm text-muted flex justify-between flex-wrap gap-2">
        <span>Demo site built by Sneha.</span>
        <span>{open ? `Open now, until ${cafe.closeHour === 24 ? "midnight" : cafe.closeHour + ":00"}` : `Closed now, opens ${cafe.openHour}:00`}</span>
      </footer>
    </div>
  );
}
