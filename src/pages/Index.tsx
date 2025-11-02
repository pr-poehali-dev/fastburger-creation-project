import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Классический бургер',
    description: 'Сочная говяжья котлета, свежие овощи, фирменный соус',
    price: 450,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/5d1d9fc9-ffe6-4064-b8e3-3d4f1b452fae.jpg',
    category: 'burgers'
  },
  {
    id: 2,
    name: 'Чизбургер Премиум',
    description: 'Двойная котлета, три вида сыра, карамелизированный лук',
    price: 650,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/5d1d9fc9-ffe6-4064-b8e3-3d4f1b452fae.jpg',
    category: 'burgers'
  },
  {
    id: 3,
    name: 'Острый чикен бургер',
    description: 'Хрустящая куриная грудка в остром маринаде, халапеньо',
    price: 520,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/5d1d9fc9-ffe6-4064-b8e3-3d4f1b452fae.jpg',
    category: 'burgers'
  },
  {
    id: 4,
    name: 'Картофель фри',
    description: 'Золотистый картофель, морская соль',
    price: 180,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/c132072c-807c-4683-b0cc-cca9c2e8134b.jpg',
    category: 'sides'
  },
  {
    id: 5,
    name: 'Картофель по-деревенски',
    description: 'Запеченный картофель с розмарином и чесноком',
    price: 210,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/c132072c-807c-4683-b0cc-cca9c2e8134b.jpg',
    category: 'sides'
  },
  {
    id: 6,
    name: 'Кола 0.5л',
    description: 'Освежающий напиток',
    price: 120,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/c132072c-807c-4683-b0cc-cca9c2e8134b.jpg',
    category: 'drinks'
  },
  {
    id: 7,
    name: 'Милкшейк клубничный',
    description: 'Густой молочный коктейль с натуральной клубникой',
    price: 280,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/c132072c-807c-4683-b0cc-cca9c2e8134b.jpg',
    category: 'drinks'
  },
  {
    id: 8,
    name: 'Мороженое шоколадное',
    description: 'Премиальное бельгийское мороженое',
    price: 220,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/c132072c-807c-4683-b0cc-cca9c2e8134b.jpg',
    category: 'desserts'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [balance, setBalance] = useState(0);
  const [currentTab, setCurrentTab] = useState('all');
  const [isBalanceSheetOpen, setIsBalanceSheetOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');

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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Icon name="Flame" className="h-8 w-8 text-accent" />
            <h1 className="text-2xl font-bold tracking-tight">FASTBURGER</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Sheet open={isBalanceSheetOpen} onOpenChange={setIsBalanceSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Icon name="Wallet" className="h-4 w-4" />
                  <span className="hidden sm:inline">Баланс:</span>
                  <span className="font-semibold">{balance} ₽</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="animate-slide-in-right">
                <SheetHeader>
                  <SheetTitle>Пополнение баланса</SheetTitle>
                  <SheetDescription>
                    Пополните баланс для оформления заказов
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Сумма пополнения</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Введите сумму"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[500, 1000, 2000].map(amount => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setTopUpAmount(amount.toString())}
                      >
                        {amount} ₽
                      </Button>
                    ))}
                  </div>
                  <Button onClick={handleTopUp} className="w-full" size="lg">
                    Пополнить
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="gap-2 relative">
                  <Icon name="ShoppingCart" className="h-4 w-4" />
                  <span className="hidden sm:inline">Корзина</span>
                  {cartItemsCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? 'Ваша корзина пуста' : `${cartItemsCount} ${cartItemsCount === 1 ? 'товар' : 'товара'}`}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Icon name="ShoppingBag" className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Добавьте товары из меню</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-[400px] overflow-y-auto">
                        {cart.map(item => (
                          <Card key={item.id} className="animate-scale-in">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-16 h-16 rounded-md object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Итого:</span>
                          <span>{cartTotal} ₽</span>
                        </div>
                        {balance < cartTotal && (
                          <p className="text-sm text-destructive">Недостаточно средств на балансе</p>
                        )}
                        <Button 
                          onClick={handleCheckout} 
                          className="w-full" 
                          size="lg"
                          disabled={balance < cartTotal}
                        >
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/ad5576bd-3bbb-47a2-84f4-d88bc1590176.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        <div className="container relative z-10 px-4 md:px-8 animate-fade-in">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Премиальный<br />фастфуд
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Лучшие бургеры в городе. Быстро, вкусно, качественно.
            </p>
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              Смотреть меню
              <Icon name="ArrowRight" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-8 py-16">
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-2">Наше меню</h3>
          <p className="text-muted-foreground">Выберите блюда из нашего ассортимента</p>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-5 mb-8">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="burgers">Бургеры</TabsTrigger>
            <TabsTrigger value="sides">Гарниры</TabsTrigger>
            <TabsTrigger value="drinks">Напитки</TabsTrigger>
            <TabsTrigger value="desserts">Десерты</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  {item.category === 'burgers' && (
                    <Badge className="absolute top-2 right-2 bg-accent">Хит</Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{item.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{item.price} ₽</span>
                  <Button onClick={() => addToCart(item)} className="gap-2">
                    <Icon name="Plus" className="h-4 w-4" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Tabs>
      </section>

      <footer className="border-t mt-16">
        <div className="container px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Flame" className="h-6 w-6 text-accent" />
              <span className="font-bold">FASTBURGER</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 FASTBURGER. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}