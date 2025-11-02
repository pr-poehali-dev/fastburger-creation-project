import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function HeroSection() {
  return (
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
  );
}
