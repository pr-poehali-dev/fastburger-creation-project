import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HeaderProps {
  balance: number;
  cartItemsCount: number;
  isBalanceSheetOpen: boolean;
  setIsBalanceSheetOpen: (open: boolean) => void;
  topUpAmount: string;
  setTopUpAmount: (amount: string) => void;
  handleTopUp: () => void;
  cartSheet: React.ReactNode;
}

export default function Header({
  balance,
  cartItemsCount,
  isBalanceSheetOpen,
  setIsBalanceSheetOpen,
  topUpAmount,
  setTopUpAmount,
  handleTopUp,
  cartSheet
}: HeaderProps) {
  return (
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

          {cartSheet}
        </div>
      </div>
    </header>
  );
}
