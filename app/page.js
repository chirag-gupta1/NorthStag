 "use client";

import { useEffect, useMemo, useState } from "react";

const WHATSAPP = "917071944000";

const products = [
  {
    id: "8-pocket-cargo",
    category: "Cargos",
    name: "8 Pocket Cargo",
    price: 1299,
    description:
      "Premium embroidered cargo built around utility, movement and everyday wear.",
    colors: ["Grey", "Brown", "Black", "Light Grey", "Mustard", "Green"],
    images: [
      "/images/Cargo/premium/1.png",
      "/images/Cargo/premium/2.png",
      "/images/Cargo/premium/3.png",
      "/images/Cargo/premium/4.png",
      "/images/Cargo/premium/5.png",
      "/images/Cargo/premium/6.png",
      
    ],
  },
  {
    id: "6-pocket-cargo",
    category: "Cargos",
    name: "6 Pocket Cargo",
    price: 1199,
    description:
      "A clean utility cargo with a practical pocket layout and North Stag detailing.",
    colors: ["Black", "Green", "Grey", "Brown", "Beige", "Light Grey"],
    images: [
      "/images/Cargo/Basic/1.png",
      "/images/Cargo/Basic/2.png",
      "/images/Cargo/Basic/3.png",
      "/images/Cargo/Basic/4.png",
      "/images/Cargo/Basic/5.png",
    ],
  },
  {
    id: "straight Fit",
    category: "Trousers",
    name: "Straight Fit Trousers",
    price: 699,
    description:
      "A straightforward everyday trouser with a clean silhouette.",
    colors: ["Black", "Beige", "Coffee", "Navy", "Brown", "Blue"],
    images: [
      "/images/Trousers/Straight/1.png",
      "/images/Trousers/Straight/2.jpg",
      "/images/Trousers/Straight/3.jpg",
    ],
  },
  {
    id: "bell-bottom",
    category: "Trousers",
    name: "Bell Bottom Trousers",
    price: 699,
    description:
      "A wider statement silhouette with the North Stag finish.",
    colors: ["Light Grey", "Beige", "Light Brown", "Coffee", "Brown", "Grey", "Cream"],
    images: [
      "/images/Trousers/BellBottom/1.png",
      "/images/Trousers/BellBottom/2.png",
      "/images/Trousers/BellBottom/3.png",
    ],
  },
  {
    id: "italian-gurkha",
    category: "Trousers",
    name: "Italian / Gurkha Trousers",
    price: 699,
    description:
      "A Gurkha-inspired trouser with a more distinctive, tailored character.",
    colors: ["Black", "Mustard", "Airforce", "Light Brown", "Grey", "Pista", "Brown", "Dark Brown"],
    images: [
      "/images/Trousers/Italian/1.png",
      "/images/Trousers/Italian/2.jpg",
      "/images/Trousers/Italian/3.jpg",
      "/images/Trousers/Italian/4.jpg",
    ],
  },
];

const sizes = ["30", "32", "34", "36"];

function money(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function whatsappUrl(product, size, color, quantity) {
  const message = [
    "Hello North Stag, I'd like to place an order.",
    "",
    `Product: ${product.name}`,
    `Size: ${size}`,
    `Color: ${color}`,
    `Quantity: ${quantity}`,
    `Price: ${money(product.price * quantity)}`,
    "",
    "Please let me know the next steps for completing the order.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [size, setSize] = useState("32");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const visibleProducts = useMemo(
    () =>
      filter === "All"
        ? products
        : products.filter((product) => product.category === filter),
    [filter]
  );

  function openProduct(product) {
    setSelected(product);
    setActiveImage(0);
    setSize("32");
    setColor(product.colors[0]);
    setQuantity(1);
  }
  useEffect(() => {
  if (!selected && !lightboxOpen) return;

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      if (lightboxOpen) {
        setLightboxOpen(false);
      } else {
        setSelected(null);
      }
    }

    if (lightboxOpen && selected && selected.images.length > 1) {
      if (event.key === "ArrowRight") {
        setActiveImage((current) =>
          (current + 1) % selected.images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveImage((current) =>
          (current - 1 + selected.images.length) %
          selected.images.length
        );
      }
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [selected, lightboxOpen]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="North Stag home">
          <div className="logo-slot">
            <img
              src=" /images/2.png"
              alt="North Stag"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "block";
              }}
            />
            <span className="logo-fallback">NORTH STAG</span>
          </div>
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          MENU
        </button>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#standard" onClick={() => setMenuOpen(false)}>The Standard</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a
            className="nav-order"
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">NORTH STAG / INDIA</p>
          <h1>
            Built for
            <br />
            movement.
            <br />
            <em>Made to last.</em>
          </h1>
          <p className="hero-text">
            Premium cargos and trousers made for everyday movement, with
            utility at the centre and the North Stag mark in the details.
          </p>
          <a className="button button-light" href="#collection">
            Explore collection <span>↘</span>
          </a>
        </div>

        <div className="hero-image-wrap">
          <img
            src="/images/Cargo/premium/4.png"
            alt="North Stag cargo collection"
            className="hero-image"
          />
          <div className="hero-caption">
            <span>08 / POCKET</span>
            <span>PREMIUM CARGO</span>
          </div>
        </div>
      </section>

      <div className="ticker" aria-label="North Stag features">
        <span>PAN INDIA DELIVERY</span>
        <span>PREMIUM QUALITY</span>
        <span>RETAIL ORDERS</span>
        <span>BUILT FOR MOVEMENT</span>
        <span>MADE TO LAST</span>
      </div>

      <section className="collection section" id="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / COLLECTION</p>
            <h2>Everyday utility.</h2>
          </div>
          <p>
            Cargos with purpose. Trousers with character. Choose your fit,
            choose your colour, then order directly through WhatsApp.
          </p>
        </div>

        <div className="filters" role="tablist">
          {["All", "Cargos", "Trousers"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product, index) => (
            <article className={`product-card ${index === 0 ? "featured" : ""}`} key={product.id}>
              <button className="product-image-button" onClick={() => openProduct(product)}>
                <div className="product-image">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.classList.add("image-placeholder");
                    }}
                  />
                  <span className="view-product">View product ↗</span>
                </div>
              </button>

              <div className="product-info">
                <div>
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                </div>
                <strong>{money(product.price)}</strong>
              </div>

              <div className="colour-line">
                <span>{product.colors.length} colours</span>
                <span>{sizes.join(" / ")}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto" id="standard">
        <div className="manifesto-mark">
  <img src="/images/2.png" alt="North Stag logo" />
</div>
        <div>
          <p className="eyebrow">02 / THE NORTH STAG STANDARD</p>
          <h2>
            Less noise.
            <br />
            More <em>character.</em>
          </h2>
          <p>
            North Stag is built around pieces that earn their place in your
            everyday wardrobe. Functional silhouettes, considered details and
            a finish that feels right in motion.
          </p>
        </div>
      </section>

      <section className="detail-band">
        <div>
          <span>01</span>
          <strong>UTILITY FIRST</strong>
          <p>Designed around movement and practical everyday wear.</p>
        </div>
        <div>
          <span>02</span>
          <strong>NORTH STAG DETAIL</strong>
          <p>The stag mark and embroidery keep the pieces recognisable.</p>
        </div>
        <div>
          <span>03</span>
          <strong>INDIA, FOR NOW</strong>
          <p>Pan India delivery included. International expansion to come.</p>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-main">
          <p className="eyebrow">03 / CONTACT</p>
          <h2>Ready when<br /><em>you are.</em></h2>
          <p>
            Browse the collection, choose your size and colour, and send your
            order directly to North Stag on WhatsApp.
          </p>
          <div className="contact-actions">
            <a
              className="button button-light"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="whatsapp-icon">◉</span> Order on WhatsApp
            </a>
            <a
              className="button button-outline"
              href="https://www.instagram.com/chirag_enterprises_ldh"
              target="_blank"
              rel="noreferrer"
            >
              Instagram ↗
            </a>
          </div>
        </div>

        <div className="contact-details">
          <div>
            <span>WHATSAPP</span>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
              +91 70719 44000
            </a>
          </div>
          <div>
            <span>INSTAGRAM</span>
            <a href="https://www.instagram.com/chirag_enterprises_ldh" target="_blank" rel="noreferrer">
              @chirag_enterprises_ldh
            </a>
          </div>
          <div>
            <span>EMAIL</span>
            <a href="mailto:Northstag.in@gmail.com">Northstag.in@gmail.com</a>
          </div>
          <div>
            <span>DELIVERY</span>
            <p>Pan India / Shipping included</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">NORTH STAG</div>
        <p>Built for movement, Made to last.</p>
        <p>© 2026 North Stag. All rights reserved.</p>
      </footer>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)} aria-label="Close">
              ×
            </button>

            <div className="modal-gallery">
              <button
  type="button"
  className="modal-image"
  onClick={() => setLightboxOpen(true)}
  aria-label={`View ${selected.name} image full size`}
>
  <img
    src={selected.images[activeImage]}
    alt={`${selected.name} — view ${activeImage + 1}`}
  />
  <span className="zoom-hint">TAP TO ENLARGE ↗</span>
</button>

              <button
                className="gallery-arrow gallery-prev"
                onClick={() =>
                  setActiveImage(
                    (activeImage - 1 + selected.images.length) %
                      selected.images.length
                  )
                }
                aria-label="Previous product image"
              >
                ←
              </button>

              <button
                className="gallery-arrow gallery-next"
                onClick={() =>
                  setActiveImage((activeImage + 1) % selected.images.length)
                }
                aria-label="Next product image"
              >
                →
              </button>

              <div className="gallery-thumbnails">
                {selected.images.map((image, index) => (
                  <button
                    key={image}
                    className={`gallery-thumb ${
                      activeImage === index ? "active" : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-content">
              <p className="product-category">{selected.category}</p>
              <h2>{selected.name}</h2>
              <div className="modal-price">{money(selected.price)}</div>
              <p>{selected.description}</p>

              <label>SIZE</label>
              <div className="option-row">
                {sizes.map((item) => (
                  <button
                    key={item}
                    className={size === item ? "selected" : ""}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <label>COLOUR</label>
              <div className="option-row wrap">
                {selected.colors.map((item) => (
                  <button
                    key={item}
                    className={color === item ? "selected" : ""}
                    onClick={() => setColor(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <label>QUANTITY</label>
              <div className="quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <a
                className="button button-dark full"
                href={whatsappUrl(selected, size, color, quantity)}
                target="_blank"
                rel="noreferrer"
              >
                Order on WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      )}
      {selected && lightboxOpen && (
  <div
    className="lightbox"
    onClick={() => setLightboxOpen(false)}
    role="dialog"
    aria-modal="true"
    aria-label={`${selected.name} full-size image`}
  >
    <button
      type="button"
      className="lightbox-close"
      onClick={() => setLightboxOpen(false)}
      aria-label="Close full-size image"
    >
      ×
    </button>

    {selected.images.length > 1 && (
      <>
        <button
          type="button"
          className="lightbox-arrow lightbox-prev"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            setActiveImage(
              (activeImage - 1 + selected.images.length) %
                selected.images.length
            );
          }}
        >
          ←
        </button>

        <button
          type="button"
          className="lightbox-arrow lightbox-next"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            setActiveImage(
              (activeImage + 1) % selected.images.length
            );
          }}
        >
          →
        </button>
      </>
    )}

    <img
      className="lightbox-image"
      src={selected.images[activeImage]}
      alt={`${selected.name} — full-size view ${activeImage + 1}`}
      onClick={(e) => e.stopPropagation()}
    />

    <p className="lightbox-counter">
      {activeImage + 1} / {selected.images.length}
    </p>
  </div>
)}
    </main>
  );
}