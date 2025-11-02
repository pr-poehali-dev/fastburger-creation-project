import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
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
  );
}
