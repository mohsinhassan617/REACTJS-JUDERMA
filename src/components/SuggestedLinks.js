// SuggestedLinks.js
import React from 'react';

function SuggestedLinks(props) {
  const { suggestions } = props;

  return (
    <div>
      <h2>Suggested Links</h2>
      <ul>
        {suggestions.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestedLinks;
