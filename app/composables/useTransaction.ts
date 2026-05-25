interface TransactionItem {
  variant: string;
  color: string;
  quantity: number;
}

interface Transaction {
  id: number;
  date: string;
  time: string;

  item: TransactionItem[];

  expectedArrive: string;
  isDelivered: boolean;

  totalPrice: number;
}

function getRandomDate(
  start: Date = new Date(),
  end: Date = new Date("2026-6-1"),
): Date {
  const startTime = start.getTime();
  const endTime = end.getTime();

  const randomTime = startTime + Math.random() * (endTime - startTime);

  return new Date(randomTime);
}

function checkIsDelivered(tx: Transaction[]) {
  const currentTime = new Date();

  tx.forEach((transaction) => {
    const expectedTime = new Date(transaction.expectedArrive);

    if (currentTime >= expectedTime) transaction.isDelivered = true;
    else transaction.isDelivered = false;
  });

  return tx;
}

export function useTransaction() {
  const cart = useCart();
  const transactions = useState<Transaction[]>("transactions", () => []);

  onMounted(() => {
    const storedtransactions = localStorage.getItem("transactions");
    if (storedtransactions) {
      transactions.value = JSON.parse(storedtransactions);
      checkIsDelivered(transactions.value);
    }
  });

  function checkOut() {
    if (cart.cart.value.length <= 0) {
      console.log("No Transaction");
      return;
    }

    transactions.value.push({
      id: Date.now(),
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),

      item: cart.cart.value.map((cartItem: any) => ({
        variant: cartItem.variant,
        color: cartItem.color,
        quantity: cartItem.quantity,
      })),

      expectedArrive: getRandomDate().toISOString(),
      isDelivered: false,

      totalPrice: cart.totalPrice.value,
    });

    cart.clearCart();
  }

  function clearTransaction(transactionToClear: Transaction) {
    transactions.value = transactions.value.filter(
      (it) => it.id != transactionToClear.id,
    );
  }

  function clearAllTransactions() {
    transactions.value = [];
  }

  watch(
    transactions,
    (newTransactions) => {
      if (import.meta.client) {
        if (newTransactions.length === 0)
          localStorage.removeItem("transactions");
        else
          localStorage.setItem("transactions", JSON.stringify(newTransactions));
      }
    },
    { deep: true },
  );

  return {
    // Variables
    transactions,

    // function
    checkOut,
    clearTransaction,
    clearAllTransactions,
  };
}
