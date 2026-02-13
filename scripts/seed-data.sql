PRAGMA defer_foreign_keys = OFF;
BEGIN TRANSACTION;

DELETE FROM "taaruf-questions";
DELETE FROM "taaruf-categories";

INSERT INTO "taaruf-categories" ("name", "slug") VALUES 
('Deen & Spirituality', 'deen-spirituality'),
('Marriage Expectations & Compatibility', 'marriage-compatibility'),
('Family & Parenting', 'family-parenting'),
('Career & Lifestyle', 'career-lifestyle'),
('Personality & Habits', 'personality-habits'),
('Funny & Lighthearted', 'funny'),
('Out of Context & Random', 'random'),
('Deep & Reflective', 'deep-reflective'),
('Daily Life & Practicalities', 'daily-life'),
('Hypothetical Scenarios', 'hypothetical');

INSERT INTO "taaruf-questions" ("category_id", "question_text") VALUES
-- Deen & Spirituality (category_id = 1)
('deen-spirituality', 'How do you maintain your connection with Allah during busy or stressful times?'),
('deen-spirituality', 'What is your favorite surah and why does it resonate with you?'),
('deen-spirituality', 'How do you approach seeking knowledge, formally or self-study?'),
('deen-spirituality', 'What Islamic habit are you currently trying to improve?'),
('deen-spirituality', 'How do you handle spiritual lows when your iman feels weak?'),
('deen-spirituality', 'What role do you want Islamic reminders to play in our home?'),
('deen-spirituality', 'How do you feel about attending halaqas or Islamic classes as a couple?'),
('deen-spirituality', 'What is your view on celebrating the Prophet is birthday (Mawlid)?'),
('deen-spirituality', 'How do you prefer to start your day, Fajr routine or otherwise?'),
('deen-spirituality', 'What dua do you make most frequently?'),

-- Marriage Expectations & Compatibility (category_id = 2)
('marriage-compatibility', 'What does your ideal day look like 10 years from now?'),
('marriage-compatibility', 'How do you define success in a marriage?'),
('marriage-compatibility', 'What are your non-negotiables in a spouse?'),
('marriage-compatibility', 'How do you prefer to resolve conflicts, talk immediately or take space first?'),
('marriage-compatibility', 'What role do you think in-laws should play in our marriage?'),
('marriage-compatibility', 'Would you prefer living independently or near family?'),
('marriage-compatibility', 'How do you feel about joint vs separate finances?'),
('marriage-compatibility', 'What is your love language, words, acts of service, gifts, quality time, or touch?'),
('marriage-compatibility', 'How important is romance to you in a marriage?'),
('marriage-compatibility', 'What boundaries do you think are essential for a healthy marriage?'),

-- Family & Parenting (category_id = 3)
('family-parenting', 'How many children do you envision, if any?'),
('family-parenting', 'How would you want to raise our children, strict, gentle, or balanced?'),
('family-parenting', 'What values from your own family do you want to continue?'),
('family-parenting', 'What family traditions from your childhood would you want to pass on?'),
('family-parenting', 'How would you handle disagreements about parenting styles?'),
('family-parenting', 'Would you consider adoption or fostering?'),
('family-parenting', 'How do you feel about homeschooling vs Islamic school vs public school?'),
('family-parenting', 'What role should grandparents play in raising children?'),
('family-parenting', 'How would you teach our children about Islam?'),
('family-parenting', 'What would you do if our child questioned their faith?'),

-- Career & Lifestyle (category_id = 4)
('career-lifestyle', 'How do you balance career ambitions with family life?'),
('career-lifestyle', 'Would you support me if I wanted to pursue further education?'),
('career-lifestyle', 'How do you feel about a spouse working after marriage?'),
('career-lifestyle', 'What does your dream work-life balance look like?'),
('career-lifestyle', 'Would you be open to relocating for career opportunities?'),
('career-lifestyle', 'How do you handle stress from work?'),
('career-lifestyle', 'What are your financial goals for the next 5 years?'),
('career-lifestyle', 'How do you feel about debt, avoid it completely or strategic use?'),
('career-lifestyle', 'What kind of lifestyle do you want, minimalist, comfortable, or luxurious?'),
('career-lifestyle', 'How important is travel to you?'),

-- Personality & Habits (category_id = 5)
('personality-habits', 'Are you an early bird or night owl?'),
('personality-habits', 'How do you spend your alone time?'),
('personality-habits', 'What is your biggest pet peeve?'),
('personality-habits', 'How do you handle unexpected changes to plans?'),
('personality-habits', 'What is your favorite way to spend a rainy day?'),
('personality-habits', 'How organized are you, planner or spontaneous?'),
('personality-habits', 'What is something you are currently trying to improve about yourself?'),
('personality-habits', 'How do you recharge, socializing or solitude?'),
('personality-habits', 'What is your favorite season and why?'),
('personality-habits', 'Are you more of a listener or a talker?'),

-- Funny & Lighthearted (category_id = 6)
('funny', 'If you were a vegetable, what would you be and why?'),
('funny', 'What is the most useless talent you have?'),
('funny', 'If you could only eat one food for the rest of your life, what would it be?'),
('funny', 'Would you rather fight 100 duck-sized horses or one horse-sized duck?'),
('funny', 'What is your most embarrassing childhood memory?'),
('funny', 'If you were a superhero, what would your superpower and weakness be?'),
('funny', 'What is the weirdest thing you have ever googled?'),
('funny', 'If you had to wear one color for the rest of your life, what would it be?'),
('funny', 'What is your guilty pleasure TV show or movie?'),
('funny', 'If you could instantly become an expert at something ridiculous, what would you be?'),

-- Out of Context & Random (category_id = 7)
('random', 'If you were a furniture, would you be a cozy armchair or a sleek minimalist table?'),
('random', 'Do you think penguins have knees?'),
('random', 'If you could communicate with one type of animal, which would you choose?'),
('random', 'Would you survive a zombie apocalypse, and what is your strategy?'),
('random', 'If you could rename yourself after a spice, what would you pick?'),
('random', 'Do you think cereal is a soup? Defend your answer.'),
('random', 'If you had to live in a fictional universe, where would you choose?'),
('random', 'What is your opinion on pineapple on pizza, culinary genius or crime against humanity?'),
('random', 'If you were a ghost, who or what would you haunt?'),
('random', 'Would you rather have fingers as long as your legs, or legs as short as your fingers?'),

-- Deep & Reflective (category_id = 8)
('deep-reflective', 'What is a lesson you learned the hard way?'),
('deep-reflective', 'If you could write a letter to your younger self, what would you say?'),
('deep-reflective', 'What does happiness mean to you?'),
('deep-reflective', 'What is something you have never told anyone but want to share?'),
('deep-reflective', 'How do you want to be remembered after you die?'),
('deep-reflective', 'What is your biggest fear about growing older?'),
('deep-reflective', 'What experience shaped who you are today?'),
('deep-reflective', 'If you could change one thing about the world, what would it be?'),
('deep-reflective', 'What does home mean to you?'),
('deep-reflective', 'What is something you are grateful for that you rarely acknowledge?'),

-- Daily Life & Practicalities (category_id = 9)
('daily-life', 'Who cooks in your ideal household, one person or shared?'),
('daily-life', 'How tidy do you like your living space to be?'),
('daily-life', 'What is your stance on having a TV in the bedroom?'),
('daily-life', 'How do you feel about pets, essential, okay, or absolutely not?'),
('daily-life', 'What is your morning routine like?'),
('daily-life', 'How do you feel about meal prepping vs cooking fresh daily?'),
('daily-life', 'What is your sleep schedule like, strict 10 PM or flexible?'),
('daily-life', 'How do you handle household chores, divide equally or play to strengths?'),
('daily-life', 'What is your ideal weekend, productive or lazy?'),
('daily-life', 'How important is having a car vs using public transport?'),

-- Hypothetical Scenarios (category_id = 10)
('hypothetical', 'If we won the lottery tomorrow, what is the first thing you would do?'),
('hypothetical', 'If you had to choose between never traveling again or never eating your favorite food again, which would you pick?'),
('hypothetical', 'If you could have dinner with any three people, dead or alive, who would they be?'),
('hypothetical', 'If you were stranded on an island, what three things would you want with you?'),
('hypothetical', 'If you could relive one day of your life, which would it be?'),
('hypothetical', 'If you had to teach a class on one thing, what would you teach?'),
('hypothetical', 'If you could instantly master any skill, what would you choose?'),
('hypothetical', 'If you could time travel, would you go to the past or future?'),
('hypothetical', 'If you had to delete all but three apps from your phone, which would you keep?'),
('hypothetical', 'If our life together was a movie, what genre would it be?');

COMMIT;