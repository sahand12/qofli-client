import React from 'react';

type Props = {
  score: number;
  best: number;
  addition: number;
};
function Heading({ score, best, addition }: Props) {
  return (
    <div className="tf-heading">
      <h1 className="tf-heading__title">2048</h1>
      <div className="tf-scores">
        <div className="tf-scores__current">
          {format(score)}
          <div className="tf-scores__addition">+{addition}</div>
        </div>
        <div className="tf-scores__best">{format(best)}</div>
      </div>
    </div>
  );
}

function format(number: number): string {
  const str = String(number);
  let formatted = '';
  for (let i = 0, len = str.length; i < len; i++) {
    if ((len - i - 1) % 3 === 0) {
      formatted += str[i] + ' ';
    } else {
      formatted += str[i];
    }
  }
  return formatted.trim();
}

export { Heading };
