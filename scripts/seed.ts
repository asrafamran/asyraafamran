import { createDb, schema } from '../src/db/index';
import { eq } from 'drizzle-orm';

const categories = [
  { name: 'Deen & Spirituality', slug: 'deen-spirituality' },
  { name: 'Marriage Expectations & Compatibility', slug: 'marriage-compatibility' },
  { name: 'Family & Parenting', slug: 'family-parenting' },
  { name: 'Career & Lifestyle', slug: 'career-lifestyle' },
  { name: 'Personality & Habits', slug: 'personality-habits' },
  { name: 'Funny & Lighthearted', slug: 'funny' },
  { name: 'Out of Context & Random', slug: 'random' },
  { name: 'Deep & Reflective', slug: 'deep-reflective' },
  { name: 'Daily Life & Practicalities', slug: 'daily-life' },
  { name: 'Hypothetical Scenarios', slug: 'hypothetical' },
];

const questions = [
  // Deen & Spirituality
  { categorySlug: 'deen-spirituality', questionText: 'How do you maintain your connection with Allah during busy or stressful times?' },
  { categorySlug: 'deen-spirituality', questionText: "What's your favorite surah and why does it resonate with you?" },
  { categorySlug: 'deen-spirituality', questionText: 'How do you approach seeking knowledge—formally or self-study?' },
  { categorySlug: 'deen-spirituality', questionText: 'What Islamic habit are you currently trying to improve?' },
  { categorySlug: 'deen-spirituality', questionText: 'How do you handle spiritual lows when your iman feels weak?' },
  { categorySlug: 'deen-spirituality', questionText: 'What role do you want Islamic reminders to play in our home?' },
  { categorySlug: 'deen-spirituality', questionText: 'How do you feel about attending halaqas or Islamic classes as a couple?' },
  { categorySlug: 'deen-spirituality', questionText: "What's your view on celebrating the Prophet's birthday (Mawlid)?" },
  { categorySlug: 'deen-spirituality', questionText: 'How do you prefer to start your day—Fajr routine or otherwise?' },
  { categorySlug: 'deen-spirituality', questionText: 'What dua do you make most frequently?' },
  
  // Marriage Expectations & Compatibility
  { categorySlug: 'marriage-compatibility', questionText: 'What does your ideal day look like 10 years from now?' },
  { categorySlug: 'marriage-compatibility', questionText: 'How do you define success in a marriage?' },
  { categorySlug: 'marriage-compatibility', questionText: 'What are your non-negotiables in a spouse?' },
  { categorySlug: 'marriage-compatibility', questionText: 'How do you prefer to resolve conflicts—talk immediately or take space first?' },
  { categorySlug: 'marriage-compatibility', questionText: 'What role do you think in-laws should play in our marriage?' },
  { categorySlug: 'marriage-compatibility', questionText: 'Would you prefer living independently or near family?' },
  { categorySlug: 'marriage-compatibility', questionText: 'How do you feel about joint vs. separate finances?' },
  { categorySlug: 'marriage-compatibility', questionText: "What's your love language—words, acts of service, gifts, quality time, or touch?" },
  { categorySlug: 'marriage-compatibility', questionText: 'How important is romance to you in a marriage?' },
  { categorySlug: 'marriage-compatibility', questionText: 'What boundaries do you think are essential for a healthy marriage?' },
  
  // Family & Parenting
  { categorySlug: 'family-parenting', questionText: 'How many children do you envision, if any?' },
  { categorySlug: 'family-parenting', questionText: 'How would you want to raise our children—strict, gentle, or balanced?' },
  { categorySlug: 'family-parenting', questionText: 'What values from your own family do you want to continue?' },
  { categorySlug: 'family-parenting', questionText: 'What family traditions from your childhood would you want to pass on?' },
  { categorySlug: 'family-parenting', questionText: 'How would you handle disagreements about parenting styles?' },
  { categorySlug: 'family-parenting', questionText: 'Would you consider adoption or fostering?' },
  { categorySlug: 'family-parenting', questionText: 'How do you feel about homeschooling vs. Islamic school vs. public school?' },
  { categorySlug: 'family-parenting', questionText: 'What role should grandparents play in raising children?' },
  { categorySlug: 'family-parenting', questionText: 'How would you teach our children about Islam?' },
  { categorySlug: 'family-parenting', questionText: 'What would you do if our child questioned their faith?' },
  
  // Career & Lifestyle
  { categorySlug: 'career-lifestyle', questionText: 'How do you balance career ambitions with family life?' },
  { categorySlug: 'career-lifestyle', questionText: 'Would you support me if I wanted to pursue further education?' },
  { categorySlug: 'career-lifestyle', questionText: 'How do you feel about a spouse working after marriage?' },
  { categorySlug: 'career-lifestyle', questionText: 'What does your dream work-life balance look like?' },
  { categorySlug: 'career-lifestyle', questionText: 'Would you be open to relocating for career opportunities?' },
  { categorySlug: 'career-lifestyle', questionText: 'How do you handle stress from work?' },
  { categorySlug: 'career-lifestyle', questionText: 'What are your financial goals for the next 5 years?' },
  { categorySlug: 'career-lifestyle', questionText: 'How do you feel about debt—avoid it completely or strategic use?' },
  { categorySlug: 'career-lifestyle', questionText: 'What kind of lifestyle do you want—minimalist, comfortable, or luxurious?' },
  { categorySlug: 'career-lifestyle', questionText: 'How important is travel to you?' },
  
  // Personality & Habits
  { categorySlug: 'personality-habits', questionText: 'Are you an early bird or night owl?' },
  { categorySlug: 'personality-habits', questionText: 'How do you spend your alone time?' },
  { categorySlug: 'personality-habits', questionText: "What's your biggest pet peeve?" },
  { categorySlug: 'personality-habits', questionText: 'How do you handle unexpected changes to plans?' },
  { categorySlug: 'personality-habits', questionText: "What's your favorite way to spend a rainy day?" },
  { categorySlug: 'personality-habits', questionText: 'How organized are you—planner or spontaneous?' },
  { categorySlug: 'personality-habits', questionText: "What's something you're currently trying to improve about yourself?" },
  { categorySlug: 'personality-habits', questionText: 'How do you recharge—socializing or solitude?' },
  { categorySlug: 'personality-habits', questionText: "What's your favorite season and why?" },
  { categorySlug: 'personality-habits', questionText: 'Are you more of a listener or a talker?' },
  
  // Funny & Lighthearted
  { categorySlug: 'funny', questionText: 'If you were a vegetable, what would you be and why?' },
  { categorySlug: 'funny', questionText: "What's the most useless talent you have?" },
  { categorySlug: 'funny', questionText: 'If you could only eat one food for the rest of your life, what would it be?' },
  { categorySlug: 'funny', questionText: 'Would you rather fight 100 duck-sized horses or one horse-sized duck?' },
  { categorySlug: 'funny', questionText: "What's your most embarrassing childhood memory?" },
  { categorySlug: 'funny', questionText: 'If you were a superhero, what would your superpower and weakness be?' },
  { categorySlug: 'funny', questionText: "What's the weirdest thing you've ever googled?" },
  { categorySlug: 'funny', questionText: 'If you had to wear one color for the rest of your life, what would it be?' },
  { categorySlug: 'funny', questionText: "What's your guilty pleasure TV show or movie?" },
  { categorySlug: 'funny', questionText: 'If you could instantly become an expert at something ridiculous, what would you be?' },
  
  // Out of Context & Random
  { categorySlug: 'random', questionText: 'If you were a furniture, would you be a cozy armchair or a sleek minimalist table?' },
  { categorySlug: 'random', questionText: 'Do you think penguins have knees?' },
  { categorySlug: 'random', questionText: 'If you could communicate with one type of animal, which would you choose?' },
  { categorySlug: 'random', questionText: 'Would you survive a zombie apocalypse, and what is your strategy?' },
  { categorySlug: 'random', questionText: 'If you could rename yourself after a spice, what would you pick?' },
  { categorySlug: 'random', questionText: 'Do you think cereal is a soup? Defend your answer.' },
  { categorySlug: 'random', questionText: 'If you had to live in a fictional universe, where would you choose?' },
  { categorySlug: 'random', questionText: 'What is your opinion on pineapple on pizza—culinary genius or crime against humanity?' },
  { categorySlug: 'random', questionText: 'If you were a ghost, who or what would you haunt?' },
  { categorySlug: 'random', questionText: 'Would you rather have fingers as long as your legs, or legs as short as your fingers?' },
  
  // Deep & Reflective
  { categorySlug: 'deep-reflective', questionText: "What's a lesson you learned the hard way?" },
  { categorySlug: 'deep-reflective', questionText: 'If you could write a letter to your younger self, what would you say?' },
  { categorySlug: 'deep-reflective', questionText: 'What does happiness mean to you?' },
  { categorySlug: 'deep-reflective', questionText: "What's something you've never told anyone but want to share?" },
  { categorySlug: 'deep-reflective', questionText: 'How do you want to be remembered after you die?' },
  { categorySlug: 'deep-reflective', questionText: "What's your biggest fear about growing older?" },
  { categorySlug: 'deep-reflective', questionText: 'What experience shaped who you are today?' },
  { categorySlug: 'deep-reflective', questionText: 'If you could change one thing about the world, what would it be?' },
  { categorySlug: 'deep-reflective', questionText: 'What does "home" mean to you?' },
  { categorySlug: 'deep-reflective', questionText: "What's something you're grateful for that you rarely acknowledge?" },
  
  // Daily Life & Practicalities
  { categorySlug: 'daily-life', questionText: 'Who cooks in your ideal household—one person or shared?' },
  { categorySlug: 'daily-life', questionText: 'How tidy do you like your living space to be?' },
  { categorySlug: 'daily-life', questionText: "What's your stance on having a TV in the bedroom?" },
  { categorySlug: 'daily-life', questionText: 'How do you feel about pets—essential, okay, or absolutely not?' },
  { categorySlug: 'daily-life', questionText: "What's your morning routine like?" },
  { categorySlug: 'daily-life', questionText: 'How do you feel about meal prepping vs. cooking fresh daily?' },
  { categorySlug: 'daily-life', questionText: "What's your sleep schedule like—strict 10 PM or flexible?" },
  { categorySlug: 'daily-life', questionText: 'How do you handle household chores—divide equally or play to strengths?' },
  { categorySlug: 'daily-life', questionText: "What's your ideal weekend—productive or lazy?" },
  { categorySlug: 'daily-life', questionText: 'How important is having a car vs. using public transport?' },
  
  // Hypothetical Scenarios
  { categorySlug: 'hypothetical', questionText: 'If we won the lottery tomorrow, what is the first thing you would do?' },
  { categorySlug: 'hypothetical', questionText: 'If you had to choose between never traveling again or never eating your favorite food again, which would you pick?' },
  { categorySlug: 'hypothetical', questionText: 'If you could have dinner with any three people, dead or alive, who would they be?' },
  { categorySlug: 'hypothetical', questionText: 'If you were stranded on an island, what three things would you want with you?' },
  { categorySlug: 'hypothetical', questionText: 'If you could relive one day of your life, which would it be?' },
  { categorySlug: 'hypothetical', questionText: 'If you had to teach a class on one thing, what would you teach?' },
  { categorySlug: 'hypothetical', questionText: 'If you could instantly master any skill, what would you choose?' },
  { categorySlug: 'hypothetical', questionText: 'If you could time travel, would you go to the past or future?' },
  { categorySlug: 'hypothetical', questionText: 'If you had to delete all but three apps from your phone, which would you keep?' },
  { categorySlug: 'hypothetical', questionText: 'If our life together was a movie, what genre would it be?' },
];

async function main() {
  console.log('🌱 Starting database seed...');
  
  const env = globalThis as unknown as { DB: D1Database };
  const db = createDb(env.DB);
  
  // Clear existing data
  await db.delete(schema.questions).execute();
  await db.delete(schema.categories).execute();
  
  console.log('✅ Cleared existing data');
  
  // Insert categories
  for (const cat of categories) {
    await db.insert(schema.categories).values(cat).execute();
    console.log(`  📁 Added category: ${cat.name}`);
  }
  
  // Insert questions
  for (const q of questions) {
    const [category] = await db
      .select()
      .from(schema.categories)
      .where(eq(schema.categories.slug, q.categorySlug))
      .execute();
    
    if (category) {
      await db.insert(schema.questions).values({
        categoryId: category.id,
        questionText: q.questionText,
      }).execute();
      console.log(`  ❓ Added question: ${q.questionText}`);
    }
  }
  
  console.log('🎉 Seed completed successfully!');
}

main().catch(console.error);