import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface MenuSectionProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  filteredItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
}

export default function MenuSection({
  currentTab,
  setCurrentTab,
  filteredItems,
  addToCart
}: MenuSectionProps) {
  return (
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
  );
}
