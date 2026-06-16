import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Image, Play, X } from "lucide-react";
import "./MediaSections.css";

const shopImageFiles = import.meta.glob(
  "/public/images/shop/*.{avif,gif,jpeg,jpg,png,webp}",
  { query: "?url", import: "default" }
);
const offerImageFiles = import.meta.glob(
  "/public/images/offers/*.{avif,gif,jpeg,jpg,png,webp}",
  { query: "?url", import: "default" }
);
const customerImageFiles = import.meta.glob(
  "/public/images/customers/*.{avif,gif,jpeg,jpg,png,webp}",
  { query: "?url", import: "default" }
);
const customerVideoFiles = import.meta.glob(
  "/public/videos/customers/*.{mp4,ogg,webm}",
  { query: "?url", import: "default" }
);

function toMediaItems(files, type) {
  return Object.keys(files)
    .sort()
    .map((path) => {
      const fileName = path.split("/").pop() || "media";
      const label = fileName
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]+/g, " ")
        .trim();

      return {
        type,
        src: path.replace("/public", ""),
        alt: label || type,
        title: label || type,
      };
    });
}

const shopImages = toMediaItems(shopImageFiles, "Shop image");
const offerImages = toMediaItems(offerImageFiles, "Offer banner");
const customerImages = toMediaItems(customerImageFiles, "Customer photo");
const customerVideos = toMediaItems(customerVideoFiles, "Customer video");

export default function MediaSections() {
  const [activeShopImage, setActiveShopImage] = useState(null);
  const [activeOffer, setActiveOffer] = useState(0);
  const customerMedia = useMemo(
    () => [...customerImages, ...customerVideos],
    []
  );

  useEffect(() => {
    if (offerImages.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveOffer((current) => (current + 1) % offerImages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const goToPreviousOffer = () => {
    setActiveOffer((current) =>
      current === 0 ? offerImages.length - 1 : current - 1
    );
  };

  const goToNextOffer = () => {
    setActiveOffer((current) => (current + 1) % offerImages.length);
  };

  return (
    <>
      <section id="shop-gallery" className="media-section media-reveal">
        <h2 className="section-title">Shop Gallery</h2>
        {shopImages.length > 0 ? (
          <div className="shop-gallery-grid">
            {shopImages.map((item) => (
              <button
                className="shop-gallery-card"
                key={item.src}
                type="button"
                onClick={() => setActiveShopImage(item)}
                aria-label={`Enlarge ${item.alt}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
              </button>
            ))}
          </div>
        ) : (
          <EmptyMediaState text="Add shop photos to public/images/shop to display them here." />
        )}
      </section>

      <section id="latest-offers" className="media-section offers-section media-reveal">
        <h2 className="section-title">Latest Offers</h2>
        {offerImages.length > 0 ? (
          <div className="offers-slider" aria-roledescription="carousel">
            <div
              className="offers-track"
              style={{ transform: `translateX(-${activeOffer * 100}%)` }}
            >
              {offerImages.map((item) => (
                <div className="offer-slide" key={item.src}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </div>
              ))}
            </div>

            {offerImages.length > 1 && (
              <>
                <button
                  className="offer-nav previous"
                  type="button"
                  onClick={goToPreviousOffer}
                  aria-label="Show previous offer"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  className="offer-nav next"
                  type="button"
                  onClick={goToNextOffer}
                  aria-label="Show next offer"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
                <div className="offer-dots" aria-hidden="true">
                  {offerImages.map((item, index) => (
                    <span
                      className={index === activeOffer ? "active" : ""}
                      key={item.src}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <EmptyMediaState text="Add offer banners to public/images/offers to display them here." />
        )}
      </section>

      <section id="happy-customers" className="media-section media-reveal">
        <h2 className="section-title">Happy Customers</h2>
        {customerMedia.length > 0 ? (
          <div className="customer-media-grid">
            {customerImages.map((item) => (
              <article className="customer-card" key={item.src}>
                <img src={item.src} alt={item.alt} loading="lazy" />
              </article>
            ))}
            {customerVideos.map((item) => (
              <article className="customer-card video-card" key={item.src}>
                <video src={item.src} preload="metadata" controls playsInline />
                <div className="video-play-badge" aria-hidden="true">
                  <Play size={20} fill="currentColor" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyMediaState text="Add customer photos or videos to public/images/customers and public/videos/customers." />
        )}
      </section>

      {activeShopImage && (
        <div
          className="media-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Shop photo preview"
          onClick={() => setActiveShopImage(null)}
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={() => setActiveShopImage(null)}
            aria-label="Close image preview"
          >
            <X size={22} aria-hidden="true" />
          </button>
          <img
            src={activeShopImage.src}
            alt={activeShopImage.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function EmptyMediaState({ text }) {
  return (
    <div className="empty-media-state">
      <Image size={34} aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
}
