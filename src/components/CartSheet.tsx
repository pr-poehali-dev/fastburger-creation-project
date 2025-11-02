import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface CartSheetProps {
  cart: CartItem[];
  cartItemsCount: number;
  cartTotal: number;
  balance: number;
  updateQuantity: (id: number, change: number) => void;
  removeFromCart: (id: number) => void;
  handleCheckout: () => void;
}

export default function CartSheet({
  cart,
  cartItemsCount,
  cartTotal,
  balance,
  updateQuantity,
  removeFromCart,
  handleCheckout
}: CartSheetProps) {
  return (
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
  );
}
