"use client";

// src/lib/ItemCard.tsx
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var styles = {
  card: {
    width: 180,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-start",
    position: "relative"
  },
  photoContainer: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease"
  },
  badge: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#df5234",
    padding: "4px 8px",
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  badgeText: {
    fontWeight: 500,
    fontSize: 13,
    lineHeight: "16px",
    letterSpacing: -0.7,
    color: "white",
    textAlign: "center",
    whiteSpace: "nowrap"
  },
  favoriteBtn: {
    position: "absolute",
    right: 12,
    top: 96,
    width: 36,
    height: 36,
    backgroundColor: "white",
    border: "none",
    borderRadius: 8,
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease"
  },
  data: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-start"
  },
  restaurant: {
    width: "100%",
    display: "flex",
    gap: 4,
    alignItems: "center"
  },
  restaurantLogo: {
    width: 16,
    height: 16,
    borderRadius: 12,
    border: "1px solid white",
    objectFit: "cover"
  },
  restaurantName: {
    flex: 1,
    fontWeight: 500,
    fontSize: 12,
    lineHeight: "14px",
    letterSpacing: 0.024,
    color: "#6c6c6c",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    margin: 0
  },
  dishName: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "16px",
    letterSpacing: -0.0126,
    color: "#141414",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: 0
  },
  price: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "16px",
    letterSpacing: -0.7,
    color: "#6C6C6C",
    margin: 0
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    gap: 4
  },
  originalPrice: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "16px",
    letterSpacing: -0.7,
    color: "#6c6c6c",
    margin: 0,
    textDecoration: "line-through"
  },
  separator: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "16px",
    color: "#6c6c6c"
  },
  discountPrice: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "16px",
    letterSpacing: -0.7,
    color: "#00796b",
    margin: 0
  }
};
var PlusIcon = () => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx(
      "path",
      {
        d: "M10 4V16M4 10H16",
        stroke: "#141414",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
var DISCOUNT_COLOR = "#00796b";
var BLACK_BADGE_COLOR = "#141414";
var ITEM_CARD_BADGE_COLORS = {
  default: "#df5234",
  discount: DISCOUNT_COLOR,
  black: BLACK_BADGE_COLOR
};
var ItemCard = forwardRef(
  ({
    imageUrl,
    restaurantLogo,
    restaurantName,
    dishName,
    price,
    originalPrice,
    discount = false,
    badgeText,
    badgeColor,
    currency = "$",
    isFavorited = false,
    showFavoriteButton = true,
    onFavorite,
    onClick,
    className,
    style
  }, ref) => {
    const handleFavoriteClick = (e) => {
      e.stopPropagation();
      onFavorite?.();
    };
    const effectiveBadgeColor = badgeColor ?? (discount ? DISCOUNT_COLOR : "#df5234");
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className,
        style: { ...styles.card, ...style },
        "data-component": "item-card",
        children: /* @__PURE__ */ jsxs("div", { style: styles.content, children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: styles.photoContainer,
              onClick,
              onMouseEnter: (e) => {
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1.05)";
              },
              onMouseLeave: (e) => {
                const img = e.currentTarget.querySelector("img");
                if (img) img.style.transform = "scale(1)";
              },
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: imageUrl,
                    alt: dishName,
                    style: styles.image
                  }
                ),
                badgeText && /* @__PURE__ */ jsx("div", { style: { ...styles.badge, backgroundColor: effectiveBadgeColor }, children: /* @__PURE__ */ jsx("span", { style: styles.badgeText, children: badgeText }) }),
                showFavoriteButton && /* @__PURE__ */ jsx(
                  "button",
                  {
                    style: styles.favoriteBtn,
                    onClick: handleFavoriteClick,
                    "aria-label": "Add to cart",
                    onMouseEnter: (e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                    },
                    children: /* @__PURE__ */ jsx(PlusIcon, {})
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { style: styles.data, children: [
            /* @__PURE__ */ jsxs("div", { style: styles.restaurant, children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: restaurantLogo,
                  alt: restaurantName,
                  style: styles.restaurantLogo
                }
              ),
              /* @__PURE__ */ jsx("span", { style: styles.restaurantName, children: restaurantName })
            ] }),
            /* @__PURE__ */ jsx("p", { style: styles.dishName, children: dishName }),
            discount && originalPrice ? /* @__PURE__ */ jsxs("div", { style: styles.priceContainer, children: [
              /* @__PURE__ */ jsxs("span", { style: styles.originalPrice, children: [
                currency,
                originalPrice.toFixed(2)
              ] }),
              /* @__PURE__ */ jsx("span", { style: styles.separator, children: "\xB7" }),
              /* @__PURE__ */ jsxs("span", { style: styles.discountPrice, children: [
                currency,
                price.toFixed(2)
              ] })
            ] }) : /* @__PURE__ */ jsxs("p", { style: styles.price, children: [
              currency,
              price.toFixed(2)
            ] })
          ] })
        ] })
      }
    );
  }
);
ItemCard.displayName = "ItemCard";

// src/lib/StoreCard.tsx
import { forwardRef as forwardRef2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var styles2 = {
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    borderRadius: 16,
    cursor: "pointer"
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-start",
    position: "relative"
  },
  photoContainer: {
    width: "100%",
    height: 158,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 8,
    transition: "transform 0.3s ease"
  },
  logo: {
    position: "absolute",
    left: 8,
    top: 108,
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "2px solid white",
    backgroundColor: "white",
    overflow: "hidden"
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  badge: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#df5234",
    padding: "4px 8px",
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    overflow: "hidden"
  },
  badgeText: {
    fontWeight: 500,
    fontSize: 13,
    lineHeight: "16px",
    letterSpacing: -0.7,
    color: "white",
    textAlign: "center",
    whiteSpace: "nowrap"
  },
  dataContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-start"
  },
  storeName: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "18px",
    letterSpacing: -0.0288,
    color: "#141414",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
    margin: 0
  },
  category: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "16px",
    letterSpacing: -0.0126,
    color: "#6c6c6c",
    whiteSpace: "nowrap"
  }
};
var StoreCard = forwardRef2(
  ({
    imageUrl,
    storeName,
    category,
    logoUrl,
    showLogo = true,
    badgeText,
    badgeColor = "#df5234",
    onClick,
    className,
    style
  }, ref) => {
    return /* @__PURE__ */ jsx2(
      "div",
      {
        ref,
        className,
        style: { ...styles2.card, ...style },
        onClick,
        "data-component": "store-card",
        children: /* @__PURE__ */ jsxs2("div", { style: styles2.content, children: [
          /* @__PURE__ */ jsxs2(
            "div",
            {
              style: styles2.photoContainer,
              onMouseEnter: (e) => {
                const img = e.currentTarget.querySelector("img:first-child");
                if (img) img.style.transform = "scale(1.05)";
              },
              onMouseLeave: (e) => {
                const img = e.currentTarget.querySelector("img:first-child");
                if (img) img.style.transform = "scale(1)";
              },
              children: [
                /* @__PURE__ */ jsx2(
                  "img",
                  {
                    src: imageUrl,
                    alt: storeName,
                    style: styles2.image
                  }
                ),
                showLogo && logoUrl && /* @__PURE__ */ jsx2("div", { style: styles2.logo, children: /* @__PURE__ */ jsx2(
                  "img",
                  {
                    src: logoUrl,
                    alt: `${storeName} logo`,
                    style: styles2.logoImage
                  }
                ) }),
                badgeText && /* @__PURE__ */ jsx2("div", { style: { ...styles2.badge, backgroundColor: badgeColor }, children: /* @__PURE__ */ jsx2("span", { style: styles2.badgeText, children: badgeText }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs2("div", { style: styles2.dataContainer, children: [
            /* @__PURE__ */ jsx2("p", { style: styles2.storeName, children: storeName }),
            /* @__PURE__ */ jsx2("span", { style: styles2.category, children: category })
          ] })
        ] })
      }
    );
  }
);
StoreCard.displayName = "StoreCard";

// src/lib/ItemCarousel.tsx
import { forwardRef as forwardRef3, useRef, useState, useEffect } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var styles3 = {
  container: {
    position: "relative",
    width: "100%",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16
  },
  title: {
    fontFamily: "'P22 Mackinac Pro', serif",
    fontSize: 24,
    fontWeight: 500,
    color: "#141414",
    margin: 0
  },
  navButtons: {
    display: "flex",
    gap: 8
  },
  viewport: {
    overflow: "hidden",
    width: "100%"
  },
  track: {
    display: "flex",
    transition: "transform 0.3s ease-out"
  },
  itemWrapper: {
    flexShrink: 0
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease"
  },
  arrowDisabled: {
    opacity: 0.4,
    cursor: "default"
  }
};
var ChevronLeftIcon = () => /* @__PURE__ */ jsx3(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx3(
      "path",
      {
        d: "M12.5 15L7.5 10L12.5 5",
        stroke: "#141414",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
var ChevronRightIcon = () => /* @__PURE__ */ jsx3(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx3(
      "path",
      {
        d: "M7.5 15L12.5 10L7.5 5",
        stroke: "#141414",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
var ItemCarousel = forwardRef3(
  ({
    title,
    items,
    visibleCount = 5,
    gap = 16,
    onItemClick,
    onItemFavorite,
    favoritedIds = /* @__PURE__ */ new Set(),
    showArrows = true,
    showFavoriteButton = true,
    className,
    style
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemWidth, setItemWidth] = useState(180);
    const containerRef = useRef(null);
    useEffect(() => {
      const updateItemWidth = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const totalGap = gap * (visibleCount - 1);
          const calculatedWidth = (containerWidth - totalGap) / visibleCount;
          setItemWidth(Math.floor(calculatedWidth));
        }
      };
      updateItemWidth();
      window.addEventListener("resize", updateItemWidth);
      return () => window.removeEventListener("resize", updateItemWidth);
    }, [gap, visibleCount]);
    const maxIndex = Math.max(0, items.length - visibleCount);
    const canGoBack = currentIndex > 0;
    const canGoForward = currentIndex < maxIndex;
    const goBack = () => {
      if (canGoBack) {
        setCurrentIndex((prev) => Math.max(0, prev - visibleCount));
      }
    };
    const goForward = () => {
      if (canGoForward) {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + visibleCount));
      }
    };
    const translateX = -(currentIndex * (itemWidth + gap));
    return /* @__PURE__ */ jsxs3(
      "div",
      {
        ref,
        className,
        style: { ...styles3.container, ...style },
        "data-component": "item-carousel",
        children: [
          (title || showArrows && items.length > visibleCount) && /* @__PURE__ */ jsxs3("div", { style: styles3.header, children: [
            title && /* @__PURE__ */ jsx3("h2", { style: styles3.title, children: title }),
            !title && /* @__PURE__ */ jsx3("div", {}),
            showArrows && items.length > visibleCount && /* @__PURE__ */ jsxs3("div", { style: styles3.navButtons, children: [
              /* @__PURE__ */ jsx3(
                "button",
                {
                  style: {
                    ...styles3.arrowButton,
                    ...canGoBack ? {} : styles3.arrowDisabled
                  },
                  onClick: goBack,
                  disabled: !canGoBack,
                  "aria-label": "Previous items",
                  onMouseEnter: (e) => {
                    if (canGoBack) {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                    }
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  },
                  children: /* @__PURE__ */ jsx3(ChevronLeftIcon, {})
                }
              ),
              /* @__PURE__ */ jsx3(
                "button",
                {
                  style: {
                    ...styles3.arrowButton,
                    ...canGoForward ? {} : styles3.arrowDisabled
                  },
                  onClick: goForward,
                  disabled: !canGoForward,
                  "aria-label": "Next items",
                  onMouseEnter: (e) => {
                    if (canGoForward) {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                    }
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  },
                  children: /* @__PURE__ */ jsx3(ChevronRightIcon, {})
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx3("div", { ref: containerRef, style: styles3.viewport, children: /* @__PURE__ */ jsx3(
            "div",
            {
              style: {
                ...styles3.track,
                gap,
                transform: `translateX(${translateX}px)`
              },
              children: items.map((item) => /* @__PURE__ */ jsx3(
                "div",
                {
                  style: {
                    ...styles3.itemWrapper,
                    width: itemWidth
                  },
                  children: /* @__PURE__ */ jsx3(
                    ItemCard,
                    {
                      imageUrl: item.imageUrl,
                      restaurantLogo: item.restaurantLogo,
                      restaurantName: item.restaurantName,
                      dishName: item.dishName,
                      price: item.price,
                      originalPrice: item.originalPrice,
                      discount: item.discount,
                      badgeText: item.badgeText,
                      badgeColor: item.badgeColor,
                      currency: item.currency,
                      isFavorited: favoritedIds.has(item.id),
                      showFavoriteButton,
                      onFavorite: () => onItemFavorite?.(item),
                      onClick: () => onItemClick?.(item),
                      style: { width: "100%" }
                    }
                  )
                },
                item.id
              ))
            }
          ) })
        ]
      }
    );
  }
);
ItemCarousel.displayName = "ItemCarousel";

// src/lib/StoreCarousel.tsx
import { forwardRef as forwardRef4, useRef as useRef2, useState as useState2, useEffect as useEffect2 } from "react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var styles4 = {
  container: {
    position: "relative",
    width: "100%",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 0
  },
  title: {
    fontFamily: "'P22 Mackinac Pro', serif",
    fontSize: 24,
    fontWeight: 500,
    color: "#141414",
    margin: 0
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    color: "#6c6c6c",
    margin: 0
  },
  navButtons: {
    display: "flex",
    gap: 8
  },
  viewport: {
    overflow: "hidden",
    width: "100%"
  },
  track: {
    display: "flex",
    transition: "transform 0.3s ease-out"
  },
  storeWrapper: {
    flexShrink: 0
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease"
  },
  arrowDisabled: {
    opacity: 0.4,
    cursor: "default"
  }
};
var ChevronLeftIcon2 = () => /* @__PURE__ */ jsx4(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx4(
      "path",
      {
        d: "M12.5 15L7.5 10L12.5 5",
        stroke: "#141414",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
var ChevronRightIcon2 = () => /* @__PURE__ */ jsx4(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx4(
      "path",
      {
        d: "M7.5 15L12.5 10L7.5 5",
        stroke: "#141414",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
var StoreCarousel = forwardRef4(
  ({
    title,
    subtitle,
    stores,
    visibleCount = 4,
    gap = 16,
    onStoreClick,
    showArrows = true,
    className,
    style
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState2(0);
    const [storeWidth, setStoreWidth] = useState2(280);
    const containerRef = useRef2(null);
    useEffect2(() => {
      const updateStoreWidth = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const totalGap = gap * (visibleCount - 1);
          const calculatedWidth = (containerWidth - totalGap) / visibleCount;
          setStoreWidth(Math.floor(calculatedWidth));
        }
      };
      updateStoreWidth();
      window.addEventListener("resize", updateStoreWidth);
      return () => window.removeEventListener("resize", updateStoreWidth);
    }, [gap, visibleCount]);
    const maxIndex = Math.max(0, stores.length - visibleCount);
    const canGoBack = currentIndex > 0;
    const canGoForward = currentIndex < maxIndex;
    const goBack = () => {
      if (canGoBack) {
        setCurrentIndex((prev) => Math.max(0, prev - visibleCount));
      }
    };
    const goForward = () => {
      if (canGoForward) {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + visibleCount));
      }
    };
    const translateX = -(currentIndex * (storeWidth + gap));
    return /* @__PURE__ */ jsxs4(
      "div",
      {
        ref,
        className,
        style: { ...styles4.container, ...style },
        "data-component": "store-carousel",
        children: [
          (title || subtitle || showArrows && stores.length > visibleCount) && /* @__PURE__ */ jsxs4("div", { style: styles4.header, children: [
            /* @__PURE__ */ jsxs4("div", { style: styles4.titleContainer, children: [
              title && /* @__PURE__ */ jsx4("h2", { style: styles4.title, children: title }),
              subtitle && /* @__PURE__ */ jsx4("p", { style: styles4.subtitle, children: subtitle })
            ] }),
            showArrows && stores.length > visibleCount && /* @__PURE__ */ jsxs4("div", { style: styles4.navButtons, children: [
              /* @__PURE__ */ jsx4(
                "button",
                {
                  style: {
                    ...styles4.arrowButton,
                    ...canGoBack ? {} : styles4.arrowDisabled
                  },
                  onClick: goBack,
                  disabled: !canGoBack,
                  "aria-label": "Previous stores",
                  onMouseEnter: (e) => {
                    if (canGoBack) {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                    }
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  },
                  children: /* @__PURE__ */ jsx4(ChevronLeftIcon2, {})
                }
              ),
              /* @__PURE__ */ jsx4(
                "button",
                {
                  style: {
                    ...styles4.arrowButton,
                    ...canGoForward ? {} : styles4.arrowDisabled
                  },
                  onClick: goForward,
                  disabled: !canGoForward,
                  "aria-label": "Next stores",
                  onMouseEnter: (e) => {
                    if (canGoForward) {
                      e.currentTarget.style.backgroundColor = "#f5f5f5";
                    }
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  },
                  children: /* @__PURE__ */ jsx4(ChevronRightIcon2, {})
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx4("div", { ref: containerRef, style: styles4.viewport, children: /* @__PURE__ */ jsx4(
            "div",
            {
              style: {
                ...styles4.track,
                gap,
                transform: `translateX(${translateX}px)`
              },
              children: stores.map((store) => /* @__PURE__ */ jsx4(
                "div",
                {
                  style: {
                    ...styles4.storeWrapper,
                    width: storeWidth
                  },
                  children: /* @__PURE__ */ jsx4(
                    StoreCard,
                    {
                      imageUrl: store.imageUrl,
                      storeName: store.storeName,
                      category: store.category,
                      logoUrl: store.logoUrl,
                      showLogo: store.showLogo,
                      badgeText: store.badgeText,
                      badgeColor: store.badgeColor,
                      onClick: () => onStoreClick?.(store),
                      style: { width: "100%" }
                    }
                  )
                },
                store.id
              ))
            }
          ) })
        ]
      }
    );
  }
);
StoreCarousel.displayName = "StoreCarousel";

// src/lib/FilterChip.tsx
import { forwardRef as forwardRef5 } from "react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var styles5 = {
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    borderRadius: 9999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e0e0e0",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    color: "#141414",
    whiteSpace: "nowrap",
    transition: "none",
    userSelect: "none",
    outline: "none",
    boxShadow: "none",
    WebkitTapHighlightColor: "transparent"
  },
  chipInactive: {
    backgroundColor: "transparent",
    borderColor: "#e0e0e0",
    color: "#141414"
  },
  chipActive: {
    backgroundColor: "#141414",
    borderColor: "#141414",
    color: "white"
  },
  icon: {
    width: 20,
    height: 20,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  iconImage: {
    width: 20,
    height: 20,
    objectFit: "cover",
    borderRadius: 4
  }
};
var FilterChip = forwardRef5(
  ({
    label,
    icon,
    isActive = false,
    onClick,
    className,
    style
  }, ref) => {
    const isEmoji = icon && !icon.startsWith("http") && !icon.startsWith("/");
    return /* @__PURE__ */ jsxs5(
      "button",
      {
        ref,
        className,
        style: {
          ...styles5.chip,
          ...isActive ? styles5.chipActive : styles5.chipInactive,
          ...style
        },
        onClick,
        "data-component": "filter-chip",
        "data-active": isActive,
        children: [
          icon && /* @__PURE__ */ jsx5("span", { style: styles5.icon, children: isEmoji ? icon : /* @__PURE__ */ jsx5("img", { src: icon, alt: "", style: styles5.iconImage }) }),
          label
        ]
      }
    );
  }
);
FilterChip.displayName = "FilterChip";

// src/lib/FilterChipCarousel.tsx
import { forwardRef as forwardRef6, useRef as useRef3, useState as useState3, useEffect as useEffect3 } from "react";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var styles6 = {
  container: {
    position: "relative",
    width: "100%",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  viewport: {
    overflow: "hidden",
    width: "100%",
    position: "relative"
  },
  track: {
    display: "flex",
    transition: "transform 0.3s ease-out"
  },
  fadeOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 60,
    pointerEvents: "none",
    zIndex: 5,
    transition: "opacity 0.2s ease"
  },
  fadeLeft: {
    left: 0,
    background: "linear-gradient(270deg, rgba(247, 247, 242, 0.05) 28.86%, rgba(247, 247, 242, 0.40) 52.82%, rgba(247, 247, 242, 0.99) 88.75%)",
    backdropFilter: "blur(1.5px)"
  },
  fadeRight: {
    right: 0,
    background: "linear-gradient(90deg, rgba(247, 247, 242, 0.05) 28.86%, rgba(247, 247, 242, 0.40) 52.82%, rgba(247, 247, 242, 0.99) 88.75%)",
    backdropFilter: "blur(1.5px)"
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    transition: "background-color 0.15s ease, opacity 0.15s ease"
  },
  arrowLeft: {
    left: 0
  },
  arrowRight: {
    right: 0
  },
  arrowDisabled: {
    opacity: 0,
    pointerEvents: "none"
  }
};
var ChevronLeftIcon3 = () => /* @__PURE__ */ jsx6(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx6(
      "path",
      {
        d: "M12.5 15L7.5 10L12.5 5",
        stroke: "#141414",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
var ChevronRightIcon3 = () => /* @__PURE__ */ jsx6(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx6(
      "path",
      {
        d: "M7.5 15L12.5 10L7.5 5",
        stroke: "#141414",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
var FilterChipCarousel = forwardRef6(
  ({
    chips,
    activeChipId,
    onChipClick,
    gap = 8,
    showArrows = true,
    className,
    style
  }, ref) => {
    const [scrollPosition, setScrollPosition] = useState3(0);
    const [maxScroll, setMaxScroll] = useState3(0);
    const trackRef = useRef3(null);
    const viewportRef = useRef3(null);
    useEffect3(() => {
      const updateMaxScroll = () => {
        if (trackRef.current && viewportRef.current) {
          const trackWidth = trackRef.current.scrollWidth;
          const viewportWidth = viewportRef.current.offsetWidth;
          setMaxScroll(Math.max(0, trackWidth - viewportWidth));
        }
      };
      updateMaxScroll();
      window.addEventListener("resize", updateMaxScroll);
      return () => window.removeEventListener("resize", updateMaxScroll);
    }, [chips]);
    const canGoBack = scrollPosition > 0;
    const canGoForward = scrollPosition < maxScroll;
    const scrollBy = (amount) => {
      setScrollPosition((prev) => {
        const newPosition = prev + amount;
        return Math.max(0, Math.min(maxScroll, newPosition));
      });
    };
    const goBack = () => scrollBy(-200);
    const goForward = () => scrollBy(200);
    return /* @__PURE__ */ jsxs6(
      "div",
      {
        ref,
        className,
        style: { ...styles6.container, ...style },
        "data-component": "filter-chip-carousel",
        children: [
          showArrows && /* @__PURE__ */ jsx6(
            "button",
            {
              style: {
                ...styles6.arrowButton,
                ...styles6.arrowLeft,
                ...canGoBack ? {} : styles6.arrowDisabled
              },
              onClick: goBack,
              disabled: !canGoBack,
              "aria-label": "Scroll left",
              onMouseEnter: (e) => {
                if (canGoBack) {
                  e.currentTarget.style.backgroundColor = "#f5f5f5";
                }
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.backgroundColor = "white";
              },
              children: /* @__PURE__ */ jsx6(ChevronLeftIcon3, {})
            }
          ),
          /* @__PURE__ */ jsxs6(
            "div",
            {
              ref: viewportRef,
              style: {
                ...styles6.viewport,
                paddingRight: showArrows ? 40 : 0
              },
              children: [
                /* @__PURE__ */ jsx6(
                  "div",
                  {
                    style: {
                      ...styles6.fadeOverlay,
                      ...styles6.fadeLeft,
                      opacity: canGoBack ? 1 : 0
                    }
                  }
                ),
                /* @__PURE__ */ jsx6(
                  "div",
                  {
                    ref: trackRef,
                    style: {
                      ...styles6.track,
                      gap,
                      transform: `translateX(-${scrollPosition}px)`
                    },
                    children: chips.map((chip) => /* @__PURE__ */ jsx6(
                      FilterChip,
                      {
                        label: chip.label,
                        icon: chip.icon,
                        isActive: chip.id === activeChipId,
                        onClick: () => onChipClick?.(chip)
                      },
                      chip.id
                    ))
                  }
                ),
                /* @__PURE__ */ jsx6(
                  "div",
                  {
                    style: {
                      ...styles6.fadeOverlay,
                      ...styles6.fadeRight,
                      opacity: canGoForward ? 1 : 0
                    }
                  }
                )
              ]
            }
          ),
          showArrows && /* @__PURE__ */ jsx6(
            "button",
            {
              style: {
                ...styles6.arrowButton,
                ...styles6.arrowRight,
                ...canGoForward ? {} : styles6.arrowDisabled
              },
              onClick: goForward,
              disabled: !canGoForward,
              "aria-label": "Scroll right",
              onMouseEnter: (e) => {
                if (canGoForward) {
                  e.currentTarget.style.backgroundColor = "#f5f5f5";
                }
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.backgroundColor = "white";
              },
              children: /* @__PURE__ */ jsx6(ChevronRightIcon3, {})
            }
          )
        ]
      }
    );
  }
);
FilterChipCarousel.displayName = "FilterChipCarousel";

// src/lib/Header.tsx
import { forwardRef as forwardRef7, useState as useState4, useEffect as useEffect4, useRef as useRef4 } from "react";
import { Fragment, jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var styles7 = {
  headerWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#F7F7F2",
    borderBottom: "1px solid rgba(136, 103, 79, 0.1)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    boxSizing: "border-box"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 100px",
    width: "100%",
    boxSizing: "border-box",
    position: "relative"
  },
  secondaryRow: {
    display: "none",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 100px",
    width: "100%",
    boxSizing: "border-box",
    borderTop: "1px solid rgba(136, 103, 79, 0.1)"
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    zIndex: 1
  },
  logo: {
    height: 28,
    cursor: "pointer"
  },
  centerSection: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: 16,
    maxWidth: "50vw"
  },
  locationButton: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "0 0 0 8px",
    height: 40,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    minWidth: 0,
    maxWidth: "100%",
    overflow: "hidden"
  },
  locationText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "-0.09%",
    color: "#141414",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 6px",
    backgroundColor: "rgba(26, 26, 26, 0.08)",
    borderRadius: 6
  },
  statusText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    color: "#3D3D3D"
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    zIndex: 1
  },
  iconButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    borderRadius: 8,
    transition: "background-color 0.15s ease"
  },
  teamOrderButton: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    backgroundColor: "transparent",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background-color 0.15s ease"
  },
  basketButton: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    backgroundColor: "rgba(143, 143, 143, 0.3)",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background-color 0.15s ease"
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "-0.18%"
  },
  teamOrderLabel: {
    color: "#000000"
  },
  basketLabel: {
    color: "#6C6C6C"
  }
};
var LocationIcon = () => /* @__PURE__ */ jsx7("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx7(
  "path",
  {
    d: "M8 1.33334C5.42 1.33334 3.33333 3.42001 3.33333 6.00001C3.33333 9.50001 8 14.6667 8 14.6667C8 14.6667 12.6667 9.50001 12.6667 6.00001C12.6667 3.42001 10.58 1.33334 8 1.33334ZM8 7.66668C7.08 7.66668 6.33333 6.92001 6.33333 6.00001C6.33333 5.08001 7.08 4.33334 8 4.33334C8.92 4.33334 9.66667 5.08001 9.66667 6.00001C9.66667 6.92001 8.92 7.66668 8 7.66668Z",
    fill: "#141414"
  }
) });
var ClockIcon = () => /* @__PURE__ */ jsx7("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx7(
  "path",
  {
    d: "M7.99333 1.33334C4.31333 1.33334 1.33333 4.32001 1.33333 8.00001C1.33333 11.68 4.31333 14.6667 7.99333 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00001C14.6667 4.32001 11.68 1.33334 7.99333 1.33334ZM8 13.3333C5.05333 13.3333 2.66667 10.9467 2.66667 8.00001C2.66667 5.05334 5.05333 2.66668 8 2.66668C10.9467 2.66668 13.3333 5.05334 13.3333 8.00001C13.3333 10.9467 10.9467 13.3333 8 13.3333ZM8.33333 4.66668H7.33333V8.66668L10.8333 10.7667L11.3333 9.94668L8.33333 8.16668V4.66668Z",
    fill: "#3D3D3D"
  }
) });
var GroupIcon = () => /* @__PURE__ */ jsx7("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx7(
  "path",
  {
    d: "M12.5 10C13.88 10 14.99 8.88 14.99 7.5C14.99 6.12 13.88 5 12.5 5C11.12 5 10 6.12 10 7.5C10 8.88 11.12 10 12.5 10ZM6.25 8.75V6.25H4.58333V8.75H2.08333V10.4167H4.58333V12.9167H6.25V10.4167H8.75V8.75H6.25ZM12.5 11.6667C10.725 11.6667 7.08333 12.5583 7.08333 14.3333V15.8333H17.9167V14.3333C17.9167 12.5583 14.275 11.6667 12.5 11.6667Z",
    fill: "#000000"
  }
) });
var BasketIcon = () => /* @__PURE__ */ jsx7("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx7(
  "path",
  {
    d: "M15.8333 6.66667H14.1667C14.1667 4.36667 12.3 2.5 10 2.5C7.7 2.5 5.83333 4.36667 5.83333 6.66667H4.16667C3.25 6.66667 2.5 7.41667 2.5 8.33333V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V8.33333C17.5 7.41667 16.75 6.66667 15.8333 6.66667ZM10 4.16667C11.3833 4.16667 12.5 5.28333 12.5 6.66667H7.5C7.5 5.28333 8.61667 4.16667 10 4.16667ZM15.8333 15.8333H4.16667V8.33333H15.8333V15.8333ZM10 10C8.61667 10 7.5 11.1167 7.5 12.5C7.5 13.8833 8.61667 15 10 15C11.3833 15 12.5 13.8833 12.5 12.5C12.5 11.1167 11.3833 10 10 10Z",
    fill: "#6C6C6C"
  }
) });
var SearchIcon = () => /* @__PURE__ */ jsx7("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx7(
  "path",
  {
    d: "M13.1292 11.8792H12.4709L12.2375 11.6542C13.0542 10.7042 13.5459 9.47084 13.5459 8.12918C13.5459 5.13751 11.1209 2.71251 8.12919 2.71251C5.13752 2.71251 2.71252 5.13751 2.71252 8.12918C2.71252 11.1208 5.13752 13.5458 8.12919 13.5458C9.47085 13.5458 10.7042 13.0542 11.6542 12.2375L11.8792 12.4708V13.1292L16.0459 17.2875L17.2875 16.0458L13.1292 11.8792ZM8.12919 11.8792C6.05419 11.8792 4.37919 10.2042 4.37919 8.12918C4.37919 6.05418 6.05419 4.37918 8.12919 4.37918C10.2042 4.37918 11.8792 6.05418 11.8792 8.12918C11.8792 10.2042 10.2042 11.8792 8.12919 11.8792Z",
    fill: "#141414"
  }
) });
var ChevronDownIcon = () => /* @__PURE__ */ jsx7("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx7(
  "path",
  {
    d: "M4.94 5.72668L8 8.78002L11.06 5.72668L12 6.66668L8 10.6667L4 6.66668L4.94 5.72668Z",
    fill: "#141414"
  }
) });
var DefaultLogo = () => /* @__PURE__ */ jsxs7("svg", { width: "87", height: "28", viewBox: "0 0 87 28", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsx7("rect", { width: "87", height: "28", rx: "4", fill: "#F74C25" }),
  /* @__PURE__ */ jsx7("text", { x: "43.5", y: "18", textAnchor: "middle", fill: "white", fontSize: "12", fontWeight: "600", fontFamily: "Inter, sans-serif", children: "LOGO" })
] });
var Header = forwardRef7(
  ({
    variant = "default",
    logoUrl,
    locationName = "Location",
    orderTiming = "Today, Lunch",
    countdownText,
    basketCount,
    onLogoClick,
    onLocationClick,
    onTeamOrderClick,
    onBasketClick,
    className,
    style
  }, ref) => {
    const [isStacked, setIsStacked] = useState4(false);
    const centerRef = useRef4(null);
    const rightRef = useRef4(null);
    const isSimple = variant === "simple";
    useEffect4(() => {
      if (isSimple) return;
      const checkOverlap = () => {
        if (centerRef.current && rightRef.current) {
          const centerRect = centerRef.current.getBoundingClientRect();
          const rightRect = rightRef.current.getBoundingClientRect();
          const hasOverlap = centerRect.right > rightRect.left - 16;
          setIsStacked(hasOverlap);
        }
      };
      checkOverlap();
      window.addEventListener("resize", checkOverlap);
      return () => window.removeEventListener("resize", checkOverlap);
    }, [locationName, orderTiming, countdownText, isSimple]);
    return /* @__PURE__ */ jsxs7(
      "div",
      {
        ref,
        className,
        style: { ...styles7.headerWrapper, ...style },
        "data-component": "header",
        children: [
          /* @__PURE__ */ jsxs7("header", { style: styles7.header, "data-header-row": "primary", children: [
            /* @__PURE__ */ jsx7("div", { style: styles7.leftSection, children: /* @__PURE__ */ jsx7("div", { style: styles7.logo, onClick: onLogoClick, children: logoUrl ? /* @__PURE__ */ jsx7("img", { src: logoUrl, alt: "Logo", style: { height: "100%" } }) : /* @__PURE__ */ jsx7(DefaultLogo, {}) }) }),
            !isSimple && /* @__PURE__ */ jsxs7(
              "div",
              {
                ref: centerRef,
                style: {
                  ...styles7.centerSection,
                  visibility: isStacked ? "hidden" : "visible"
                },
                "data-header-center": true,
                children: [
                  /* @__PURE__ */ jsxs7(
                    "button",
                    {
                      style: styles7.locationButton,
                      onClick: onLocationClick,
                      children: [
                        /* @__PURE__ */ jsx7(LocationIcon, {}),
                        /* @__PURE__ */ jsxs7("span", { style: styles7.locationText, children: [
                          locationName,
                          " \xB7 ",
                          orderTiming
                        ] }),
                        /* @__PURE__ */ jsx7(ChevronDownIcon, {})
                      ]
                    }
                  ),
                  countdownText && /* @__PURE__ */ jsxs7("div", { style: styles7.statusBadge, children: [
                    /* @__PURE__ */ jsx7(ClockIcon, {}),
                    /* @__PURE__ */ jsx7("span", { style: styles7.statusText, children: countdownText })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs7("div", { ref: rightRef, style: styles7.rightSection, children: [
              !isSimple && /* @__PURE__ */ jsxs7(Fragment, { children: [
                /* @__PURE__ */ jsx7(
                  "button",
                  {
                    style: styles7.iconButton,
                    "aria-label": "Search",
                    onMouseEnter: (e) => {
                      e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    },
                    children: /* @__PURE__ */ jsx7(SearchIcon, {})
                  }
                ),
                /* @__PURE__ */ jsxs7(
                  "button",
                  {
                    style: styles7.teamOrderButton,
                    onClick: onTeamOrderClick,
                    onMouseEnter: (e) => {
                      e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    },
                    children: [
                      /* @__PURE__ */ jsx7(GroupIcon, {}),
                      /* @__PURE__ */ jsx7("span", { style: { ...styles7.buttonLabel, ...styles7.teamOrderLabel }, children: "Team order" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs7(
                "button",
                {
                  style: styles7.basketButton,
                  onClick: onBasketClick,
                  onMouseEnter: (e) => {
                    e.currentTarget.style.backgroundColor = "rgba(143, 143, 143, 0.4)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = "rgba(143, 143, 143, 0.3)";
                  },
                  children: [
                    /* @__PURE__ */ jsx7(BasketIcon, {}),
                    /* @__PURE__ */ jsx7("span", { style: { ...styles7.buttonLabel, ...styles7.basketLabel }, children: basketCount !== void 0 ? `Basket (${basketCount})` : "Basket" })
                  ]
                }
              )
            ] })
          ] }),
          !isSimple && /* @__PURE__ */ jsxs7(
            "div",
            {
              style: {
                ...styles7.secondaryRow,
                display: isStacked ? "flex" : "none"
              },
              "data-header-row": "secondary",
              children: [
                /* @__PURE__ */ jsxs7(
                  "button",
                  {
                    style: styles7.locationButton,
                    onClick: onLocationClick,
                    children: [
                      /* @__PURE__ */ jsx7(LocationIcon, {}),
                      /* @__PURE__ */ jsxs7("span", { style: styles7.locationText, children: [
                        locationName,
                        " \xB7 ",
                        orderTiming
                      ] }),
                      /* @__PURE__ */ jsx7(ChevronDownIcon, {})
                    ]
                  }
                ),
                countdownText && /* @__PURE__ */ jsxs7("div", { style: styles7.statusBadge, children: [
                  /* @__PURE__ */ jsx7(ClockIcon, {}),
                  /* @__PURE__ */ jsx7("span", { style: styles7.statusText, children: countdownText })
                ] })
              ]
            }
          )
        ]
      }
    );
  }
);
Header.displayName = "Header";

// src/lib/Banner.tsx
import { forwardRef as forwardRef8 } from "react";
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
var themes = {
  dark: {
    bg: "#23393B",
    text: "#EFEBE5",
    buttonBg: "#EFEBE5",
    buttonText: "#1F1812"
  },
  light: {
    bg: "#F7F7F2",
    text: "#141414",
    buttonBg: "#141414",
    buttonText: "#FFFFFF"
  },
  teal: {
    bg: "#00796B",
    text: "#FFFFFF",
    buttonBg: "#FFFFFF",
    buttonText: "#00796B"
  },
  orange: {
    bg: "#F74C25",
    text: "#FFFFFF",
    buttonBg: "#FFFFFF",
    buttonText: "#F74C25"
  },
  custom: {
    bg: "#23393B",
    text: "#EFEBE5",
    buttonBg: "#EFEBE5",
    buttonText: "#1F1812"
  }
};
var styles8 = {
  banner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    overflow: "hidden",
    position: "relative"
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    zIndex: 1
  },
  logo: {
    width: 48,
    height: 48,
    flexShrink: 0
  },
  textContent: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  title: {
    fontFamily: "'P22 Mackinac Pro', serif",
    fontSize: 20,
    fontWeight: 500,
    lineHeight: "24px",
    margin: 0
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px",
    margin: 0,
    opacity: 0.9,
    maxWidth: 400
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "8px 20px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
    transition: "opacity 0.15s ease",
    alignSelf: "flex-start",
    marginTop: 4
  },
  imageContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "40%",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center"
  },
  imageOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 80,
    background: "linear-gradient(90deg, var(--banner-bg) 0%, transparent 100%)"
  }
};
var Banner = forwardRef8(
  ({
    title,
    subtitle,
    ctaText,
    onCtaClick,
    imageUrl,
    logo,
    theme = "dark",
    backgroundColor,
    textColor,
    buttonColor,
    buttonTextColor,
    className,
    style
  }, ref) => {
    const themeColors = themes[theme];
    const bgColor = backgroundColor || themeColors.bg;
    const txtColor = textColor || themeColors.text;
    const btnBgColor = buttonColor || themeColors.buttonBg;
    const btnTxtColor = buttonTextColor || themeColors.buttonText;
    return /* @__PURE__ */ jsxs8(
      "div",
      {
        ref,
        className,
        style: {
          ...styles8.banner,
          backgroundColor: bgColor,
          // @ts-ignore - CSS custom property for gradient
          "--banner-bg": bgColor,
          ...style
        },
        "data-component": "banner",
        children: [
          /* @__PURE__ */ jsxs8("div", { style: styles8.contentWrapper, children: [
            logo && /* @__PURE__ */ jsx8("div", { style: styles8.logo, children: typeof logo === "string" ? /* @__PURE__ */ jsx8("img", { src: logo, alt: "", style: { width: "100%", height: "100%", objectFit: "contain" } }) : logo }),
            /* @__PURE__ */ jsxs8("div", { style: styles8.textContent, children: [
              /* @__PURE__ */ jsx8("h3", { style: { ...styles8.title, color: txtColor }, children: title }),
              subtitle && /* @__PURE__ */ jsx8("p", { style: { ...styles8.subtitle, color: txtColor }, children: subtitle }),
              ctaText && /* @__PURE__ */ jsx8(
                "button",
                {
                  style: {
                    ...styles8.ctaButton,
                    backgroundColor: btnBgColor,
                    color: btnTxtColor
                  },
                  onClick: onCtaClick,
                  onMouseEnter: (e) => {
                    e.currentTarget.style.opacity = "0.9";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.opacity = "1";
                  },
                  children: ctaText
                }
              )
            ] })
          ] }),
          imageUrl && /* @__PURE__ */ jsxs8("div", { style: styles8.imageContainer, children: [
            /* @__PURE__ */ jsx8("div", { style: { ...styles8.imageOverlay, background: `linear-gradient(90deg, ${bgColor} 0%, transparent 100%)` } }),
            /* @__PURE__ */ jsx8("img", { src: imageUrl, alt: "", style: styles8.image })
          ] })
        ]
      }
    );
  }
);
Banner.displayName = "Banner";

// src/lib/ScheduledOrder.tsx
import { forwardRef as forwardRef9, useState as useState5, useEffect as useEffect5 } from "react";
import { jsx as jsx9, jsxs as jsxs9 } from "react/jsx-runtime";
var styles9 = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingBottom: 12,
    position: "relative",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  containerWithBorder: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.24)"
  },
  labelRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    backgroundColor: "#F97051",
    flexShrink: 0
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "-0.0009em",
    color: "rgba(250, 247, 240, 0.63)",
    margin: 0
  },
  activeLabel: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "-0.0009em",
    color: "#FAF7F0",
    margin: 0
  },
  contentRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  textContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 4,
    flex: 1
  },
  mealName: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "-0.0009em",
    color: "rgba(250, 247, 240, 0.9)",
    margin: 0
  },
  activeMealName: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "-0.0009em",
    color: "#FAF7F0",
    margin: 0
  },
  restaurant: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "-0.0009em",
    color: "rgba(250, 247, 240, 0.63)",
    margin: 0
  },
  activeDetails: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "-0.0009em",
    color: "rgba(250, 247, 240, 0.63)",
    margin: 0
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    objectFit: "cover",
    flexShrink: 0,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    flexShrink: 0,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
  },
  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#F74C25",
    transition: "width 0.3s ease"
  },
  highlighted: {
    background: "radial-gradient(circle at 47% 50%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
    transition: "background 0.3s ease-out"
  },
  highlightFading: {
    background: "radial-gradient(circle at 47% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)",
    transition: "background 0.3s ease-out"
  }
};
var ScheduledOrder = forwardRef9(
  ({
    isActive = false,
    dateLabel,
    mealName,
    restaurant,
    status,
    itemCount,
    eta,
    avatarUrl,
    progress = 0,
    hideProgress = false,
    showBorder = false,
    isHighlighted = false,
    className,
    style
  }, ref) => {
    const [showHighlight, setShowHighlight] = useState5(false);
    const [isFading, setIsFading] = useState5(false);
    useEffect5(() => {
      if (isHighlighted) {
        setShowHighlight(true);
        setIsFading(false);
        const fadeTimer = setTimeout(() => {
          setIsFading(true);
        }, 400);
        const removeTimer = setTimeout(() => {
          setShowHighlight(false);
          setIsFading(false);
        }, 700);
        return () => {
          clearTimeout(fadeTimer);
          clearTimeout(removeTimer);
        };
      }
    }, [isHighlighted]);
    const detailsText = isActive && itemCount && eta ? `${restaurant} \xB7 ${itemCount} item${itemCount !== 1 ? "s" : ""} \xB7 ETA ${eta}` : restaurant;
    const highlightStyle = showHighlight ? isFading ? styles9.highlightFading : styles9.highlighted : {};
    return /* @__PURE__ */ jsxs9(
      "div",
      {
        ref,
        className,
        style: {
          ...styles9.container,
          ...showBorder && !isActive ? styles9.containerWithBorder : {},
          ...highlightStyle,
          ...style
        },
        "data-component": "scheduled-order",
        children: [
          /* @__PURE__ */ jsxs9("div", { style: styles9.labelRow, children: [
            isActive && /* @__PURE__ */ jsx9("div", { style: styles9.activeDot }),
            /* @__PURE__ */ jsx9("span", { style: isActive ? styles9.activeLabel : styles9.dateLabel, children: isActive ? "Today" : dateLabel })
          ] }),
          /* @__PURE__ */ jsxs9("div", { style: styles9.contentRow, children: [
            /* @__PURE__ */ jsxs9("div", { style: styles9.textContent, children: [
              /* @__PURE__ */ jsx9("span", { style: isActive ? styles9.activeMealName : styles9.mealName, children: isActive && status ? status : mealName }),
              /* @__PURE__ */ jsx9("span", { style: isActive ? styles9.activeDetails : styles9.restaurant, children: detailsText })
            ] }),
            avatarUrl ? /* @__PURE__ */ jsx9("img", { src: avatarUrl, alt: "", style: styles9.avatar }) : /* @__PURE__ */ jsx9("div", { style: styles9.avatarPlaceholder })
          ] }),
          isActive && !hideProgress && /* @__PURE__ */ jsx9("div", { style: styles9.progressContainer, children: /* @__PURE__ */ jsx9("div", { style: { ...styles9.progressBar, width: `${Math.min(100, Math.max(0, progress))}%` } }) })
        ]
      }
    );
  }
);
ScheduledOrder.displayName = "ScheduledOrder";

// src/lib/FloatingPanel.tsx
import { forwardRef as forwardRef10 } from "react";
import { Fragment as Fragment2, jsx as jsx10, jsxs as jsxs10 } from "react/jsx-runtime";
var styles10 = {
  panel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: 368,
    backgroundColor: "rgba(20, 20, 20, 0.95)",
    borderRadius: "24px 24px 0 0",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.11)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    overflow: "hidden",
    position: "relative"
  },
  panelExpanded: {
    boxShadow: "0px 4px 28px 0px rgba(0, 0, 0, 0.22)"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: "16px 20px"
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1
  },
  headerText: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "-0.05em",
    color: "#EFEBE5",
    margin: 0,
    fontVariantNumeric: "lining-nums tabular-nums"
  },
  toggleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    transition: "transform 0.2s ease"
  },
  collapsedActiveSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch",
    alignItems: "center",
    gap: 8,
    padding: "8px 20px 0",
    boxShadow: "0px 4px 28px 0px rgba(0, 0, 0, 0.22)",
    borderRadius: "20px 20px 0 0"
  },
  listSection: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: "8px 20px",
    boxShadow: "0px 4px 28px 0px rgba(0, 0, 0, 0.22)",
    borderRadius: "20px 20px 0 0"
  },
  listSectionWithActive: {
    padding: "8px 20px 16px",
    boxShadow: "none",
    borderRadius: 0
  },
  viewRotationLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: "12px 0"
  },
  viewRotationText: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "-0.0018em",
    color: "#FAF7F0",
    margin: 0,
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "inherit"
  },
  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#F74C25",
    transition: "width 0.3s ease"
  }
};
var AutoModeIcon = () => /* @__PURE__ */ jsxs10("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsx10("g", { clipPath: "url(#clip0_automode)", children: /* @__PURE__ */ jsx10(
    "path",
    {
      d: "M11.2917 11.2915L10.375 13.3332C10.3056 13.4998 10.1806 13.5832 10 13.5832C9.81944 13.5832 9.69444 13.4998 9.625 13.3332L8.6875 11.2915L6.66667 10.3748C6.5 10.3054 6.41667 10.1804 6.41667 9.99984C6.41667 9.81928 6.5 9.69428 6.66667 9.62484L8.6875 8.68734L9.625 6.6665C9.69444 6.49984 9.81944 6.4165 10 6.4165C10.1806 6.4165 10.3056 6.49984 10.375 6.6665L11.2917 8.68734L13.3333 9.62484C13.5 9.69428 13.5833 9.81928 13.5833 9.99984C13.5833 10.1804 13.5 10.3054 13.3333 10.3748L11.2917 11.2915ZM15.25 17.4998L16.6667 17.4998C16.9028 17.4998 17.1007 17.5797 17.2604 17.7394C17.4201 17.8991 17.5 18.0971 17.5 18.3332C17.5 18.5693 17.4201 18.7672 17.2604 18.9269C17.1007 19.0866 16.9028 19.1665 16.6667 19.1665L13.3333 19.1665C13.0972 19.1665 12.8993 19.0866 12.7396 18.9269C12.5799 18.7672 12.5 18.5693 12.5 18.3332L12.5 14.9998C12.5 14.7637 12.5799 14.5658 12.7396 14.4061C12.8993 14.2464 13.0972 14.1665 13.3333 14.1665C13.5694 14.1665 13.7674 14.2464 13.9271 14.4061C14.0868 14.5658 14.1667 14.7637 14.1667 14.9998L14.1667 16.2082C15.2083 15.4998 16.0243 14.6005 16.6146 13.5103C17.2049 12.42 17.5 11.2498 17.5 9.99984C17.5 8.55539 17.125 7.23595 16.375 6.0415C15.625 4.84706 14.6181 3.93039 13.3542 3.2915C13.1181 3.1665 12.9306 3.00331 12.7917 2.80192C12.6528 2.60053 12.6111 2.36789 12.6667 2.10401C12.7222 1.85401 12.8646 1.69081 13.0937 1.61442C13.3229 1.53803 13.5694 1.56234 13.8333 1.68734C15.4444 2.43734 16.7361 3.55539 17.7083 5.0415C18.6806 6.52761 19.1667 8.18039 19.1667 9.99984C19.1667 11.4998 18.8229 12.9061 18.1354 14.2186C17.4479 15.5311 16.4861 16.6248 15.25 17.4998ZM9.16667 18.2707C9.16667 18.5068 9.07986 18.6978 8.90625 18.8436C8.73264 18.9894 8.52778 19.0415 8.29167 18.9998C7.63889 18.8609 7.0382 18.6804 6.48958 18.4582C5.94097 18.2359 5.38889 17.9373 4.83333 17.5623C4.625 17.4234 4.50694 17.2429 4.47917 17.0207C4.45139 16.7984 4.52778 16.5971 4.70833 16.4165C4.90278 16.2221 5.11458 16.1248 5.34375 16.1248C5.57292 16.1248 5.80556 16.2012 6.04167 16.354C6.40278 16.5901 6.76389 16.7776 7.125 16.9165C7.48611 17.0554 7.88195 17.1804 8.3125 17.2915C8.5625 17.3471 8.76736 17.4616 8.92708 17.6353C9.08681 17.8089 9.16667 18.0207 9.16667 18.2707ZM1.70833 10.8332C1.97222 10.8332 2.1875 10.913 2.35417 11.0728C2.52083 11.2325 2.63194 11.4443 2.6875 11.7082C2.78472 12.1248 2.90972 12.5103 3.0625 12.8644C3.21528 13.2186 3.40972 13.5762 3.64583 13.9373C3.79861 14.1596 3.86806 14.3853 3.85417 14.6144C3.84028 14.8436 3.73611 15.0554 3.54167 15.2498C3.375 15.4165 3.18403 15.4894 2.96875 15.4686C2.75347 15.4478 2.56944 15.3401 2.41667 15.1457C2.05556 14.604 1.76042 14.0658 1.53125 13.5311C1.30208 12.9964 1.125 12.4026 1 11.7498C0.958334 11.4998 1.00694 11.2846 1.14583 11.104C1.28472 10.9234 1.47222 10.8332 1.70833 10.8332ZM3.54167 4.70817C3.73611 4.90262 3.83681 5.11789 3.84375 5.354C3.85069 5.59012 3.77778 5.81928 3.625 6.0415C3.38889 6.40262 3.20139 6.76373 3.0625 7.12484C2.92361 7.48595 2.79861 7.88178 2.6875 8.31234C2.63194 8.56234 2.51736 8.7672 2.34375 8.92692C2.17014 9.08664 1.95833 9.1665 1.70833 9.1665C1.47222 9.1665 1.28472 9.0797 1.14583 8.90609C1.00694 8.73248 0.958334 8.52762 1 8.2915C1.125 7.62484 1.29861 7.02067 1.52083 6.479C1.74306 5.93734 2.04167 5.38873 2.41667 4.83317C2.55556 4.63873 2.73611 4.52762 2.95833 4.49984C3.18056 4.47206 3.375 4.5415 3.54167 4.70817ZM9.16667 1.70817C9.16667 1.97206 9.08681 2.18734 8.92708 2.35401C8.76736 2.52067 8.55556 2.63178 8.29167 2.68734C7.86111 2.79845 7.46875 2.92692 7.11458 3.07276C6.76042 3.21859 6.39583 3.40956 6.02083 3.64567C5.79861 3.79845 5.57292 3.86789 5.34375 3.854C5.11458 3.84012 4.90278 3.73595 4.70833 3.5415C4.54167 3.37484 4.47222 3.18387 4.5 2.96859C4.52778 2.75331 4.63889 2.56928 4.83333 2.41651C5.38889 2.04151 5.9375 1.74289 6.47917 1.52067C7.02083 1.29845 7.625 1.12484 8.29167 0.999838C8.52778 0.958172 8.73264 1.00678 8.90625 1.14567C9.07986 1.28456 9.16667 1.47206 9.16667 1.70817Z",
      fill: "#EFEBE5"
    }
  ) }),
  /* @__PURE__ */ jsx10("defs", { children: /* @__PURE__ */ jsx10("clipPath", { id: "clip0_automode", children: /* @__PURE__ */ jsx10("rect", { width: "20", height: "20", fill: "white", transform: "translate(0 20) rotate(-90)" }) }) })
] });
var ChevronIcon = ({ isUp }) => /* @__PURE__ */ jsx10(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: { transform: isUp ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s ease" },
    children: /* @__PURE__ */ jsx10("path", { d: "M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z", fill: "#EFEBE5" })
  }
);
var FloatingPanel = forwardRef10(
  ({
    upcomingCount,
    activeOrder,
    scheduledOrders = [],
    isExpanded = false,
    onToggle,
    onClick,
    onViewRotation,
    highlightedOrderId,
    className,
    style
  }, ref) => {
    const hasActiveOrder = !!activeOrder;
    const showCollapsedActive = !isExpanded && hasActiveOrder;
    const showExpandedList = isExpanded;
    return /* @__PURE__ */ jsxs10(
      "div",
      {
        ref,
        className,
        style: {
          ...styles10.panel,
          ...isExpanded || hasActiveOrder ? styles10.panelExpanded : {},
          paddingBottom: isExpanded ? 12 : hasActiveOrder ? 8 : 4,
          ...style
        },
        onClick,
        "data-component": "floating-panel",
        children: [
          /* @__PURE__ */ jsxs10(
            "div",
            {
              style: { ...styles10.header, cursor: "pointer" },
              onClick: (e) => {
                e.stopPropagation();
                onToggle?.();
              },
              children: [
                /* @__PURE__ */ jsxs10("div", { style: styles10.headerLeft, children: [
                  /* @__PURE__ */ jsx10(AutoModeIcon, {}),
                  /* @__PURE__ */ jsxs10("span", { style: styles10.headerText, children: [
                    upcomingCount,
                    " upcoming order",
                    upcomingCount !== 1 ? "s" : "",
                    " "
                  ] })
                ] }),
                /* @__PURE__ */ jsx10(
                  "button",
                  {
                    style: styles10.toggleButton,
                    onClick: (e) => {
                      e.stopPropagation();
                      onToggle?.();
                    },
                    "aria-label": isExpanded ? "Collapse panel" : "Expand panel",
                    children: /* @__PURE__ */ jsx10(ChevronIcon, { isUp: isExpanded })
                  }
                )
              ]
            }
          ),
          showCollapsedActive && activeOrder && /* @__PURE__ */ jsxs10(Fragment2, { children: [
            /* @__PURE__ */ jsx10("div", { style: styles10.collapsedActiveSection, children: /* @__PURE__ */ jsx10(
              ScheduledOrder,
              {
                isActive: true,
                mealName: activeOrder.status,
                restaurant: activeOrder.restaurant,
                status: activeOrder.status,
                itemCount: activeOrder.itemCount,
                eta: activeOrder.eta,
                avatarUrl: activeOrder.avatarUrl,
                hideProgress: true,
                style: { flex: 1 }
              }
            ) }),
            /* @__PURE__ */ jsx10("div", { style: styles10.progressContainer, children: /* @__PURE__ */ jsx10("div", { style: { ...styles10.progressBar, width: `${Math.min(100, Math.max(0, activeOrder.progress || 0))}%` } }) })
          ] }),
          showExpandedList && /* @__PURE__ */ jsxs10("div", { style: {
            ...styles10.listSection,
            ...hasActiveOrder ? styles10.listSectionWithActive : {}
          }, children: [
            activeOrder && /* @__PURE__ */ jsx10(
              ScheduledOrder,
              {
                isActive: true,
                mealName: activeOrder.status,
                restaurant: activeOrder.restaurant,
                status: activeOrder.status,
                itemCount: activeOrder.itemCount,
                eta: activeOrder.eta,
                avatarUrl: activeOrder.avatarUrl,
                progress: activeOrder.progress
              }
            ),
            scheduledOrders.map((order, index) => /* @__PURE__ */ jsx10(
              ScheduledOrder,
              {
                dateLabel: order.dateLabel,
                mealName: order.mealName,
                restaurant: order.restaurant,
                avatarUrl: order.avatarUrl,
                showBorder: index < scheduledOrders.length - 1,
                isHighlighted: highlightedOrderId === order.id
              },
              order.id
            ))
          ] }),
          showExpandedList && /* @__PURE__ */ jsx10("div", { style: styles10.viewRotationLink, children: /* @__PURE__ */ jsxs10(
            "button",
            {
              style: styles10.viewRotationText,
              onClick: (e) => {
                e.stopPropagation();
                onViewRotation?.();
              },
              children: [
                "View rotation \u2192",
                " "
              ]
            }
          ) })
        ]
      }
    );
  }
);
FloatingPanel.displayName = "FloatingPanel";

// src/lib/ItemModal.tsx
import { forwardRef as forwardRef11, useState as useState6, useEffect as useEffect6 } from "react";
import { jsx as jsx11, jsxs as jsxs11 } from "react/jsx-runtime";
var styles11 = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1e3,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  modal: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FAF9F4",
    borderRadius: 16,
    border: "1px solid rgba(136, 103, 79, 0.1)",
    boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.05), 0px 2px 2px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.07)",
    maxWidth: 945,
    width: "100%",
    maxHeight: "90vh",
    overflow: "hidden"
  },
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: "16px 20px",
    width: 358,
    flexShrink: 0,
    borderRight: "1px dashed rgba(136, 103, 79, 0.1)",
    overflowY: "auto"
  },
  itemImage: {
    width: "100%",
    height: 269,
    borderRadius: 12,
    objectFit: "cover",
    backgroundColor: "#EFEBE5"
  },
  itemDetails: {
    display: "flex",
    flexDirection: "column",
    gap: 16
  },
  itemInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  itemName: {
    fontFamily: "'P22 Mackinac Pro', Georgia, serif",
    fontSize: 20,
    fontWeight: 500,
    lineHeight: "1.1em",
    letterSpacing: "-0.01em",
    color: "#000000",
    margin: 0
  },
  description: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "1.29em",
    letterSpacing: "-0.0009em",
    color: "#525252",
    margin: 0
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap"
  },
  tag: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 8px",
    backgroundColor: "#EFEBE5",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "1.14em",
    letterSpacing: "-0.04em",
    color: "#1F1812"
  },
  nutritionSection: {
    display: "flex",
    flexDirection: "column"
  },
  nutritionRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderBottom: "1px solid rgba(136, 103, 79, 0.1)"
  },
  nutritionLabel: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "1.14em",
    letterSpacing: "-0.0009em",
    color: "#433D36"
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "1.14em",
    letterSpacing: "-0.05em",
    color: "#433D36"
  },
  rightPanel: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    position: "relative"
  },
  customizationsContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowY: "auto",
    paddingBottom: 72
  },
  customizationGroup: {
    display: "flex",
    flexDirection: "column",
    padding: "24px 20px"
  },
  customizationGroupFirst: {
    display: "flex",
    flexDirection: "column",
    padding: "24px 20px 0 20px"
  },
  groupHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 12
  },
  requiredBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    border: "1px solid rgba(136, 103, 79, 0.12)",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "1.17em",
    letterSpacing: "0.01em",
    color: "#433D36"
  },
  closeButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: 8,
    border: "1px solid #D6D6D6",
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "background-color 0.15s ease"
  },
  groupContent: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  groupTitle: {
    fontFamily: "'P22 Mackinac Pro', Georgia, serif",
    fontSize: 20,
    fontWeight: 500,
    lineHeight: "1.1em",
    letterSpacing: "-0.01em",
    color: "#1F1812",
    margin: 0,
    padding: "8px 0 16px 0"
  },
  optionRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 8px",
    gap: 8
  },
  optionLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    border: "1.5px solid #433D36",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  checkboxSelected: {
    width: 16,
    height: 16,
    borderRadius: 4,
    border: "1.5px solid #141414",
    backgroundColor: "#141414",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "1.14em",
    letterSpacing: "-0.0009em",
    color: "#433D36"
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "1.14em",
    letterSpacing: "-0.0009em",
    color: "#525252"
  },
  optionDivider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    margin: "0 8px"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 24,
    padding: "16px 24px",
    backgroundColor: "#FAF9F4",
    borderTop: "1px solid rgba(0, 0, 0, 0.08)"
  },
  secondaryButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 40,
    padding: "0 16px",
    backgroundColor: "transparent",
    border: "1px solid #D6D6D6",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "1.125em",
    letterSpacing: "-0.0018em",
    color: "#141414",
    transition: "background-color 0.15s ease",
    flex: 1,
    width: "100%"
  },
  primaryButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 40,
    padding: "0 16px",
    backgroundColor: "#F74C25",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "1.125em",
    letterSpacing: "-0.0018em",
    color: "#FFFFFF",
    transition: "background-color 0.15s ease",
    flex: 1
  },
  scheduleButtonWrapper: {
    position: "relative",
    flex: 1,
    display: "flex"
  },
  datePickerPopover: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    marginBottom: 8,
    width: 272,
    backgroundColor: "#FAF9F4",
    borderRadius: 16,
    border: "1px solid rgba(136, 103, 79, 0.1)",
    boxShadow: "0px 4px 94px 34px rgba(0, 0, 0, 0.07)",
    overflow: "hidden",
    zIndex: 10
  },
  datePickerList: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 12px"
  },
  dateOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: "16px 8px",
    cursor: "pointer",
    borderBottom: "1px solid rgba(136, 103, 79, 0.12)",
    transition: "background-color 0.15s ease"
  },
  dateOptionLast: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: "16px 8px",
    cursor: "pointer",
    transition: "background-color 0.15s ease"
  },
  dateCircle: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    border: "1px solid #CFC9C0",
    backgroundColor: "transparent",
    flexShrink: 0
  },
  dateCircleSelected: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#F74C25",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "1.14em",
    letterSpacing: "-0.0009em",
    color: "#433D36"
  },
  confirmationPopover: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    marginBottom: 8,
    width: 354,
    backgroundColor: "#FAF9F4",
    borderRadius: 16,
    border: "1px solid rgba(136, 103, 79, 0.1)",
    boxShadow: "0px 4px 94px 34px rgba(0, 0, 0, 0.07)",
    padding: 24,
    zIndex: 15
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "1.11em",
    letterSpacing: "-0.0026em",
    color: "#1F1812",
    margin: 0,
    marginBottom: 16
  },
  confirmationDescription: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "1.125em",
    letterSpacing: "-0.0018em",
    color: "#606060",
    margin: 0,
    marginBottom: 24,
    whiteSpace: "pre-line"
  },
  confirmationButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end"
  },
  confirmCancelButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    padding: "0 16px",
    backgroundColor: "transparent",
    border: "1px solid #D6D6D6",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "1.125em",
    letterSpacing: "-0.0018em",
    color: "#141414",
    transition: "background-color 0.15s ease"
  },
  confirmScheduleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    padding: "0 16px",
    backgroundColor: "#F74C25",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "1.125em",
    letterSpacing: "-0.0018em",
    color: "#FFFFFF",
    transition: "background-color 0.15s ease"
  },
  confirmationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 16,
    zIndex: 5
  }
};
var CloseIcon = () => /* @__PURE__ */ jsx11("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx11("path", { d: "M12 4L4 12M4 4L12 12", stroke: "#141414", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
var CheckIcon = () => /* @__PURE__ */ jsx11("svg", { width: "10", height: "8", viewBox: "0 0 10 8", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx11("path", { d: "M1 4L3.5 6.5L9 1", stroke: "#FFFFFF", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
var ChevronDownIcon2 = () => /* @__PURE__ */ jsx11("svg", { width: "16", height: "20", viewBox: "0 0 16 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx11("path", { d: "M4 8L8 12L12 8", stroke: "#141414", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
var CircleCheckIcon = () => /* @__PURE__ */ jsx11("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx11("path", { d: "M2 6L5 9L10 3", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
var getUpcomingWeekdays = (count = 5) => {
  const dates = [];
  const today = /* @__PURE__ */ new Date();
  let currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() + 1);
  while (dates.length < count) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
var formatDateLabel = (date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
};
var formatDayName = (date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
};
var formatShortDate = (date) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]}. ${date.getDate()}`;
};
var ItemModal = forwardRef11(
  ({
    isOpen,
    imageUrl,
    itemName,
    description,
    tags = [],
    nutrition,
    customizations = [],
    basePrice,
    currency = "$",
    onClose,
    onAddToBasket,
    onScheduleMeal,
    className,
    style
  }, ref) => {
    const [selections, setSelections] = useState6({});
    const [isDatePickerOpen, setIsDatePickerOpen] = useState6(false);
    const [selectedDate, setSelectedDate] = useState6(null);
    const [showConfirmation, setShowConfirmation] = useState6(false);
    const upcomingDates = getUpcomingWeekdays(5);
    useEffect6(() => {
      if (isOpen) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [isOpen]);
    useEffect6(() => {
      if (!isOpen) {
        setIsDatePickerOpen(false);
        setSelectedDate(null);
        setShowConfirmation(false);
      }
    }, [isOpen]);
    if (!isOpen) return null;
    const toggleOption = (groupId, optionId) => {
      setSelections((prev) => {
        const groupSelections = new Set(prev[groupId] || []);
        if (groupSelections.has(optionId)) {
          groupSelections.delete(optionId);
        } else {
          groupSelections.add(optionId);
        }
        return { ...prev, [groupId]: groupSelections };
      });
    };
    const calculateTotalPrice = () => {
      let total = basePrice;
      customizations.forEach((group) => {
        const groupSelections = selections[group.id] || /* @__PURE__ */ new Set();
        group.options.forEach((option) => {
          if (groupSelections.has(option.id) && option.price) {
            total += option.price;
          }
        });
      });
      return total;
    };
    const handleAddToBasket = () => {
      const selectedOptions = {};
      Object.entries(selections).forEach(([groupId, optionSet]) => {
        selectedOptions[groupId] = Array.from(optionSet);
      });
      onAddToBasket?.(selectedOptions, calculateTotalPrice());
    };
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose?.();
      }
    };
    const totalPrice = calculateTotalPrice();
    return /* @__PURE__ */ jsx11(
      "div",
      {
        style: styles11.overlay,
        onClick: handleOverlayClick,
        "data-component": "item-modal-overlay",
        children: /* @__PURE__ */ jsxs11(
          "div",
          {
            ref,
            className,
            style: { ...styles11.modal, ...style },
            "data-component": "item-modal",
            children: [
              showConfirmation && /* @__PURE__ */ jsx11(
                "div",
                {
                  style: styles11.confirmationOverlay,
                  onClick: () => {
                    setShowConfirmation(false);
                    setSelectedDate(null);
                  }
                }
              ),
              /* @__PURE__ */ jsxs11("div", { style: styles11.leftPanel, children: [
                /* @__PURE__ */ jsxs11("div", { style: styles11.itemDetails, children: [
                  /* @__PURE__ */ jsx11(
                    "img",
                    {
                      src: imageUrl,
                      alt: itemName,
                      style: styles11.itemImage
                    }
                  ),
                  /* @__PURE__ */ jsxs11("div", { style: styles11.itemInfo, children: [
                    /* @__PURE__ */ jsx11("h2", { style: styles11.itemName, children: itemName }),
                    description && /* @__PURE__ */ jsx11("p", { style: styles11.description, children: description }),
                    tags.length > 0 && /* @__PURE__ */ jsx11("div", { style: styles11.tagsContainer, children: tags.map((tag) => /* @__PURE__ */ jsx11("span", { style: styles11.tag, children: tag.label }, tag.id)) })
                  ] })
                ] }),
                nutrition && /* @__PURE__ */ jsxs11("div", { style: styles11.nutritionSection, children: [
                  nutrition.calories !== void 0 && /* @__PURE__ */ jsxs11("div", { style: styles11.nutritionRow, children: [
                    /* @__PURE__ */ jsx11("span", { style: styles11.nutritionLabel, children: "Calories" }),
                    /* @__PURE__ */ jsx11("span", { style: styles11.nutritionValue, children: nutrition.calories })
                  ] }),
                  nutrition.fat && /* @__PURE__ */ jsxs11("div", { style: styles11.nutritionRow, children: [
                    /* @__PURE__ */ jsx11("span", { style: styles11.nutritionLabel, children: "Fat" }),
                    /* @__PURE__ */ jsx11("span", { style: styles11.nutritionValue, children: nutrition.fat })
                  ] }),
                  nutrition.carbs && /* @__PURE__ */ jsxs11("div", { style: styles11.nutritionRow, children: [
                    /* @__PURE__ */ jsx11("span", { style: styles11.nutritionLabel, children: "Carbs" }),
                    /* @__PURE__ */ jsx11("span", { style: styles11.nutritionValue, children: nutrition.carbs })
                  ] }),
                  nutrition.protein && /* @__PURE__ */ jsxs11("div", { style: styles11.nutritionRow, children: [
                    /* @__PURE__ */ jsx11("span", { style: styles11.nutritionLabel, children: "Protein" }),
                    /* @__PURE__ */ jsx11("span", { style: styles11.nutritionValue, children: nutrition.protein })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs11("div", { style: styles11.rightPanel, children: [
                /* @__PURE__ */ jsx11("div", { style: styles11.customizationsContainer, children: customizations.map((group, groupIndex) => /* @__PURE__ */ jsxs11(
                  "div",
                  {
                    style: groupIndex === 0 ? styles11.customizationGroupFirst : styles11.customizationGroup,
                    children: [
                      groupIndex === 0 && /* @__PURE__ */ jsxs11("div", { style: styles11.groupHeader, children: [
                        group.requiredCount && /* @__PURE__ */ jsxs11("span", { style: styles11.requiredBadge, children: [
                          group.requiredCount,
                          " required selection",
                          group.requiredCount > 1 ? "s" : ""
                        ] }),
                        /* @__PURE__ */ jsx11(
                          "button",
                          {
                            style: styles11.closeButton,
                            onClick: onClose,
                            "aria-label": "Close modal",
                            onMouseEnter: (e) => {
                              e.currentTarget.style.backgroundColor = "#f5f5f5";
                            },
                            onMouseLeave: (e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                            },
                            children: /* @__PURE__ */ jsx11(CloseIcon, {})
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs11("div", { style: styles11.groupContent, children: [
                        /* @__PURE__ */ jsx11("h3", { style: styles11.groupTitle, children: group.title }),
                        group.options.map((option, optionIndex) => /* @__PURE__ */ jsxs11("div", { children: [
                          /* @__PURE__ */ jsxs11(
                            "div",
                            {
                              style: styles11.optionRow,
                              onClick: () => toggleOption(group.id, option.id),
                              children: [
                                /* @__PURE__ */ jsxs11("div", { style: styles11.optionLeft, children: [
                                  /* @__PURE__ */ jsx11(
                                    "div",
                                    {
                                      style: selections[group.id]?.has(option.id) ? styles11.checkboxSelected : styles11.checkbox,
                                      children: selections[group.id]?.has(option.id) && /* @__PURE__ */ jsx11(CheckIcon, {})
                                    }
                                  ),
                                  /* @__PURE__ */ jsx11("span", { style: styles11.optionLabel, children: option.label })
                                ] }),
                                option.price !== void 0 && option.price > 0 && /* @__PURE__ */ jsxs11("span", { style: styles11.optionPrice, children: [
                                  "+ ",
                                  currency,
                                  option.price.toFixed(2)
                                ] })
                              ]
                            }
                          ),
                          optionIndex < group.options.length - 1 && /* @__PURE__ */ jsx11("div", { style: styles11.optionDivider })
                        ] }, option.id))
                      ] })
                    ]
                  },
                  group.id
                )) }),
                /* @__PURE__ */ jsxs11("div", { style: styles11.footer, children: [
                  /* @__PURE__ */ jsxs11("div", { style: styles11.scheduleButtonWrapper, children: [
                    isDatePickerOpen && !showConfirmation && /* @__PURE__ */ jsx11("div", { style: styles11.datePickerPopover, children: /* @__PURE__ */ jsx11("div", { style: styles11.datePickerList, children: upcomingDates.map((date, index) => {
                      const isSelected = selectedDate?.getTime() === date.getTime();
                      const isLast = index === upcomingDates.length - 1;
                      return /* @__PURE__ */ jsxs11(
                        "div",
                        {
                          style: isLast ? styles11.dateOptionLast : styles11.dateOption,
                          onClick: () => {
                            setSelectedDate(date);
                            setIsDatePickerOpen(false);
                            setShowConfirmation(true);
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          },
                          children: [
                            /* @__PURE__ */ jsx11("div", { style: isSelected ? styles11.dateCircleSelected : styles11.dateCircle, children: isSelected && /* @__PURE__ */ jsx11(CircleCheckIcon, {}) }),
                            /* @__PURE__ */ jsx11("span", { style: styles11.dateLabel, children: formatDateLabel(date) })
                          ]
                        },
                        date.toISOString()
                      );
                    }) }) }),
                    showConfirmation && selectedDate && /* @__PURE__ */ jsxs11("div", { style: styles11.confirmationPopover, children: [
                      /* @__PURE__ */ jsxs11("h3", { style: styles11.confirmationTitle, children: [
                        "Scheduling for your ",
                        formatDayName(selectedDate)
                      ] }),
                      /* @__PURE__ */ jsxs11("p", { style: styles11.confirmationDescription, children: [
                        "You'll be charged (or discounted from your meal program) ",
                        formatShortDate(selectedDate),
                        ", at 9:10am",
                        "\n\n",
                        "Cancel or order something else before then"
                      ] }),
                      /* @__PURE__ */ jsxs11("div", { style: styles11.confirmationButtons, children: [
                        /* @__PURE__ */ jsx11(
                          "button",
                          {
                            style: styles11.confirmCancelButton,
                            onClick: () => {
                              setShowConfirmation(false);
                              setSelectedDate(null);
                            },
                            onMouseEnter: (e) => {
                              e.currentTarget.style.backgroundColor = "#f5f5f5";
                            },
                            onMouseLeave: (e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                            },
                            children: "Cancel"
                          }
                        ),
                        /* @__PURE__ */ jsx11(
                          "button",
                          {
                            style: styles11.confirmScheduleButton,
                            onClick: () => {
                              onScheduleMeal?.(selectedDate);
                              setShowConfirmation(false);
                            },
                            onMouseEnter: (e) => {
                              e.currentTarget.style.backgroundColor = "#e04420";
                            },
                            onMouseLeave: (e) => {
                              e.currentTarget.style.backgroundColor = "#F74C25";
                            },
                            children: "Schedule order"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs11(
                      "button",
                      {
                        style: styles11.secondaryButton,
                        onClick: () => {
                          if (showConfirmation) {
                            setShowConfirmation(false);
                          }
                          setIsDatePickerOpen(!isDatePickerOpen);
                        },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.backgroundColor = "#f5f5f5";
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        },
                        children: [
                          "Schedule meal",
                          /* @__PURE__ */ jsx11(ChevronDownIcon2, {})
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs11(
                    "button",
                    {
                      style: styles11.primaryButton,
                      onClick: handleAddToBasket,
                      onMouseEnter: (e) => {
                        e.currentTarget.style.backgroundColor = "#e04420";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.backgroundColor = "#F74C25";
                      },
                      children: [
                        "Add to basket \xB7 ",
                        currency,
                        totalPrice.toFixed(2)
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    );
  }
);
ItemModal.displayName = "ItemModal";

// src/lib/DayCard.tsx
import { forwardRef as forwardRef12 } from "react";
import { Fragment as Fragment3, jsx as jsx12, jsxs as jsxs12 } from "react/jsx-runtime";
var styles12 = {
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
    padding: 16,
    backgroundColor: "#FFFFFC",
    borderRadius: 8,
    border: "1px solid rgba(136, 103, 79, 0.12)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    flex: 1,
    minWidth: 200,
    height: 280,
    boxSizing: "border-box"
  },
  topContent: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    flex: 1
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  dayText: {
    fontSize: 18,
    fontWeight: 530,
    lineHeight: "20px",
    letterSpacing: "-0.05em",
    color: "#433D36",
    margin: 0
  },
  dateText: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "-0.05em",
    color: "#433D36",
    margin: 0
  },
  editText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "-0.0009em",
    color: "#3D3D3D",
    margin: 0,
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit"
  },
  imageContainer: {
    width: "100%",
    height: 112,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F0F0F0"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  brandRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  brandLogo: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    objectFit: "cover",
    backgroundColor: "#E0E0E0"
  },
  brandName: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "14px",
    letterSpacing: "0.01em",
    color: "#606060",
    margin: 0
  },
  dishName: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "-0.0009em",
    color: "#3D3D3D",
    margin: 0
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "14px",
    letterSpacing: "0.01em",
    color: "#606060",
    margin: 0
  },
  price: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "-0.0009em",
    color: "#433D36",
    margin: 0
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    paddingTop: 12
  },
  stipendBadge: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderRadius: 4
  },
  stipendIcon: {
    width: 16,
    height: 16
  },
  stipendText: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "14px",
    letterSpacing: "0.01em",
    color: "#2A7E3D",
    margin: 0
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    flex: 1
  },
  addMealButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontFamily: "inherit"
  },
  addIcon: {
    width: 24,
    height: 24
  },
  addMealText: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "-0.0009em",
    color: "#433D36",
    margin: 0
  }
};
var TicketIcon = () => /* @__PURE__ */ jsx12("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx12(
  "path",
  {
    d: "M13.3333 6.66667V4.66667C13.3333 4.3 13.0333 4 12.6667 4H3.33333C2.96667 4 2.66667 4.3 2.66667 4.66667V6.66667C3.4 6.66667 4 7.26667 4 8C4 8.73333 3.4 9.33333 2.66667 9.33333V11.3333C2.66667 11.7 2.96667 12 3.33333 12H12.6667C13.0333 12 13.3333 11.7 13.3333 11.3333V9.33333C12.6 9.33333 12 8.73333 12 8C12 7.26667 12.6 6.66667 13.3333 6.66667ZM12 5.33333V6.06667C11.2867 6.42 10.78 7.14667 10.78 8C10.78 8.85333 11.2867 9.58 12 9.93333V10.6667H4V9.93333C4.71333 9.58 5.22 8.85333 5.22 8C5.22 7.14 4.72 6.42 4 6.06V5.33333H12Z",
    fill: "#2A7E3D"
  }
) });
var AddIcon = () => /* @__PURE__ */ jsx12("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx12(
  "path",
  {
    d: "M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z",
    fill: "#433D36"
  }
) });
var DayCard = forwardRef12(
  ({
    day,
    date,
    hasMeal = false,
    meal,
    stipendAmount,
    isActive = false,
    onEdit,
    onAddMeal,
    onClick,
    className,
    style
  }, ref) => {
    const formatPrice = (price) => {
      return `$${price.toFixed(2)}`;
    };
    const formatStipend = (amount) => {
      return `$${amount.toFixed(2)} Stipend`;
    };
    return /* @__PURE__ */ jsxs12(
      "div",
      {
        ref,
        className,
        style: {
          ...styles12.card,
          ...style
        },
        onClick,
        "data-component": "day-card",
        children: [
          /* @__PURE__ */ jsxs12("div", { style: styles12.header, children: [
            /* @__PURE__ */ jsxs12("div", { style: styles12.dateContainer, children: [
              /* @__PURE__ */ jsx12("span", { style: styles12.dayText, children: day }),
              /* @__PURE__ */ jsx12("span", { style: styles12.dateText, children: date })
            ] }),
            hasMeal && meal && /* @__PURE__ */ jsx12(
              "button",
              {
                style: styles12.editText,
                onClick: (e) => {
                  e.stopPropagation();
                  onEdit?.();
                },
                children: "Edit"
              }
            )
          ] }),
          hasMeal && meal ? /* @__PURE__ */ jsxs12(Fragment3, { children: [
            /* @__PURE__ */ jsxs12("div", { style: styles12.topContent, children: [
              meal.imageUrl && /* @__PURE__ */ jsx12("div", { style: styles12.imageContainer, children: /* @__PURE__ */ jsx12("img", { src: meal.imageUrl, alt: meal.dishName, style: styles12.image }) }),
              /* @__PURE__ */ jsxs12("div", { style: styles12.dataContainer, children: [
                /* @__PURE__ */ jsxs12("div", { style: styles12.brandRow, children: [
                  meal.restaurantLogo && /* @__PURE__ */ jsx12("img", { src: meal.restaurantLogo, alt: "", style: styles12.brandLogo }),
                  /* @__PURE__ */ jsx12("span", { style: styles12.brandName, children: meal.restaurantName })
                ] }),
                /* @__PURE__ */ jsx12("span", { style: styles12.dishName, children: meal.dishName }),
                meal.description && /* @__PURE__ */ jsx12("span", { style: styles12.description, children: meal.description }),
                /* @__PURE__ */ jsx12("span", { style: styles12.price, children: formatPrice(meal.price) })
              ] })
            ] }),
            stipendAmount && stipendAmount > 0 && /* @__PURE__ */ jsx12("div", { style: styles12.messageContainer, children: /* @__PURE__ */ jsxs12("div", { style: styles12.stipendBadge, children: [
              /* @__PURE__ */ jsx12(TicketIcon, {}),
              /* @__PURE__ */ jsx12("span", { style: styles12.stipendText, children: formatStipend(stipendAmount) })
            ] }) })
          ] }) : (
            /* Empty state - Add meal */
            /* @__PURE__ */ jsx12("div", { style: styles12.emptyState, children: /* @__PURE__ */ jsxs12(
              "button",
              {
                style: styles12.addMealButton,
                onClick: (e) => {
                  e.stopPropagation();
                  onAddMeal?.();
                },
                children: [
                  /* @__PURE__ */ jsx12(AddIcon, {}),
                  /* @__PURE__ */ jsx12("span", { style: styles12.addMealText, children: "Add meal" })
                ]
              }
            ) })
          )
        ]
      }
    );
  }
);
DayCard.displayName = "DayCard";

// src/lib/WeekSelector.tsx
import { forwardRef as forwardRef13 } from "react";
import { jsx as jsx13 } from "react/jsx-runtime";
var styles13 = {
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  pill: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: "12px 24px",
    borderRadius: 28,
    border: "1px solid #CFC9C0",
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "all 0.15s ease"
  },
  pillActive: {
    backgroundColor: "#292929",
    border: "1px solid rgba(247, 76, 37, 0.2)"
  },
  pillText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "-0.05em",
    color: "#1F1812",
    margin: 0
  },
  pillTextActive: {
    color: "#FAF7F0"
  }
};
var WeekSelector = forwardRef13(
  ({
    weeks,
    selectedWeekId,
    onSelectWeek,
    className,
    style
  }, ref) => {
    return /* @__PURE__ */ jsx13(
      "div",
      {
        ref,
        className,
        style: {
          ...styles13.container,
          ...style
        },
        "data-component": "week-selector",
        children: weeks.map((week) => {
          const isActive = week.id === selectedWeekId;
          return /* @__PURE__ */ jsx13(
            "button",
            {
              style: {
                ...styles13.pill,
                ...isActive ? styles13.pillActive : {}
              },
              onClick: () => onSelectWeek?.(week),
              children: /* @__PURE__ */ jsx13(
                "span",
                {
                  style: {
                    ...styles13.pillText,
                    ...isActive ? styles13.pillTextActive : {}
                  },
                  children: week.label
                }
              )
            },
            week.id
          );
        })
      }
    );
  }
);
WeekSelector.displayName = "WeekSelector";

// src/lib/RotationHeader.tsx
import { forwardRef as forwardRef14 } from "react";
import { jsx as jsx14, jsxs as jsxs13 } from "react/jsx-runtime";
var styles14 = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
    width: "100%",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  left: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1
  },
  title: {
    fontSize: 28,
    fontWeight: 500,
    lineHeight: "30px",
    letterSpacing: "-0.006em",
    color: "#1F1812",
    margin: 0,
    fontFamily: "'P22 Mackinac Pro', Georgia, serif"
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "-0.0009em",
    color: "#433D36",
    margin: 0
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: "0 16px",
    height: 40,
    backgroundColor: "transparent",
    border: "1px solid #CFC9C0",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.15s ease",
    fontFamily: "inherit"
  },
  buttonIcon: {
    width: 16,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "-0.0018em",
    color: "#141414",
    margin: 0
  }
};
var ShuffleIcon = () => /* @__PURE__ */ jsx14("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx14(
  "path",
  {
    d: "M5.83333 15.8333H3.33333V14.1667H5.83333C7.21667 14.1667 8.475 13.4583 9.16667 12.3333L9.975 13.1417C9.05833 14.5833 7.525 15.8333 5.83333 15.8333ZM14.1667 15.8333V14.1667H15.4917L13.825 12.5L15 11.325L16.6667 12.9917V11.6667H18.3333V15.8333H14.1667ZM3.33333 5.83333V4.16667H5.83333C7.525 4.16667 9.05833 5.41667 9.975 6.85833L13.825 10.7083L15.4917 9.04167H14.1667V5.83333H18.3333V10H16.6667V8.675L15 10.3417L12.0083 7.35C12.6917 6.225 13.95 5.83333 15.3333 5.83333H16.6583L15 4.16667L14.1667 5V4.16667H18.3333V5.83333H16.6667V5L15 6.66667H5.83333C4.44167 6.66667 3.33333 5.83333 3.33333 5.83333Z",
    fill: "#141414"
  }
) });
var MealsIcon = () => /* @__PURE__ */ jsx14("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx14(
  "path",
  {
    d: "M15.8333 3.33333V8.33333C15.8333 9.25 15.0833 10 14.1667 10H12.5V16.6667H10.8333V10H9.16667C8.25 10 7.5 9.25 7.5 8.33333V3.33333H9.16667V7.5H10V3.33333H11.6667V7.5H12.5V3.33333H14.1667V7.5H15V3.33333H15.8333ZM5.83333 3.33333V10H7.5V16.6667H5.83333V10H4.16667V3.33333H5.83333Z",
    fill: "#141414"
  }
) });
var DaysIcon = () => /* @__PURE__ */ jsx14("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx14(
  "path",
  {
    d: "M15.8333 3.33333H15V2.5H13.3333V3.33333H6.66667V2.5H5V3.33333H4.16667C3.25 3.33333 2.5 4.08333 2.5 5V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V5C17.5 4.08333 16.75 3.33333 15.8333 3.33333ZM15.8333 15.8333H4.16667V8.33333H15.8333V15.8333ZM15.8333 6.66667H4.16667V5H15.8333V6.66667Z",
    fill: "#141414"
  }
) });
var PauseIcon = () => /* @__PURE__ */ jsx14("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx14(
  "path",
  {
    d: "M10 1.66667C5.4 1.66667 1.66667 5.4 1.66667 10C1.66667 14.6 5.4 18.3333 10 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66667 10 1.66667ZM10 16.6667C6.31667 16.6667 3.33333 13.6833 3.33333 10C3.33333 6.31667 6.31667 3.33333 10 3.33333C13.6833 3.33333 16.6667 6.31667 16.6667 10C16.6667 13.6833 13.6833 16.6667 10 16.6667ZM8.33333 6.66667H6.66667V13.3333H8.33333V6.66667ZM13.3333 6.66667H11.6667V13.3333H13.3333V6.66667Z",
    fill: "#141414"
  }
) });
var ActionButton = ({ icon, label, onClick }) => /* @__PURE__ */ jsxs13("button", { style: styles14.button, onClick, children: [
  /* @__PURE__ */ jsx14("span", { style: styles14.buttonIcon, children: icon }),
  /* @__PURE__ */ jsx14("span", { style: styles14.buttonLabel, children: label })
] });
var RotationHeader = forwardRef14(
  ({
    title,
    subtitle,
    showActions = true,
    onShuffle,
    onMeals,
    onDays,
    onPause,
    className,
    style
  }, ref) => {
    return /* @__PURE__ */ jsxs13(
      "div",
      {
        ref,
        className,
        style: {
          ...styles14.container,
          ...style
        },
        "data-component": "rotation-header",
        children: [
          /* @__PURE__ */ jsxs13("div", { style: styles14.left, children: [
            /* @__PURE__ */ jsx14("h1", { style: styles14.title, children: title }),
            subtitle && /* @__PURE__ */ jsx14("span", { style: styles14.subtitle, children: subtitle })
          ] }),
          showActions && /* @__PURE__ */ jsxs13("div", { style: styles14.actions, children: [
            /* @__PURE__ */ jsx14(ActionButton, { icon: /* @__PURE__ */ jsx14(ShuffleIcon, {}), label: "Shuffle", onClick: onShuffle }),
            /* @__PURE__ */ jsx14(ActionButton, { icon: /* @__PURE__ */ jsx14(MealsIcon, {}), label: "Meals", onClick: onMeals }),
            /* @__PURE__ */ jsx14(ActionButton, { icon: /* @__PURE__ */ jsx14(DaysIcon, {}), label: "Days", onClick: onDays }),
            /* @__PURE__ */ jsx14(ActionButton, { icon: /* @__PURE__ */ jsx14(PauseIcon, {}), label: "Pause", onClick: onPause })
          ] })
        ]
      }
    );
  }
);
RotationHeader.displayName = "RotationHeader";
export {
  Banner,
  DayCard,
  FilterChip,
  FilterChipCarousel,
  FloatingPanel,
  Header,
  ITEM_CARD_BADGE_COLORS,
  ItemCard,
  ItemCarousel,
  ItemModal,
  RotationHeader,
  ScheduledOrder,
  StoreCard,
  StoreCarousel,
  WeekSelector
};
//# sourceMappingURL=index.js.map