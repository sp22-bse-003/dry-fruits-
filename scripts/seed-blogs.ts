import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogPosts = [
  {
    title: "10 Amazing Health Benefits of Almonds You Should Know",
    slug: "health-benefits-of-almonds",
    excerpt: "Discover the incredible health benefits of almonds, from heart health to brain function. Learn why this superfood should be part of your daily diet.",
    content: `
      <p>Almonds are one of the most nutritious and versatile nuts available, packed with essential nutrients that offer numerous health benefits. Whether you enjoy them raw, roasted, or as almond butter, these power-packed nuts deserve a prominent place in your daily diet.</p>
      
      <h2>1. Heart Health Champion</h2>
      <p>Almonds are rich in monounsaturated fats, the same type of health-promoting fats found in olive oil. Studies have shown that regular consumption of almonds can help reduce bad cholesterol (LDL) levels while maintaining good cholesterol (HDL) levels, significantly reducing the risk of heart disease.</p>
      
      <h2>2. Brain Booster</h2>
      <p>Rich in riboflavin and L-carnitine, almonds have been shown to increase brain activity and may help prevent cognitive decline. They're often called "brain food" and are particularly beneficial for growing children and adults looking to maintain mental sharpness.</p>
      
      <h2>3. Weight Management Support</h2>
      <p>Despite being calorie-dense, almonds can actually help with weight management. Their protein, fiber, and healthy fat content help you feel full longer, reducing overall calorie intake throughout the day. Research suggests that people who regularly eat almonds are less likely to gain weight.</p>
      
      <h2>4. Blood Sugar Control</h2>
      <p>Almonds have a low glycemic index and are rich in magnesium, making them excellent for people with type 2 diabetes. They help regulate blood sugar levels and improve insulin sensitivity when consumed regularly.</p>
      
      <h2>5. Bone Strength</h2>
      <p>Almonds contain calcium, magnesium, and phosphorus – all crucial minerals for maintaining strong, healthy bones. Just a handful of almonds provides a significant portion of your daily calcium needs.</p>
      
      <h2>6. Skin Health</h2>
      <p>Packed with vitamin E and antioxidants, almonds help protect your skin from oxidative stress and UV damage. Regular consumption can improve skin texture and reduce signs of aging.</p>
      
      <h2>7. Energy Boost</h2>
      <p>The combination of protein, healthy fats, and fiber in almonds provides sustained energy throughout the day. They're an excellent pre-workout or mid-afternoon snack.</p>
      
      <h2>8. Digestive Health</h2>
      <p>Almonds are a good source of fiber, which promotes healthy digestion and regular bowel movements. The prebiotic properties of almonds also support beneficial gut bacteria.</p>
      
      <h2>9. Anti-Inflammatory Properties</h2>
      <p>The vitamin E and other antioxidants in almonds have powerful anti-inflammatory effects, helping to reduce inflammation throughout the body.</p>
      
      <h2>10. Cancer Prevention</h2>
      <p>Studies suggest that the fiber content in almonds may help reduce the risk of colon cancer, while their antioxidants may protect against other forms of cancer.</p>
      
      <h2>How Many Almonds Should You Eat?</h2>
      <p>Nutritionists recommend eating about 20-23 almonds (approximately 30 grams) per day to get optimal health benefits. You can eat them as a snack, add them to your breakfast cereal, or incorporate them into various recipes.</p>
      
      <p><strong>Start incorporating almonds into your daily routine today and experience these amazing health benefits!</strong></p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1508747703725-719777637510?w=800",
    category: "Health & Nutrition",
    author: "Dr. Sarah Mitchell",
    readTime: 8,
    tags: ["almonds", "health", "nutrition", "heart health", "brain food"],
    published: true,
    publishedAt: Timestamp.fromDate(new Date("2024-12-10")),
    updatedAt: Timestamp.fromDate(new Date("2024-12-10")),
  },
  {
    title: "Best Dry Fruits for Winter: Stay Healthy During Cold Season",
    slug: "best-dry-fruits-for-winter",
    excerpt: "Winter is here! Discover which dry fruits can boost your immunity, keep you warm, and provide essential nutrients during the cold months.",
    content: `
      <p>As winter approaches, it's time to stock up on nature's powerhouses – dry fruits! These nutrient-dense foods are perfect for keeping you healthy, warm, and energized throughout the cold season.</p>
      
      <h2>Why Dry Fruits in Winter?</h2>
      <p>Dry fruits are concentrated sources of nutrients and calories, making them ideal for winter when our bodies need extra energy to maintain body temperature. They're also excellent for boosting immunity during flu season.</p>
      
      <h2>1. Almonds – The Winter Warrior</h2>
      <p>Almonds generate heat in the body and are rich in vitamin E, protein, and healthy fats. Soak 5-6 almonds overnight and eat them first thing in the morning for maximum benefits. They help maintain body temperature and support skin health during dry winter months.</p>
      
      <h2>2. Walnuts – Brain and Heart Health</h2>
      <p>Walnuts are packed with omega-3 fatty acids, which are crucial for brain health and reducing inflammation. They generate significant body heat, making them perfect for winter consumption. Eat 4-5 walnuts daily to support cardiovascular health and mental clarity.</p>
      
      <h2>3. Cashews – The Energy Booster</h2>
      <p>Rich in magnesium and copper, cashews provide instant energy and help fight winter fatigue. They're also excellent for bone health and support a healthy immune system. Enjoy 8-10 cashews as a mid-day snack.</p>
      
      <h2>4. Dates – Natural Warmth Provider</h2>
      <p>Dates are nature's candy and one of the best foods for generating body heat. They're loaded with iron, fiber, and natural sugars that provide sustained energy. Have 2-3 dates daily, especially beneficial for those with anemia.</p>
      
      <h2>5. Pistachios – Immunity Booster</h2>
      <p>These green gems are rich in antioxidants, vitamin B6, and protein. They help boost immunity and protect against seasonal illnesses. A handful (about 30 pistachios) makes a perfect winter snack.</p>
      
      <h2>6. Dried Figs (Anjeer) – Digestive Aid</h2>
      <p>Figs are excellent for digestion and help combat constipation, which can worsen in winter due to reduced water intake. They're also rich in calcium and iron. Soak 2-3 figs overnight and consume them in the morning.</p>
      
      <h2>7. Raisins – Iron and Energy</h2>
      <p>These sweet dried grapes are packed with iron and natural sugars. They help purify blood and boost energy levels. Soak a handful of raisins overnight and eat them the next morning.</p>
      
      <h2>How to Consume Dry Fruits in Winter</h2>
      <ul>
        <li><strong>Soaked:</strong> Soak almonds, figs, and raisins overnight for easier digestion</li>
        <li><strong>Roasted:</strong> Lightly roast nuts for enhanced flavor and warmth</li>
        <li><strong>In milk:</strong> Add crushed dry fruits to warm milk for a nutritious bedtime drink</li>
        <li><strong>Trail mix:</strong> Create your own winter trail mix with various nuts and dried fruits</li>
        <li><strong>In desserts:</strong> Add to traditional winter sweets and desserts</li>
      </ul>
      
      <h2>Perfect Winter Dry Fruit Mix Recipe</h2>
      <p><strong>Ingredients:</strong></p>
      <ul>
        <li>10 almonds</li>
        <li>5 walnuts</li>
        <li>8 cashews</li>
        <li>3 dates (chopped)</li>
        <li>1 tablespoon raisins</li>
        <li>5 pistachios</li>
      </ul>
      <p><strong>Instructions:</strong> Mix all ingredients and store in an airtight container. Have 2 tablespoons daily as a mid-morning or evening snack with warm milk or tea.</p>
      
      <p><em>Make dry fruits your winter companion and sail through the cold season with optimal health and energy!</em></p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800",
    category: "Tips & Guides",
    author: "Nutritionist Priya Sharma",
    readTime: 7,
    tags: ["winter", "immunity", "seasonal", "health tips", "nutrition"],
    published: true,
    publishedAt: Timestamp.fromDate(new Date("2024-12-08")),
    updatedAt: Timestamp.fromDate(new Date("2024-12-08")),
  },
  {
    title: "How to Store Dry Fruits: Complete Guide to Maximum Freshness",
    slug: "how-to-store-dry-fruits-properly",
    excerpt: "Learn the best methods to store dry fruits and maintain their freshness, flavor, and nutritional value for months. Essential tips for every household.",
    content: `
      <p>Dry fruits are a valuable investment in your health, but improper storage can lead to loss of flavor, nutrients, and even spoilage. Follow this comprehensive guide to keep your dry fruits fresh and delicious for months.</p>
      
      <h2>Why Proper Storage Matters</h2>
      <p>Dry fruits, despite their name, still contain some moisture and natural oils that can go rancid if not stored correctly. Proper storage prevents:</p>
      <ul>
        <li>Oxidation and nutrient loss</li>
        <li>Moisture absorption and mold growth</li>
        <li>Insect infestation</li>
        <li>Loss of flavor and texture</li>
        <li>Rancidity of natural oils</li>
      </ul>
      
      <h2>General Storage Guidelines</h2>
      
      <h3>1. Choose the Right Container</h3>
      <p><strong>Airtight containers:</strong> Glass jars with tight-fitting lids or high-quality plastic containers with rubber seals are ideal. Avoid containers that allow air circulation.</p>
      <p><strong>Vacuum-sealed bags:</strong> For long-term storage (6+ months), vacuum sealing is the best option as it removes all air and prevents oxidation.</p>
      <p><strong>Avoid:</strong> Paper bags, cloth bags, or containers with loose lids that allow moisture and pests to enter.</p>
      
      <h3>2. Cool and Dark Location</h3>
      <p>Store dry fruits in a cool, dark place away from direct sunlight and heat sources. Ideal temperature: 60-70°F (15-21°C).</p>
      
      <h3>3. Low Humidity Environment</h3>
      <p>Moisture is the enemy of dry fruits. Keep them away from the kitchen stove, dishwasher, or any humid areas. Consider adding silica gel packets to containers for extra moisture protection.</p>
      
      <h2>Storage Times by Type</h2>
      
      <h3>Nuts (Almonds, Cashews, Walnuts, Pistachios)</h3>
      <ul>
        <li><strong>Pantry:</strong> 3-4 months in airtight container</li>
        <li><strong>Refrigerator:</strong> 6-9 months in sealed container</li>
        <li><strong>Freezer:</strong> 12-18 months in freezer bag</li>
      </ul>
      
      <h3>Dried Fruits (Raisins, Dates, Figs, Apricots)</h3>
      <ul>
        <li><strong>Pantry:</strong> 6-12 months in airtight container</li>
        <li><strong>Refrigerator:</strong> 12-18 months in sealed container</li>
        <li><strong>Freezer:</strong> 18-24 months in freezer bag</li>
      </ul>
      
      <h2>Refrigeration vs. Room Temperature</h2>
      
      <h3>When to Refrigerate:</h3>
      <ul>
        <li>Hot and humid climate</li>
        <li>Buying in bulk for long-term storage</li>
        <li>Walnuts, pecans, and pine nuts (high oil content)</li>
        <li>Already opened packages</li>
      </ul>
      
      <h3>Room Temperature Storage OK:</h3>
      <ul>
        <li>Small quantities consumed within 1-2 months</li>
        <li>Cool, dry climate</li>
        <li>Properly sealed containers</li>
      </ul>
      
      <h2>Freezing Dry Fruits</h2>
      <p>Freezing is the best method for long-term storage:</p>
      <ol>
        <li>Portion dry fruits into serving sizes</li>
        <li>Use freezer-safe bags or containers</li>
        <li>Remove as much air as possible</li>
        <li>Label with date</li>
        <li>Thaw at room temperature before use</li>
      </ol>
      
      <h2>Signs Your Dry Fruits Have Gone Bad</h2>
      <ul>
        <li><strong>Smell:</strong> Rancid, sour, or paint-like odor</li>
        <li><strong>Appearance:</strong> Mold, discoloration, or shriveling</li>
        <li><strong>Taste:</strong> Bitter or off-flavor</li>
        <li><strong>Texture:</strong> Excessively hard or soft and mushy</li>
      </ul>
      
      <h2>Pro Tips for Maximum Freshness</h2>
      <ol>
        <li><strong>Buy from reliable sources:</strong> Purchase from stores with high turnover and proper storage</li>
        <li><strong>Check dates:</strong> Always check packaging dates and buy the freshest stock</li>
        <li><strong>Small batches:</strong> Buy quantities you can consume within the recommended timeframe</li>
        <li><strong>Separate storage:</strong> Don't mix different types of dry fruits in one container as they have different moisture levels</li>
        <li><strong>Regular checks:</strong> Inspect your stored dry fruits monthly for any signs of spoilage</li>
        <li><strong>Roasting refresh:</strong> Slightly stale nuts can be refreshed by roasting at 350°F for 5-10 minutes</li>
      </ol>
      
      <h2>Special Storage Tips</h2>
      
      <h3>Dates</h3>
      <p>Can be stored at room temperature if consumed within a month. For longer storage, refrigerate in an airtight container.</p>
      
      <h3>Walnuts</h3>
      <p>High in omega-3 fatty acids, which makes them prone to rancidity. Always refrigerate or freeze.</p>
      
      <h3>Raisins</h3>
      <p>Keep in original packaging until opened. Once opened, transfer to an airtight container. If they dry out, soak in warm water for 10 minutes to rehydrate.</p>
      
      <p><strong>Remember:</strong> Proper storage not only maintains freshness but also preserves the nutritional value of your dry fruits, ensuring you get maximum health benefits from your investment!</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=800",
    category: "Tips & Guides",
    author: "Chef Rajesh Kumar",
    readTime: 6,
    tags: ["storage tips", "food safety", "freshness", "how-to"],
    published: true,
    publishedAt: Timestamp.fromDate(new Date("2024-12-05")),
    updatedAt: Timestamp.fromDate(new Date("2024-12-05")),
  },
  {
    title: "Nutritional Comparison: Which Nuts Are the Healthiest?",
    slug: "nutritional-comparison-of-nuts",
    excerpt: "A detailed comparison of popular nuts – almonds, walnuts, cashews, pistachios, and more. Find out which one suits your health goals best.",
    content: `
      <p>All nuts are nutritious, but each offers a unique nutritional profile. Understanding these differences can help you choose the best nuts for your specific health goals.</p>
      
      <h2>The Nutritional Powerhouses</h2>
      <p>Let's compare the nutrition per 1-ounce (28g) serving of popular nuts:</p>
      
      <h3>Almonds</h3>
      <ul>
        <li>Calories: 164</li>
        <li>Protein: 6g</li>
        <li>Fat: 14g (mostly monounsaturated)</li>
        <li>Fiber: 3.5g</li>
        <li>Vitamin E: 37% DV</li>
        <li>Magnesium: 19% DV</li>
        <li>Calcium: 8% DV</li>
      </ul>
      <p><strong>Best for:</strong> Vitamin E, calcium, and heart health</p>
      
      <h3>Walnuts</h3>
      <ul>
        <li>Calories: 185</li>
        <li>Protein: 4.3g</li>
        <li>Fat: 18.5g (highest omega-3 content)</li>
        <li>Fiber: 1.9g</li>
        <li>Omega-3: 2.5g</li>
        <li>Copper: 50% DV</li>
        <li>Manganese: 42% DV</li>
      </ul>
      <p><strong>Best for:</strong> Brain health, omega-3 fatty acids, and anti-inflammatory benefits</p>
      
      <h3>Cashews</h3>
      <ul>
        <li>Calories: 157</li>
        <li>Protein: 5.2g</li>
        <li>Fat: 12.4g</li>
        <li>Fiber: 0.9g</li>
        <li>Iron: 11% DV</li>
        <li>Magnesium: 20% DV</li>
        <li>Zinc: 15% DV</li>
      </ul>
      <p><strong>Best for:</strong> Iron, zinc, and bone health</p>
      
      <h3>Pistachios</h3>
      <ul>
        <li>Calories: 159</li>
        <li>Protein: 5.7g</li>
        <li>Fat: 12.9g</li>
        <li>Fiber: 3g</li>
        <li>Vitamin B6: 28% DV</li>
        <li>Potassium: 6% DV</li>
        <li>Antioxidants: High in lutein and zeaxanthin</li>
      </ul>
      <p><strong>Best for:</strong> Eye health, antioxidants, and portion control (shells slow eating)</p>
      
      <h3>Brazil Nuts</h3>
      <ul>
        <li>Calories: 186</li>
        <li>Protein: 4.1g</li>
        <li>Fat: 19g</li>
        <li>Fiber: 2.1g</li>
        <li>Selenium: 989% DV (just 1-2 nuts provide daily needs!)</li>
        <li>Magnesium: 25% DV</li>
      </ul>
      <p><strong>Best for:</strong> Selenium (thyroid health), but limit to 1-2 per day</p>
      
      <h3>Pecans</h3>
      <ul>
        <li>Calories: 196</li>
        <li>Protein: 2.6g</li>
        <li>Fat: 20.4g</li>
        <li>Fiber: 2.7g</li>
        <li>Manganese: 56% DV</li>
        <li>Copper: 17% DV</li>
        <li>Thiamine: 12% DV</li>
      </ul>
      <p><strong>Best for:</strong> Antioxidants (highest among tree nuts)</p>
      
      <h3>Macadamia Nuts</h3>
      <ul>
        <li>Calories: 204</li>
        <li>Protein: 2.2g</li>
        <li>Fat: 21.5g (highest in monounsaturated fats)</li>
        <li>Fiber: 2.4g</li>
        <li>Manganese: 58% DV</li>
        <li>Thiamine: 28% DV</li>
      </ul>
      <p><strong>Best for:</strong> Heart-healthy fats and smooth, buttery flavor</p>
      
      <h2>Choosing by Health Goal</h2>
      
      <h3>For Weight Loss</h3>
      <p><strong>Best: Almonds and Pistachios</strong></p>
      <p>Both are lower in calories and higher in protein and fiber, helping you feel full longer. Pistachios have the added benefit of requiring shelling, which slows eating.</p>
      
      <h3>For Heart Health</h3>
      <p><strong>Best: Almonds, Walnuts, and Macadamias</strong></p>
      <p>All three are rich in heart-healthy monounsaturated fats and help reduce LDL cholesterol.</p>
      
      <h3>For Brain Health</h3>
      <p><strong>Best: Walnuts</strong></p>
      <p>The high omega-3 content and polyphenols in walnuts support cognitive function and may protect against age-related brain decline.</p>
      
      <h3>For Blood Sugar Control</h3>
      <p><strong>Best: Almonds and Cashews</strong></p>
      <p>Both have been shown to improve insulin sensitivity and help regulate blood sugar levels.</p>
      
      <h3>For Bone Health</h3>
      <p><strong>Best: Almonds</strong></p>
      <p>Highest in calcium among nuts, also rich in magnesium and phosphorus.</p>
      
      <h3>For Skin Health</h3>
      <p><strong>Best: Almonds</strong></p>
      <p>Highest in vitamin E, a powerful antioxidant that protects skin from damage.</p>
      
      <h3>For Energy and Exercise</h3>
      <p><strong>Best: Cashews and Almonds</strong></p>
      <p>Good balance of protein, healthy fats, and minerals like magnesium for sustained energy and muscle function.</p>
      
      <h2>The Winner?</h2>
      <p>While <strong>almonds</strong> often take the crown as the most well-rounded nutritious nut, the truth is that <strong>variety is key</strong>. Each nut offers unique benefits, and mixing different nuts ensures you get a comprehensive range of nutrients.</p>
      
      <h2>The Perfect Mixed Nut Blend</h2>
      <p>For optimal nutrition, create a daily mix with:</p>
      <ul>
        <li>40% Almonds (vitamin E and calcium)</li>
        <li>30% Walnuts (omega-3)</li>
        <li>20% Cashews (minerals)</li>
        <li>10% Pistachios or Brazil nuts (variety)</li>
      </ul>
      
      <h2>Important Considerations</h2>
      <ul>
        <li><strong>Portion control:</strong> Stick to 1-1.5 ounces (small handful) per day</li>
        <li><strong>Raw vs. roasted:</strong> Both are nutritious, but watch sodium in salted varieties</li>
        <li><strong>Allergies:</strong> Tree nut allergies are serious – always check with a doctor</li>
        <li><strong>Quality matters:</strong> Buy from reliable sources to ensure freshness</li>
      </ul>
      
      <p><em>The best nut is the one you'll actually eat regularly! Choose based on your taste preferences and health goals, and don't be afraid to mix it up.</em></p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1580647123212-3e64be4e5e3a?w=800",
    category: "Health & Nutrition",
    author: "Nutritionist Dr. Meera Patel",
    readTime: 9,
    tags: ["nutrition", "comparison", "health benefits", "nuts", "wellness"],
    published: true,
    publishedAt: Timestamp.fromDate(new Date("2024-12-03")),
    updatedAt: Timestamp.fromDate(new Date("2024-12-03")),
  },
  {
    title: "Creative Dry Fruit Gift Ideas for Every Occasion",
    slug: "dry-fruit-gift-ideas",
    excerpt: "Looking for the perfect gift? Discover creative and elegant ways to present dry fruits as gifts for festivals, weddings, corporate events, and more.",
    content: `
      <p>Dry fruits are not just nutritious – they make thoughtful, premium gifts that show you care about the recipient's health and wellbeing. Here's your complete guide to creating memorable dry fruit gifts for every occasion.</p>
      
      <h2>Why Dry Fruits Make Perfect Gifts</h2>
      <ul>
        <li><strong>Universal appeal:</strong> Appreciated across all age groups</li>
        <li><strong>Health-conscious:</strong> Shows thoughtfulness and care</li>
        <li><strong>Long shelf life:</strong> No pressure to consume immediately</li>
        <li><strong>Premium perception:</strong> High-quality nuts and dried fruits are luxury items</li>
        <li><strong>Cultural significance:</strong> Traditional and meaningful in many cultures</li>
        <li><strong>Versatile:</strong> Suitable for personal and corporate gifting</li>
      </ul>
      
      <h2>Festival & Holiday Gifts</h2>
      
      <h3>Diwali Gift Hampers</h3>
      <p><strong>The Classic Diwali Box</strong></p>
      <ul>
        <li>Premium cashews (200g)</li>
        <li>Whole almonds (200g)</li>
        <li>Medjool dates (150g)</li>
        <li>Saffron raisins (100g)</li>
        <li>Pistachios (150g)</li>
      </ul>
      <p>Present in a decorative wooden box with traditional motifs, add a Diwali greeting card and a small diya (lamp).</p>
      
      <h3>Christmas Gift Baskets</h3>
      <p><strong>The Winter Warmth Collection</strong></p>
      <ul>
        <li>Glazed walnuts</li>
        <li>Honey-roasted cashews</li>
        <li>Cinnamon-spiced almonds</li>
        <li>Dried cranberries</li>
        <li>Mixed roasted nuts</li>
      </ul>
      <p>Arrange in a rustic wicker basket with festive fabric lining, add pinecones and a holiday ribbon.</p>
      
      <h3>Eid Gift Sets</h3>
      <p><strong>The Dates & Delights Collection</strong></p>
      <ul>
        <li>Premium Ajwa dates (250g)</li>
        <li>Mamra almonds (200g)</li>
        <li>Pistachios (150g)</li>
        <li>Dried figs (100g)</li>
        <li>Whole walnuts (150g)</li>
      </ul>
      <p>Package in an elegant silver or gold-toned box with Islamic geometric patterns.</p>
      
      <h2>Wedding & Anniversary Gifts</h2>
      
      <h3>Wedding Favors</h3>
      <p><strong>Mini Elegance Pouches</strong></p>
      <p>Create small silk pouches (50-75g each) with:</p>
      <ul>
        <li>Matching wedding color scheme</li>
        <li>Personalized tags with couple's names and date</li>
        <li>Mix of 3-4 premium nuts</li>
        <li>Sealed with ribbon or traditional knot</li>
      </ul>
      
      <h3>Anniversary Gift Boxes</h3>
      <p><strong>The Love & Health Collection</strong></p>
      <ul>
        <li>Heart-shaped box or arrangement</li>
        <li>Heart-healthy almonds and walnuts</li>
        <li>Romantic red dried fruits (cranberries, cherries)</li>
        <li>Premium dark chocolate-covered nuts</li>
        <li>Personalized message card</li>
      </ul>
      
      <h2>Corporate Gifting</h2>
      
      <h3>Client Appreciation</h3>
      <p><strong>The Executive Collection</strong></p>
      <ul>
        <li>Wooden tray or leather box</li>
        <li>4-6 compartments with variety</li>
        <li>Company logo on subtle metal plate</li>
        <li>Premium nuts: cashews, almonds, pistachios, macadamias</li>
        <li>Professional greeting card</li>
      </ul>
      
      <h3>Employee Rewards</h3>
      <p><strong>The Wellness Box</strong></p>
      <ul>
        <li>Branded tin or box</li>
        <li>Healthy nut mix (250-300g)</li>
        <li>Wellness tips booklet</li>
        <li>Motivational message from leadership</li>
      </ul>
      
      <h2>New Baby Gifts</h2>
      
      <h3>For New Mothers</h3>
      <p><strong>The Nourishment Basket</strong></p>
      <ul>
        <li>Almonds (rich in calcium)</li>
        <li>Dates (energy and lactation support)</li>
        <li>Figs (iron and calcium)</li>
        <li>Walnuts (omega-3 for baby's brain development)</li>
        <li>Include care note about postpartum nutrition</li>
      </ul>
      
      <h2>Get Well Soon Gifts</h2>
      
      <h3>Recovery Care Package</h3>
      <p><strong>The Healing Collection</strong></p>
      <ul>
        <li>High-protein nuts (almonds, cashews)</li>
        <li>Dates for natural energy</li>
        <li>Raisins for iron</li>
        <li>Include herbal tea</li>
        <li>Get-well wishes card</li>
      </ul>
      
      <h2>DIY Presentation Ideas</h2>
      
      <h3>Glass Mason Jars</h3>
      <p>Layer different colored nuts and dried fruits for visual appeal:</p>
      <ul>
        <li>Bottom layer: Golden raisins</li>
        <li>Middle layer: Cashews</li>
        <li>Top layer: Pistachios</li>
        <li>Seal with fabric cover and twine</li>
        <li>Add tag with consumption tips</li>
      </ul>
      
      <h3>Personalized Gift Tins</h3>
      <ul>
        <li>Choose round or square tins (250-500g capacity)</li>
        <li>Custom labels with recipient's name</li>
        <li>Compartments for different varieties</li>
        <li>Reusable for storage</li>
      </ul>
      
      <h3>Eco-Friendly Bamboo Boxes</h3>
      <ul>
        <li>Sustainable and elegant</li>
        <li>Multiple compartments</li>
        <li>Natural aesthetic</li>
        <li>Reusable as jewelry or desk organizer</li>
      </ul>
      
      <h2>Premium Upgrade Ideas</h2>
      <ul>
        <li><strong>Saffron-coated dry fruits:</strong> Adds luxury and flavor</li>
        <li><strong>Honey-glazed nuts:</strong> Sweet and elegant</li>
        <li><strong>Gold or silver leaf decoration:</strong> For ultra-premium gifts</li>
        <li><strong>Exotic varieties:</strong> Macadamias, Brazil nuts, Turkish figs</li>
        <li><strong>Paired with tea or coffee:</strong> Complete gift experience</li>
      </ul>
      
      <h2>Personalization Tips</h2>
      <ol>
        <li><strong>Know dietary preferences:</strong> Check for allergies or restrictions</li>
        <li><strong>Consider regional tastes:</strong> Some prefer sweet, others savory</li>
        <li><strong>Age-appropriate:</strong> Adjust quantities for children vs. adults</li>
        <li><strong>Occasion-specific:</strong> Match theme with wrapping and presentation</li>
        <li><strong>Add personal touch:</strong> Handwritten note makes it special</li>
      </ol>
      
      <h2>Budget-Friendly Tips</h2>
      <ul>
        <li>Buy in bulk and divide into smaller gifts</li>
        <li>Use attractive cloth bags instead of expensive boxes</li>
        <li>DIY labels and tags</li>
        <li>Focus on 2-3 premium items rather than many average ones</li>
        <li>Seasonal shopping for better prices</li>
      </ul>
      
      <h2>Quantity Guide</h2>
      <ul>
        <li><strong>Personal gifts:</strong> 250-500g</li>
        <li><strong>Corporate gifts:</strong> 500-1000g</li>
        <li><strong>Wedding favors:</strong> 50-75g per person</li>
        <li><strong>Festival hampers:</strong> 750-1500g</li>
      </ul>
      
      <p><strong>Pro Tip:</strong> Include a small recipe card or serving suggestions with your gift to make it more thoughtful and useful!</p>
      
      <p><em>Remember, the best gifts come from the heart. Take time to present your dry fruit gifts beautifully, and they'll be remembered long after they're enjoyed!</em></p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800",
    category: "Tips & Guides",
    author: "Gift Curator Ananya Verma",
    readTime: 10,
    tags: ["gifting", "occasions", "festivals", "corporate gifts", "presentation"],
    published: true,
    publishedAt: Timestamp.fromDate(new Date("2024-12-01")),
    updatedAt: Timestamp.fromDate(new Date("2024-12-01")),
  },
];

async function seedBlogs() {
  console.log('Starting to seed blogs...');
  
  for (const post of blogPosts) {
    try {
      await addDoc(collection(db, 'blogs'), post);
      console.log(`✓ Added blog: ${post.title}`);
    } catch (error) {
      console.error(`✗ Error adding blog "${post.title}":`, error);
    }
  }
  
  console.log('\n✓ Blog seeding completed!');
  console.log(`Total blogs added: ${blogPosts.length}`);
}

seedBlogs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
