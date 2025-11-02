export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const menuItems: MenuItem[] = [
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
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/fee3f792-b193-40b0-9564-25b7088c9365.jpg',
    category: 'burgers'
  },
  {
    id: 3,
    name: 'Острый чикен бургер',
    description: 'Хрустящая куриная грудка в остром маринаде, халапеньо',
    price: 520,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/5de9d0ca-8306-428a-b29c-bc489e81e402.jpg',
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
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/578e48b6-0480-4824-8a15-5cd9bd46e8e3.jpg',
    category: 'sides'
  },
  {
    id: 6,
    name: 'Кола 0.5л',
    description: 'Освежающий напиток',
    price: 120,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/95d54451-920e-4255-9482-7bdd95d3a174.jpg',
    category: 'drinks'
  },
  {
    id: 7,
    name: 'Милкшейк клубничный',
    description: 'Густой молочный коктейль с натуральной клубникой',
    price: 280,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/e3d99512-c3dc-4329-8bf4-2e4fdc0a0c55.jpg',
    category: 'drinks'
  },
  {
    id: 8,
    name: 'Мороженое шоколадное',
    description: 'Премиальное бельгийское мороженое',
    price: 220,
    image: 'https://cdn.poehali.dev/projects/03664df4-8fda-4e79-a17a-a187a1c13a7c/files/c36dae4f-846b-4635-87b5-53a5bbc913d6.jpg',
    category: 'desserts'
  }
];
