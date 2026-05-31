// Deterministic seed data for Munch food delivery.

export const CUISINES = ['Pizza', 'Burgers', 'Sushi', 'Mexican', 'Thai', 'Indian', 'Italian', 'Chinese', 'Mediterranean', 'Breakfast', 'Vegan', 'Desserts']

export const RESTAURANTS = [
  { id: 'r1', name: 'Sicily Slice', cuisine: 'Pizza', img: 'pizza1', rating: 4.7, reviews: 1280, eta: '25-35 min', fee: 2.99, minOrder: 12, tags: ['Wood-fired', 'Family-owned'], address: '120 Main St', menu: [
    { name: 'Pizzas', items: [
      { id: 'r1m1', name: 'Margherita', price: 14.50, desc: 'San Marzano tomato, fresh mozzarella, basil.' },
      { id: 'r1m2', name: 'Pepperoni', price: 16.00, desc: 'Cup-and-char pepperoni, mozzarella, oregano.' },
      { id: 'r1m3', name: 'Funghi', price: 17.50, desc: 'Cremini, oyster, taleggio, thyme.' },
      { id: 'r1m4', name: 'Quattro Formaggi', price: 18.00, desc: 'Mozzarella, fontina, gorgonzola, parmesan.' },
    ]},
    { name: 'Sides', items: [
      { id: 'r1s1', name: 'Garlic knots (6)', price: 6.50, desc: 'Brushed with garlic butter and parsley.' },
      { id: 'r1s2', name: 'House salad', price: 8.00, desc: 'Mixed greens, cherry tomato, lemon vinaigrette.' },
    ]},
  ]},
  { id: 'r2', name: 'Patty & Co.', cuisine: 'Burgers', img: 'burger1', rating: 4.5, reviews: 980, eta: '20-30 min', fee: 1.99, minOrder: 10, tags: ['Smash burgers'], address: '8 Elm Ave', menu: [
    { name: 'Smash burgers', items: [
      { id: 'r2m1', name: 'Classic Smash', price: 11.00, desc: 'Double patty, American, lettuce, tomato, secret sauce.' },
      { id: 'r2m2', name: 'Bacon Cheese', price: 13.50, desc: 'Double patty, cheddar, smoked bacon, caramelized onion.' },
      { id: 'r2m3', name: 'Mushroom Swiss', price: 12.50, desc: 'Single patty, sautéed mushrooms, swiss, aioli.' },
      { id: 'r2m4', name: 'Veggie Smash', price: 11.50, desc: 'Crispy bean patty, harissa mayo, slaw.' },
    ]},
    { name: 'Fries & sides', items: [
      { id: 'r2s1', name: 'Crinkle fries', price: 4.50, desc: 'Crispy, salty, perfect.' },
      { id: 'r2s2', name: 'Loaded fries', price: 8.00, desc: 'Cheese, bacon, scallion, sour cream.' },
      { id: 'r2s3', name: 'Onion rings', price: 5.50, desc: 'Beer-battered, served with ranch.' },
    ]},
    { name: 'Shakes', items: [
      { id: 'r2k1', name: 'Vanilla shake', price: 6.00, desc: 'Real vanilla bean, whipped cream.' },
      { id: 'r2k2', name: 'Chocolate malt', price: 6.50, desc: 'Rich chocolate with a malted finish.' },
    ]},
  ]},
  { id: 'r3', name: 'Wave Sushi', cuisine: 'Sushi', img: 'sushi1', rating: 4.8, reviews: 612, eta: '30-40 min', fee: 3.99, minOrder: 18, tags: ['Sustainable seafood'], address: '23 Harbor Way', menu: [
    { name: 'Rolls', items: [
      { id: 'r3m1', name: 'Spicy tuna roll', price: 12.00, desc: 'Sushi-grade tuna, sriracha mayo, scallion.' },
      { id: 'r3m2', name: 'Salmon avocado', price: 11.00, desc: 'Atlantic salmon, ripe avocado.' },
      { id: 'r3m3', name: 'Rainbow roll', price: 16.50, desc: 'Crab, avocado, topped with assorted fish.' },
      { id: 'r3m4', name: 'Veggie crunch', price: 10.00, desc: 'Cucumber, avocado, sweet potato tempura.' },
    ]},
    { name: 'Nigiri', items: [
      { id: 'r3n1', name: 'Salmon nigiri (2pc)', price: 7.00, desc: 'Buttery and clean.' },
      { id: 'r3n2', name: 'Tuna nigiri (2pc)', price: 8.00, desc: 'Sushi-grade akami.' },
      { id: 'r3n3', name: 'Hamachi (2pc)', price: 9.00, desc: 'Yellowtail with a clean finish.' },
    ]},
    { name: 'Sides', items: [
      { id: 'r3s1', name: 'Miso soup', price: 4.00, desc: 'Tofu, wakame, scallion.' },
      { id: 'r3s2', name: 'Edamame', price: 5.50, desc: 'Sea-salted soybeans.' },
    ]},
  ]},
  { id: 'r4', name: 'La Plaza Taquería', cuisine: 'Mexican', img: 'mex1', rating: 4.6, reviews: 1450, eta: '20-30 min', fee: 1.49, minOrder: 8, tags: ['Family-owned'], address: '55 5th Ave', menu: [
    { name: 'Tacos', items: [
      { id: 'r4m1', name: 'Al pastor (3)', price: 11.00, desc: 'Marinated pork, pineapple, cilantro, onion.' },
      { id: 'r4m2', name: 'Carne asada (3)', price: 12.00, desc: 'Grilled steak, lime, salsa verde.' },
      { id: 'r4m3', name: 'Chicken tinga (3)', price: 10.50, desc: 'Smoky chipotle chicken, queso fresco.' },
      { id: 'r4m4', name: 'Mushroom (3)', price: 10.00, desc: 'Roasted oyster mushrooms, cashew crema.' },
    ]},
    { name: 'Bowls & sides', items: [
      { id: 'r4s1', name: 'Burrito bowl', price: 13.00, desc: 'Cilantro rice, black beans, your choice of protein.' },
      { id: 'r4s2', name: 'Chips & guac', price: 6.00, desc: 'Hand-mashed avocado, lime.' },
      { id: 'r4s3', name: 'Elote', price: 5.50, desc: 'Grilled corn, cotija, chili-lime mayo.' },
    ]},
  ]},
  { id: 'r5', name: 'Bangkok Bowl', cuisine: 'Thai', img: 'thai1', rating: 4.5, reviews: 720, eta: '30-40 min', fee: 2.49, minOrder: 12, tags: ['Vegan options'], address: '88 Orchid St', menu: [
    { name: 'Curries', items: [
      { id: 'r5m1', name: 'Green curry chicken', price: 14.00, desc: 'Thai basil, eggplant, jasmine rice.' },
      { id: 'r5m2', name: 'Massaman tofu', price: 13.50, desc: 'Potato, peanut, palm sugar — vegan.' },
      { id: 'r5m3', name: 'Panang beef', price: 15.50, desc: 'Rich red curry, lime leaf.' },
    ]},
    { name: 'Noodles', items: [
      { id: 'r5n1', name: 'Pad thai (shrimp)', price: 14.50, desc: 'Tamarind, peanut, lime.' },
      { id: 'r5n2', name: 'Drunken noodles (chicken)', price: 13.50, desc: 'Wide noodles, Thai basil, chili.' },
    ]},
    { name: 'Sides', items: [
      { id: 'r5s1', name: 'Spring rolls (2)', price: 5.50, desc: 'Vegetable rolls with sweet chili.' },
      { id: 'r5s2', name: 'Tom kha gai', price: 7.00, desc: 'Coconut chicken soup, galangal, lime.' },
    ]},
  ]},
  { id: 'r6', name: 'Spice Route', cuisine: 'Indian', img: 'indian1', rating: 4.7, reviews: 540, eta: '30-40 min', fee: 2.99, minOrder: 15, tags: ['Tandoor'], address: '12 Cardamom Ln', menu: [
    { name: 'Curries', items: [
      { id: 'r6m1', name: 'Butter chicken', price: 15.00, desc: 'Cream, tomato, fenugreek.' },
      { id: 'r6m2', name: 'Saag paneer', price: 13.50, desc: 'Spinach, mustard greens, paneer.' },
      { id: 'r6m3', name: 'Lamb vindaloo', price: 16.50, desc: 'Goan vinegar-chili lamb curry.' },
      { id: 'r6m4', name: 'Chana masala', price: 12.00, desc: 'Chickpeas, ginger, garam masala.' },
    ]},
    { name: 'Tandoor & sides', items: [
      { id: 'r6t1', name: 'Garlic naan', price: 4.50, desc: 'Brushed with butter and garlic.' },
      { id: 'r6t2', name: 'Vegetable biryani', price: 13.00, desc: 'Basmati, saffron, raita.' },
      { id: 'r6t3', name: 'Samosas (2)', price: 5.50, desc: 'Spiced potato and pea.' },
    ]},
  ]},
  { id: 'r7', name: 'Nonna\'s Table', cuisine: 'Italian', img: 'italian1', rating: 4.6, reviews: 880, eta: '35-45 min', fee: 2.99, minOrder: 16, tags: ['Hand-rolled pasta'], address: '4 Vine St', menu: [
    { name: 'Pasta', items: [
      { id: 'r7m1', name: 'Cacio e pepe', price: 16.00, desc: 'Pecorino, black pepper, tonnarelli.' },
      { id: 'r7m2', name: 'Bolognese', price: 17.50, desc: 'Hand-cut pappardelle, slow-braised beef.' },
      { id: 'r7m3', name: 'Linguine vongole', price: 19.50, desc: 'Clams, white wine, parsley.' },
      { id: 'r7m4', name: 'Mushroom risotto', price: 16.50, desc: 'Carnaroli, porcini, thyme.' },
    ]},
    { name: 'Antipasti', items: [
      { id: 'r7a1', name: 'Burrata', price: 12.00, desc: 'Heirloom tomato, olive oil, basil.' },
      { id: 'r7a2', name: 'Carpaccio', price: 14.00, desc: 'Beef, arugula, parmesan.' },
    ]},
  ]},
  { id: 'r8', name: 'Golden Dragon', cuisine: 'Chinese', img: 'chinese1', rating: 4.4, reviews: 660, eta: '25-35 min', fee: 1.99, minOrder: 12, tags: ['Sichuan'], address: '301 Canal St', menu: [
    { name: 'Wok', items: [
      { id: 'r8m1', name: 'Kung pao chicken', price: 14.00, desc: 'Peanuts, chili, scallion.' },
      { id: 'r8m2', name: 'Mapo tofu', price: 12.00, desc: 'Silken tofu, fermented bean, Sichuan peppercorn.' },
      { id: 'r8m3', name: 'Beef & broccoli', price: 15.50, desc: 'Wok-tossed, oyster sauce.' },
      { id: 'r8m4', name: 'Honey garlic shrimp', price: 16.50, desc: 'Crispy shrimp, honey-garlic glaze.' },
    ]},
    { name: 'Sides', items: [
      { id: 'r8s1', name: 'Pork dumplings (6)', price: 8.00, desc: 'Hand-folded, soy-vinegar dip.' },
      { id: 'r8s2', name: 'Veggie spring rolls (4)', price: 6.00, desc: 'Sweet chili sauce.' },
    ]},
  ]},
  { id: 'r9', name: 'Olive & Lemon', cuisine: 'Mediterranean', img: 'med1', rating: 4.6, reviews: 470, eta: '20-30 min', fee: 1.99, minOrder: 12, tags: ['Healthy', 'Vegan options'], address: '70 Cypress Way', menu: [
    { name: 'Mezze & plates', items: [
      { id: 'r9m1', name: 'Chicken shawarma plate', price: 14.00, desc: 'Rice, salad, tzatziki, pita.' },
      { id: 'r9m2', name: 'Falafel plate', price: 12.50, desc: 'Hummus, tabbouleh, pickles, pita.' },
      { id: 'r9m3', name: 'Lamb gyro wrap', price: 13.00, desc: 'Onion, tomato, tzatziki.' },
    ]},
    { name: 'Dips', items: [
      { id: 'r9d1', name: 'Hummus & pita', price: 7.00, desc: 'Lemon, tahini, olive oil.' },
      { id: 'r9d2', name: 'Baba ganoush', price: 7.50, desc: 'Charred eggplant, lemon, garlic.' },
    ]},
  ]},
  { id: 'r10', name: 'Sunny Skillet', cuisine: 'Breakfast', img: 'breakfast1', rating: 4.7, reviews: 320, eta: '25-35 min', fee: 1.49, minOrder: 8, tags: ['All-day breakfast'], address: '15 Sunrise Blvd', menu: [
    { name: 'Plates', items: [
      { id: 'r10m1', name: 'Classic eggs benny', price: 13.50, desc: 'Poached eggs, ham, hollandaise.' },
      { id: 'r10m2', name: 'Avocado toast', price: 11.00, desc: 'Sourdough, lemon, chili flakes.' },
      { id: 'r10m3', name: 'Pancake stack', price: 10.00, desc: 'Buttermilk pancakes, maple, butter.' },
      { id: 'r10m4', name: 'Veggie scramble', price: 12.00, desc: 'Spinach, mushroom, feta.' },
    ]},
    { name: 'Drinks', items: [
      { id: 'r10d1', name: 'Cold brew', price: 4.50, desc: 'House blend, 12 oz.' },
      { id: 'r10d2', name: 'Fresh OJ', price: 5.00, desc: 'Squeezed this morning.' },
    ]},
  ]},
  { id: 'r11', name: 'Green Roots', cuisine: 'Vegan', img: 'vegan1', rating: 4.6, reviews: 410, eta: '25-35 min', fee: 1.99, minOrder: 12, tags: ['Plant-based'], address: '208 Maple Dr', menu: [
    { name: 'Bowls', items: [
      { id: 'r11m1', name: 'Buddha bowl', price: 13.00, desc: 'Quinoa, kale, roasted vegetables, tahini.' },
      { id: 'r11m2', name: 'Burrito bowl', price: 13.50, desc: 'Brown rice, beans, salsa, guac.' },
      { id: 'r11m3', name: 'Power salad', price: 12.50, desc: 'Mixed greens, chickpeas, seeds.' },
    ]},
    { name: 'Sides', items: [
      { id: 'r11s1', name: 'Sweet potato fries', price: 5.50, desc: 'Roasted, chipotle aioli.' },
      { id: 'r11s2', name: 'Roasted veggie cup', price: 5.00, desc: 'Carrot, beet, fennel.' },
    ]},
  ]},
  { id: 'r12', name: 'Sweet Story', cuisine: 'Desserts', img: 'desserts1', rating: 4.8, reviews: 280, eta: '20-30 min', fee: 2.49, minOrder: 10, tags: ['House-baked'], address: '9 Sugar Ln', menu: [
    { name: 'Cakes & pastries', items: [
      { id: 'r12m1', name: 'Chocolate fudge slice', price: 7.00, desc: 'Triple-layer fudge cake.' },
      { id: 'r12m2', name: 'Carrot cake', price: 6.50, desc: 'Cream cheese frosting, walnuts.' },
      { id: 'r12m3', name: 'Lemon tart', price: 6.00, desc: 'Sablé crust, lemon curd.' },
    ]},
    { name: 'Cookies & ice cream', items: [
      { id: 'r12c1', name: 'Chocolate chip cookie', price: 3.50, desc: 'Crisp edge, gooey center.' },
      { id: 'r12c2', name: 'Vanilla bean ice cream (pint)', price: 8.50, desc: 'House-made, real vanilla.' },
    ]},
  ]},
]

export const TRACKING_STAGES = ['Confirmed', 'Preparing', 'Out for delivery', 'Delivered']

export const SEED_ORDERS = [
  { code: 'MUN-44012', restaurantId: 'r2', restaurantName: 'Patty & Co.', date: '2026-05-22', items: [
    { id: 'r2m1', name: 'Classic Smash', qty: 1, price: 11.00 },
    { id: 'r2s1', name: 'Crinkle fries', qty: 1, price: 4.50 },
    { id: 'r2k1', name: 'Vanilla shake', qty: 1, price: 6.00 },
  ], total: 26.49, status: 'Delivered', address: '24 Cloud Lane, Seattle, WA' },
]
