const React = require('react');

module.exports = function Link({ children, href, ...props }) {
  return React.createElement('a', { href, ...props }, children);
};
