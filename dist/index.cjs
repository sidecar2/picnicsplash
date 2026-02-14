"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib/index.ts
var index_exports = {};
__export(index_exports, {
  Banner: () => Banner,
  FilterChip: () => FilterChip,
  FilterChipCarousel: () => FilterChipCarousel,
  Header: () => Header,
  ITEM_CARD_BADGE_COLORS: () => ITEM_CARD_BADGE_COLORS,
  ItemCard: () => ItemCard,
  ItemCarousel: () => ItemCarousel,
  StoreCard: () => StoreCard,
  StoreCarousel: () => StoreCarousel
});
module.exports = __toCommonJS(index_exports);

// src/lib/ItemCard.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
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
var PlusIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var ItemCard = (0, import_react.forwardRef)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className,
        style: { ...styles.card, ...style },
        "data-component": "item-card",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.content, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "img",
                  {
                    src: imageUrl,
                    alt: dishName,
                    style: styles.image
                  }
                ),
                badgeText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.badge, backgroundColor: effectiveBadgeColor }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badgeText, children: badgeText }) }),
                showFavoriteButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlusIcon, {})
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.data, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.restaurant, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "img",
                {
                  src: restaurantLogo,
                  alt: restaurantName,
                  style: styles.restaurantLogo
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.restaurantName, children: restaurantName })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: styles.dishName, children: dishName }),
            discount && originalPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.priceContainer, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.originalPrice, children: [
                currency,
                originalPrice.toFixed(2)
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.separator, children: "\xB7" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.discountPrice, children: [
                currency,
                price.toFixed(2)
              ] })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { style: styles.price, children: [
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
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
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
var StoreCard = (0, import_react2.forwardRef)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        ref,
        className,
        style: { ...styles2.card, ...style },
        onClick,
        "data-component": "store-card",
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: styles2.content, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "img",
                  {
                    src: imageUrl,
                    alt: storeName,
                    style: styles2.image
                  }
                ),
                showLogo && logoUrl && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: styles2.logo, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "img",
                  {
                    src: logoUrl,
                    alt: `${storeName} logo`,
                    style: styles2.logoImage
                  }
                ) }),
                badgeText && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { ...styles2.badge, backgroundColor: badgeColor }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: styles2.badgeText, children: badgeText }) })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: styles2.dataContainer, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { style: styles2.storeName, children: storeName }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: styles2.category, children: category })
          ] })
        ] })
      }
    );
  }
);
StoreCard.displayName = "StoreCard";

// src/lib/ItemCarousel.tsx
var import_react3 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
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
var ChevronLeftIcon = () => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var ChevronRightIcon = () => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var ItemCarousel = (0, import_react3.forwardRef)(
  ({
    title,
    items,
    visibleCount = 5,
    gap = 16,
    onItemClick,
    onItemFavorite,
    favoritedIds = /* @__PURE__ */ new Set(),
    showArrows = true,
    className,
    style
  }, ref) => {
    const [currentIndex, setCurrentIndex] = (0, import_react3.useState)(0);
    const [itemWidth, setItemWidth] = (0, import_react3.useState)(180);
    const containerRef = (0, import_react3.useRef)(null);
    (0, import_react3.useEffect)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        ref,
        className,
        style: { ...styles3.container, ...style },
        "data-component": "item-carousel",
        children: [
          (title || showArrows && items.length > visibleCount) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: styles3.header, children: [
            title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { style: styles3.title, children: title }),
            !title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {}),
            showArrows && items.length > visibleCount && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: styles3.navButtons, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronLeftIcon, {})
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronRightIcon, {})
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ref: containerRef, style: styles3.viewport, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              style: {
                ...styles3.track,
                gap,
                transform: `translateX(${translateX}px)`
              },
              children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  style: {
                    ...styles3.itemWrapper,
                    width: itemWidth
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var import_react4 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
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
var ChevronLeftIcon2 = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var ChevronRightIcon2 = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var StoreCarousel = (0, import_react4.forwardRef)(
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
    const [currentIndex, setCurrentIndex] = (0, import_react4.useState)(0);
    const [storeWidth, setStoreWidth] = (0, import_react4.useState)(280);
    const containerRef = (0, import_react4.useRef)(null);
    (0, import_react4.useEffect)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        ref,
        className,
        style: { ...styles4.container, ...style },
        "data-component": "store-carousel",
        children: [
          (title || subtitle || showArrows && stores.length > visibleCount) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: styles4.header, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: styles4.titleContainer, children: [
              title && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { style: styles4.title, children: title }),
              subtitle && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { style: styles4.subtitle, children: subtitle })
            ] }),
            showArrows && stores.length > visibleCount && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: styles4.navButtons, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronLeftIcon2, {})
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronRightIcon2, {})
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ref: containerRef, style: styles4.viewport, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "div",
            {
              style: {
                ...styles4.track,
                gap,
                transform: `translateX(${translateX}px)`
              },
              children: stores.map((store) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "div",
                {
                  style: {
                    ...styles4.storeWrapper,
                    width: storeWidth
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_react5 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
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
var FilterChip = (0, import_react5.forwardRef)(
  ({
    label,
    icon,
    isActive = false,
    onClick,
    className,
    style
  }, ref) => {
    const isEmoji = icon && !icon.startsWith("http") && !icon.startsWith("/");
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
          icon && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: styles5.icon, children: isEmoji ? icon : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("img", { src: icon, alt: "", style: styles5.iconImage }) }),
          label
        ]
      }
    );
  }
);
FilterChip.displayName = "FilterChip";

// src/lib/FilterChipCarousel.tsx
var import_react6 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
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
var ChevronLeftIcon3 = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var ChevronRightIcon3 = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var FilterChipCarousel = (0, import_react6.forwardRef)(
  ({
    chips,
    activeChipId,
    onChipClick,
    gap = 8,
    showArrows = true,
    className,
    style
  }, ref) => {
    const [scrollPosition, setScrollPosition] = (0, import_react6.useState)(0);
    const [maxScroll, setMaxScroll] = (0, import_react6.useState)(0);
    const trackRef = (0, import_react6.useRef)(null);
    const viewportRef = (0, import_react6.useRef)(null);
    (0, import_react6.useEffect)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        ref,
        className,
        style: { ...styles6.container, ...style },
        "data-component": "filter-chip-carousel",
        children: [
          showArrows && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
              children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ChevronLeftIcon3, {})
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "div",
            {
              ref: viewportRef,
              style: {
                ...styles6.viewport,
                paddingRight: showArrows ? 40 : 0
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "div",
                  {
                    style: {
                      ...styles6.fadeOverlay,
                      ...styles6.fadeLeft,
                      opacity: canGoBack ? 1 : 0
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "div",
                  {
                    ref: trackRef,
                    style: {
                      ...styles6.track,
                      gap,
                      transform: `translateX(-${scrollPosition}px)`
                    },
                    children: chips.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
          showArrows && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
              children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ChevronRightIcon3, {})
            }
          )
        ]
      }
    );
  }
);
FilterChipCarousel.displayName = "FilterChipCarousel";

// src/lib/Header.tsx
var import_react7 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
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
var LocationIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  "path",
  {
    d: "M8 1.33334C5.42 1.33334 3.33333 3.42001 3.33333 6.00001C3.33333 9.50001 8 14.6667 8 14.6667C8 14.6667 12.6667 9.50001 12.6667 6.00001C12.6667 3.42001 10.58 1.33334 8 1.33334ZM8 7.66668C7.08 7.66668 6.33333 6.92001 6.33333 6.00001C6.33333 5.08001 7.08 4.33334 8 4.33334C8.92 4.33334 9.66667 5.08001 9.66667 6.00001C9.66667 6.92001 8.92 7.66668 8 7.66668Z",
    fill: "#141414"
  }
) });
var ClockIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  "path",
  {
    d: "M7.99333 1.33334C4.31333 1.33334 1.33333 4.32001 1.33333 8.00001C1.33333 11.68 4.31333 14.6667 7.99333 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00001C14.6667 4.32001 11.68 1.33334 7.99333 1.33334ZM8 13.3333C5.05333 13.3333 2.66667 10.9467 2.66667 8.00001C2.66667 5.05334 5.05333 2.66668 8 2.66668C10.9467 2.66668 13.3333 5.05334 13.3333 8.00001C13.3333 10.9467 10.9467 13.3333 8 13.3333ZM8.33333 4.66668H7.33333V8.66668L10.8333 10.7667L11.3333 9.94668L8.33333 8.16668V4.66668Z",
    fill: "#3D3D3D"
  }
) });
var GroupIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  "path",
  {
    d: "M12.5 10C13.88 10 14.99 8.88 14.99 7.5C14.99 6.12 13.88 5 12.5 5C11.12 5 10 6.12 10 7.5C10 8.88 11.12 10 12.5 10ZM6.25 8.75V6.25H4.58333V8.75H2.08333V10.4167H4.58333V12.9167H6.25V10.4167H8.75V8.75H6.25ZM12.5 11.6667C10.725 11.6667 7.08333 12.5583 7.08333 14.3333V15.8333H17.9167V14.3333C17.9167 12.5583 14.275 11.6667 12.5 11.6667Z",
    fill: "#000000"
  }
) });
var BasketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  "path",
  {
    d: "M15.8333 6.66667H14.1667C14.1667 4.36667 12.3 2.5 10 2.5C7.7 2.5 5.83333 4.36667 5.83333 6.66667H4.16667C3.25 6.66667 2.5 7.41667 2.5 8.33333V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V8.33333C17.5 7.41667 16.75 6.66667 15.8333 6.66667ZM10 4.16667C11.3833 4.16667 12.5 5.28333 12.5 6.66667H7.5C7.5 5.28333 8.61667 4.16667 10 4.16667ZM15.8333 15.8333H4.16667V8.33333H15.8333V15.8333ZM10 10C8.61667 10 7.5 11.1167 7.5 12.5C7.5 13.8833 8.61667 15 10 15C11.3833 15 12.5 13.8833 12.5 12.5C12.5 11.1167 11.3833 10 10 10Z",
    fill: "#6C6C6C"
  }
) });
var SearchIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  "path",
  {
    d: "M13.1292 11.8792H12.4709L12.2375 11.6542C13.0542 10.7042 13.5459 9.47084 13.5459 8.12918C13.5459 5.13751 11.1209 2.71251 8.12919 2.71251C5.13752 2.71251 2.71252 5.13751 2.71252 8.12918C2.71252 11.1208 5.13752 13.5458 8.12919 13.5458C9.47085 13.5458 10.7042 13.0542 11.6542 12.2375L11.8792 12.4708V13.1292L16.0459 17.2875L17.2875 16.0458L13.1292 11.8792ZM8.12919 11.8792C6.05419 11.8792 4.37919 10.2042 4.37919 8.12918C4.37919 6.05418 6.05419 4.37918 8.12919 4.37918C10.2042 4.37918 11.8792 6.05418 11.8792 8.12918C11.8792 10.2042 10.2042 11.8792 8.12919 11.8792Z",
    fill: "#141414"
  }
) });
var ChevronDownIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  "path",
  {
    d: "M4.94 5.72668L8 8.78002L11.06 5.72668L12 6.66668L8 10.6667L4 6.66668L4.94 5.72668Z",
    fill: "#141414"
  }
) });
var DefaultLogo = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { width: "87", height: "28", viewBox: "0 0 87 28", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { width: "87", height: "28", rx: "4", fill: "#F74C25" }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("text", { x: "43.5", y: "18", textAnchor: "middle", fill: "white", fontSize: "12", fontWeight: "600", fontFamily: "Inter, sans-serif", children: "LOGO" })
] });
var Header = (0, import_react7.forwardRef)(
  ({
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
    const [isStacked, setIsStacked] = (0, import_react7.useState)(false);
    const centerRef = (0, import_react7.useRef)(null);
    const rightRef = (0, import_react7.useRef)(null);
    (0, import_react7.useEffect)(() => {
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
    }, [locationName, orderTiming, countdownText]);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "div",
      {
        ref,
        className,
        style: { ...styles7.headerWrapper, ...style },
        "data-component": "header",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("header", { style: styles7.header, "data-header-row": "primary", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { style: styles7.leftSection, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { style: styles7.logo, onClick: onLogoClick, children: logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("img", { src: logoUrl, alt: "Logo", style: { height: "100%" } }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DefaultLogo, {}) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
              "div",
              {
                ref: centerRef,
                style: {
                  ...styles7.centerSection,
                  visibility: isStacked ? "hidden" : "visible"
                },
                "data-header-center": true,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                    "button",
                    {
                      style: styles7.locationButton,
                      onClick: onLocationClick,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LocationIcon, {}),
                        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { style: styles7.locationText, children: [
                          locationName,
                          " \xB7 ",
                          orderTiming
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChevronDownIcon, {})
                      ]
                    }
                  ),
                  countdownText && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { style: styles7.statusBadge, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ClockIcon, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { style: styles7.statusText, children: countdownText })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { ref: rightRef, style: styles7.rightSection, children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SearchIcon, {})
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(GroupIcon, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { style: { ...styles7.buttonLabel, ...styles7.teamOrderLabel }, children: "Team order" })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(BasketIcon, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { style: { ...styles7.buttonLabel, ...styles7.basketLabel }, children: basketCount !== void 0 ? `Basket (${basketCount})` : "Basket" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "div",
            {
              style: {
                ...styles7.secondaryRow,
                display: isStacked ? "flex" : "none"
              },
              "data-header-row": "secondary",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                  "button",
                  {
                    style: styles7.locationButton,
                    onClick: onLocationClick,
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LocationIcon, {}),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { style: styles7.locationText, children: [
                        locationName,
                        " \xB7 ",
                        orderTiming
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChevronDownIcon, {})
                    ]
                  }
                ),
                countdownText && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { style: styles7.statusBadge, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ClockIcon, {}),
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { style: styles7.statusText, children: countdownText })
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
var import_react8 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
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
var Banner = (0, import_react8.forwardRef)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { style: styles8.contentWrapper, children: [
            logo && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: styles8.logo, children: typeof logo === "string" ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("img", { src: logo, alt: "", style: { width: "100%", height: "100%", objectFit: "contain" } }) : logo }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { style: styles8.textContent, children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h3", { style: { ...styles8.title, color: txtColor }, children: title }),
              subtitle && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { style: { ...styles8.subtitle, color: txtColor }, children: subtitle }),
              ctaText && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
          imageUrl && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { style: styles8.imageContainer, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: { ...styles8.imageOverlay, background: `linear-gradient(90deg, ${bgColor} 0%, transparent 100%)` } }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("img", { src: imageUrl, alt: "", style: styles8.image })
          ] })
        ]
      }
    );
  }
);
Banner.displayName = "Banner";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Banner,
  FilterChip,
  FilterChipCarousel,
  Header,
  ITEM_CARD_BADGE_COLORS,
  ItemCard,
  ItemCarousel,
  StoreCard,
  StoreCarousel
});
//# sourceMappingURL=index.cjs.map