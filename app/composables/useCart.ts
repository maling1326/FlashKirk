import { PRODUCT } from "~/utils/product";

export interface Cart {
  name: string;
  price: number;
  variant: string;
  color: string;
  quantity: number;
}

export function useCart() {
  const taxRate = ref(0.1);

  const cart = useState<Cart[]>("cart", () => []);
  const totalPrice = computed(() => {
    return cart.value.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  });
  const totalQuantity = computed(() => {
    return cart.value.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  });
  const taxAmount = computed(() => totalPrice.value * taxRate.value);
  const grandTotal = computed(() => totalPrice.value + taxAmount.value);

  onMounted(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) cart.value = JSON.parse(storedCart);
  });

  const defaultVariant =
    PRODUCT.CAPACITY.at(1)?.SIZE ?? PRODUCT.CAPACITY[0]?.SIZE ?? "";
  const defaultPrice =
    PRODUCT.CAPACITY.at(1)?.PRICE ?? PRODUCT.CAPACITY[0]?.PRICE ?? 0;
  const defaultColor = PRODUCT.COLOR.at(1) ?? PRODUCT.COLOR[0] ?? "";

  function addItemToCart(
    name: string = PRODUCT.NAME,
    variant: string = defaultVariant,
    price: number = defaultPrice,
    color: string = defaultColor,
  ) {
    const existingItem = cart.value.find(
      (item) =>
        item.name === name && item.variant === variant && item.color === color,
    );
    if (existingItem) existingItem.quantity += 1;
    else
      cart.value.push({
        name,
        variant,
        price,
        color,
        quantity: 1,
      });
  }

  function removeItemFromCart(item: Cart, all: boolean = false) {
    const existingItem = cart.value.find(
      (it) =>
        it.name === item.name &&
        it.variant === item.variant &&
        it.color === item.color,
    );
    if (!existingItem) return;

    if (!all && existingItem.quantity > 1) existingItem.quantity -= 1;
    else
      cart.value = cart.value.filter(
        (it) =>
          !(
            it.name === item.name &&
            it.variant === item.variant &&
            it.color === item.color
          ),
      );
  }

  function editItemFromCart(
    item: Cart,
    toSize?: string,
    toPrice?: number,
    toColor?: string,
  ) {
    const itemIndex = cart.value.findIndex(
      (it) =>
        it.name === item.name &&
        it.variant === item.variant &&
        it.color === item.color,
    );
    if (itemIndex === -1) return;

    const existingItem = cart.value[itemIndex];
    if (!existingItem) return;

    const newSize = toSize ?? existingItem.variant;
    const newPrice = toPrice ?? existingItem.price;
    const newColor = toColor ?? existingItem.color;

    const duplicateItem = cart.value.find(
      (it, index) =>
        itemIndex !== index &&
        it.name === existingItem.name &&
        it.variant === newSize &&
        it.color === newColor,
    );
    if (duplicateItem) {
      duplicateItem.quantity += existingItem.quantity;
      cart.value.splice(itemIndex, 1);
    } else {
      existingItem.variant = newSize;
      existingItem.price = newPrice;
      existingItem.color = newColor;
    }
  }

  function clearCart() {
    cart.value = [];
  }

  watch(
    cart,
    (newCart) => {
      if (import.meta.client) {
        if (newCart.length === 0) localStorage.removeItem("cart");
        else localStorage.setItem("cart", JSON.stringify(newCart));
      }
    },
    { deep: true },
  );

  return {
    // Variables
    cart,
    totalPrice,
    totalQuantity,
    taxRate,
    taxAmount,
    grandTotal,

    // Functions
    addItemToCart,
    removeItemFromCart,
    editItemFromCart,
    clearCart,
  };
}
