exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createExtension('uuid-ossp', {
    ifNotExists: true,
  });
  pgm.createTable('questions', {
    id: { type: 'uuid', default: pgm.func('uuid_generate_v4 ()') },
    posttitle: { type: 'varchar(255)', notNull: true },
    permalink: { type: 'varchar(255)', notNull: true },
    url: { type: 'varchar(255)', notNull: true },
    theonion: { type: 'boolean', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('questions');
  pgm.dropExtension('uuid-ossp');
};
