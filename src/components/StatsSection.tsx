import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PurchaseStats {
  itemId: number;
  itemName: string;
  totalQuantity: number;
  totalSpent: number;
}

interface StatsSectionProps {
  purchaseHistory: PurchaseStats[];
}

export default function StatsSection({ purchaseHistory }: StatsSectionProps) {
  if (purchaseHistory.length === 0) {
    return null;
  }

  return (
    <section className="container px-4 md:px-8 py-16">
      <div className="mb-8">
        <h3 className="text-3xl font-bold mb-2">Статистика продаж</h3>
        <p className="text-muted-foreground">Какие блюда заказывали и сколько на них заработали</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Блюдо</TableHead>
                <TableHead className="text-right">Заказали раз</TableHead>
                <TableHead className="text-right">Заработали</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseHistory
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .map((stat) => (
                  <TableRow key={stat.itemId}>
                    <TableCell className="font-medium">{stat.itemName}</TableCell>
                    <TableCell className="text-right">{stat.totalQuantity} {stat.totalQuantity === 1 ? 'раз' : 'раза'}</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">{stat.totalSpent} ₽</TableCell>
                  </TableRow>
                ))}
              <TableRow className="bg-secondary/50">
                <TableCell className="font-bold">Итого</TableCell>
                <TableCell className="text-right font-bold">
                  {purchaseHistory.reduce((sum, stat) => sum + stat.totalQuantity, 0)} заказов
                </TableCell>
                <TableCell className="text-right font-bold text-accent">
                  {purchaseHistory.reduce((sum, stat) => sum + stat.totalSpent, 0)} ₽
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}