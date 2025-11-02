import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import CartSheet from '@/components/CartSheet';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';
import { menuItems, type MenuItem } from '@/data/menuItems';

interface CartItem extends MenuItem {
  quantity: number;
}

interface PurchaseStats {
  itemId: number;
  itemName: string;
  totalQuantity: number;
  totalSpent: number;
}

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [balance, setBalance] = useState(0);
  const [currentTab, setCurrentTab] = useState('all');
  const [isBalanceSheetOpen, setIsBalanceSheetOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseStats[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('fastburger_stats');
    if (saved) {
      setPurchaseHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fastburger_stats', JSON.stringify(purchaseHistory));
  }, [purchaseHistory]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast({
      title: "Добавлено в корзину",
      description: `${item.name} добавлен в вашу корзину`,
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (amount > 0) {
      setBalance(prev => prev + amount);
      setTopUpAmount('');
      setIsBalanceSheetOpen(false);
      toast({
        title: "Баланс пополнен",
        description: `Добавлено ${amount} ₽`,
      });
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Корзина пуста",
        description: "Добавьте товары в корзину",
        variant: "destructive"
      });
      return;
    }

    if (balance < cartTotal) {
      toast({
        title: "Недостаточно средств",
        description: "Пополните баланс для оформления заказа",
        variant: "destructive"
      });
      return;
    }

    setPurchaseHistory(prev => {
      const updated = [...prev];
      cart.forEach(cartItem => {
        const existingStat = updated.find(stat => stat.itemId === cartItem.id);
        if (existingStat) {
          existingStat.totalQuantity += cartItem.quantity;
          existingStat.totalSpent += cartItem.price * cartItem.quantity;
        } else {
          updated.push({
            itemId: cartItem.id,
            itemName: cartItem.name,
            totalQuantity: cartItem.quantity,
            totalSpent: cartItem.price * cartItem.quantity
          });
        }
      });
      return updated;
    });

    setBalance(prev => prev - cartTotal);
    setCart([]);
    toast({
      title: "Заказ оформлен!",
      description: `Списано ${cartTotal} ₽. Ваш заказ готовится!`,
    });
  };

  const filteredItems = currentTab === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === currentTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header
        balance={balance}
        cartItemsCount={cartItemsCount}
        isBalanceSheetOpen={isBalanceSheetOpen}
        setIsBalanceSheetOpen={setIsBalanceSheetOpen}
        topUpAmount={topUpAmount}
        setTopUpAmount={setTopUpAmount}
        handleTopUp={handleTopUp}
        cartSheet={
          <CartSheet
            cart={cart}
            cartItemsCount={cartItemsCount}
            cartTotal={cartTotal}
            balance={balance}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            handleCheckout={handleCheckout}
          />
        }
      />

      <HeroSection />

      <MenuSection
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        filteredItems={filteredItems}
        addToCart={addToCart}
      />

      <StatsSection purchaseHistory={purchaseHistory} />

      <Footer />
    </div>
  );
}
