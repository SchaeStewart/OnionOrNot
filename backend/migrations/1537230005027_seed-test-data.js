exports.shorthands = undefined;

exports.up = (pgm) => {
  // Seed some questions to prevent any errors
  pgm.sql(`INSERT INTO questions (posttitle, permalink, url, theonion) VALUES ('Purina Introduces ‘Own Shit’ Dog Food Flavor',
    '/r/TheOnion/comments/9dj9hq/purina_introduces_own_shit_dog_food_flavor/',
    'https://www.theonion.com/purina-introduces-own-shit-dog-food-flavor-1828855070',
    true)`);
  pgm.sql(`INSERT INTO questions (posttitle, permalink, url, theonion) VALUES ('City won''t fix laneway because it''s owned by a man who''s been dead for 118 years',
    '/r/nottheonion/comments/9gksky/city_wont_fix_laneway_because_its_owned_by_a_man/',
    'https://www.cbc.ca/news/canada/toronto/city-won-t-fix-laneway-because-it-s-owned-by-a-man-who-s-been-dead-for-118-years-1.4822629',
    false)`);
};

exports.down = (pgm) => {

};
