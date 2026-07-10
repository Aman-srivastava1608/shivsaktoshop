import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Image, Play, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const [isCustomerInteracting, setIsCustomerInteracting] = useState(false);
  const [isCustomerVideoPlaying, setIsCustomerVideoPlaying] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef(null);
  const customerCarouselRef = useRef(null);
  const customerDragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });
  const customerInteractionTimerRef = useRef(null);
  const previousFocusRef = useRef(null);
  const customerMedia = useMemo(
    () => [...customerImages, ...customerVideos],
    []
  );

  const sectionMotion = {
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: reduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.45, ease: "easeOut" },
  };

  useEffect(() => {
    if (offerImages.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveOffer((current) => (current + 1) % offerImages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(!document.hidden);
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!activeShopImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveShopImage(null);
      }
    };

    previousFocusRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [activeShopImage]);

  const goToPreviousOffer = () => {
    setActiveOffer((current) =>
      current === 0 ? offerImages.length - 1 : current - 1
    );
  };

  const goToNextOffer = () => {
    setActiveOffer((current) => (current + 1) % offerImages.length);
  };

  const pauseCustomerInteraction = () => {
    window.clearTimeout(customerInteractionTimerRef.current);
    setIsCustomerInteracting(true);
  };

  const resumeCustomerInteraction = () => {
    window.clearTimeout(customerInteractionTimerRef.current);
    customerDragRef.current.isDragging = false;
    customerInteractionTimerRef.current = window.setTimeout(() => {
      setIsCustomerInteracting(false);
    }, 1200);
  };

  const handleCustomerPointerDown = (event) => {
    pauseCustomerInteraction();

    if (event.pointerType !== "mouse" || event.target.closest("video")) return;

    customerDragRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: customerCarouselRef.current?.scrollLeft || 0,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleCustomerPointerMove = (event) => {
    if (!customerDragRef.current.isDragging || !customerCarouselRef.current) return;

    const deltaX = event.clientX - customerDragRef.current.startX;
    customerCarouselRef.current.scrollLeft =
      customerDragRef.current.scrollLeft - deltaX;
  };

  const pauseOtherCustomerVideos = (currentVideo) => {
    const videos = customerCarouselRef.current?.querySelectorAll("video") || [];

    videos.forEach((video) => {
      if (video !== currentVideo) {
        video.pause();
      }
    });
  };

  const updateCustomerVideoPlayingState = () => {
    const videos = customerCarouselRef.current?.querySelectorAll("video") || [];
    const hasPlayingVideo = Array.from(videos).some(
      (video) => !video.paused && !video.ended
    );

    setIsCustomerVideoPlaying(hasPlayingVideo);
  };

  const handleCustomerVideoPlay = (event) => {
    pauseOtherCustomerVideos(event.currentTarget);
    setIsCustomerVideoPlaying(true);
  };

  const handleCustomerVideoPause = () => {
    window.setTimeout(updateCustomerVideoPlayingState, 0);
  };

  useEffect(() => {
    const carousel = customerCarouselRef.current;
    const isMobileCarousel = window.matchMedia("(max-width: 767px)").matches;
    const shouldPause =
      reduceMotion ||
      isCustomerInteracting ||
      isCustomerVideoPlaying ||
      !isDocumentVisible;

    if (!carousel || !isMobileCarousel || shouldPause || customerMedia.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      const cards = Array.from(carousel.querySelectorAll(".customer-card"));

      if (cards.length <= 1) return;

      const currentIndex = cards.reduce((closestIndex, card, index) => {
        const closestDistance = Math.abs(cards[closestIndex].offsetLeft - carousel.scrollLeft);
        const cardDistance = Math.abs(card.offsetLeft - carousel.scrollLeft);

        return cardDistance < closestDistance ? index : closestIndex;
      }, 0);
      const nextIndex = currentIndex + 1 >= cards.length ? 0 : currentIndex + 1;

      carousel.scrollTo({
        left: cards[nextIndex].offsetLeft,
        behavior: "smooth",
      });
    }, 4000);

    return () => window.clearInterval(timer);
  }, [
    customerMedia.length,
    isCustomerInteracting,
    isCustomerVideoPlaying,
    isDocumentVisible,
    reduceMotion,
  ]);

  useEffect(() => {
    return () => window.clearTimeout(customerInteractionTimerRef.current);
  }, []);

  return (
    <>
      <motion.section id="shop-gallery" className="media-section" {...sectionMotion}>
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
      </motion.section>

      <motion.section id="latest-offers" className="media-section offers-section" {...sectionMotion}>
        <h2 className="section-title">Latest Offers</h2>
        {offerImages.length > 0 ? (
          <div
            className="offers-slider"
            aria-roledescription="carousel"
            aria-label="Latest offers"
            aria-live="polite"
          >
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
                <div className="offer-dots" aria-label="Choose offer slide">
                  {offerImages.map((item, index) => (
                    <button
                      type="button"
                      aria-label={`Show offer ${index + 1}`}
                      aria-current={index === activeOffer ? "true" : undefined}
                      className={index === activeOffer ? "active" : ""}
                      key={item.src}
                      onClick={() => setActiveOffer(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <EmptyMediaState text="Add offer banners to public/images/offers to display them here." />
        )}
      </motion.section>

      <motion.section id="happy-customers" className="media-section" {...sectionMotion}>
        <h2 className="section-title">Happy Customers</h2>
        {customerMedia.length > 0 ? (
          <div
            ref={customerCarouselRef}
            className="customer-media-grid"
            aria-label="Happy customer media carousel"
            onPointerDown={handleCustomerPointerDown}
            onPointerMove={handleCustomerPointerMove}
            onPointerUp={resumeCustomerInteraction}
            onPointerCancel={resumeCustomerInteraction}
            onPointerLeave={resumeCustomerInteraction}
            onTouchStart={pauseCustomerInteraction}
            onTouchEnd={resumeCustomerInteraction}
            onFocus={pauseCustomerInteraction}
            onBlur={resumeCustomerInteraction}
          >
            {customerImages.map((item) => (
              <article className="customer-card" key={item.src}>
                <img src={item.src} alt={item.alt} loading="lazy" />
              </article>
            ))}
            {customerVideos.map((item) => (
              <article className="customer-card video-card" key={item.src}>
                <video
                  src={item.src}
                  preload="metadata"
                  controls
                  playsInline
                  onPlay={handleCustomerVideoPlay}
                  onPause={handleCustomerVideoPause}
                  onEnded={handleCustomerVideoPause}
                />
                <div className="video-play-badge" aria-hidden="true">
                  <Play size={20} fill="currentColor" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyMediaState text="Add customer photos or videos to public/images/customers and public/videos/customers." />
        )}
      </motion.section>

      <AnimatePresence>
        {activeShopImage && (
          <motion.div
            className="media-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Shop photo preview"
            onClick={() => setActiveShopImage(null)}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? {} : { opacity: 1 }}
            exit={reduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <button
              ref={closeButtonRef}
              className="lightbox-close"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveShopImage(null);
              }}
              aria-label="Close image preview"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <motion.img
              src={activeShopImage.src}
              alt={activeShopImage.alt}
              onClick={(event) => event.stopPropagation()}
              initial={reduceMotion ? false : { scale: 0.96 }}
              animate={reduceMotion ? {} : { scale: 1 }}
              exit={reduceMotion ? {} : { scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
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
