import type { Building } from '@/components/BuildingCard.vue'

export const newBuildings: Building[] = [
  {
    id: 1,
    name: 'Hilton',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    country: 'Узбекистан',
    metroTimeMin: 7,
    address: 'Улица Т.Шевченко 10/4',
    rating: 4.5,
    reviewsCount: 233,
    minMonthlyPrice: 5000000,
    specs: {
      studio: { area: 'От 27,9 м', price: 'От 10,5 млн сум' },
      one: { area: 'От 29,7 м', price: 'От 18,1 млн сум' },
      two: { area: 'От 29,7 м', price: 'От 18,1 млн сум' },
      three: { area: 'От 29,7 м', price: 'От 18,1 млн сум' },
      four: { area: 'От 29,7 м', price: 'От 18,1 млн сум' },
    },
    benefit: 'Без залога · Платите арендный платёж картой любого банка и получайте бонусы в соответствии с условиями'
  },
  {
    id: 2,
    name: 'Royal Residence',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=900&q=80',
    country: 'Узбекистан',
    metroTimeMin: 6,
    address: 'Улица Навои, 12',
    rating: 4.6,
    reviewsCount: 189,
    minMonthlyPrice: 5200000,
    specs: {
      studio: { area: 'От 26,0 м', price: 'От 9,9 млн сум' },
      one: { area: 'От 30,1 м', price: 'От 18,7 млн сум' },
      two: { area: 'От 42,0 м', price: 'От 21,2 млн сум' },
      three: { area: 'От 58,0 м', price: 'От 28,4 млн сум' },
    },
    benefit: 'Рассрочка · Первоначальный взнос от 10%'
  },
  {
    id: 3,
    name: 'Skyline Park',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80',
    country: 'Узбекистан',
    metroTimeMin: 9,
    address: 'Янгихаётский район',
    rating: 4.4,
    reviewsCount: 145,
    minMonthlyPrice: 4800000,
    specs: {
      studio: { area: 'От 25,0 м', price: 'От 9,5 млн сум' },
      one: { area: 'От 28,0 м', price: 'От 16,0 млн сум' },
      two: { area: 'От 40,0 м', price: 'От 20,0 млн сум' },
      three: { area: 'От 55,0 м', price: 'От 26,0 млн сум' },
    },
    benefit: 'Ипотека · Льготные условия для резидентов'
  }
]
