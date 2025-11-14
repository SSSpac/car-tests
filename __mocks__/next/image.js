const React = require('react');

module.exports = function Image({ src, alt, ...props }) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return React.createElement('img', { src, alt, ...props });
};
