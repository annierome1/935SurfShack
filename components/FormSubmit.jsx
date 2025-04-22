// components/FormSubmit.jsx
import React from 'react';

export default function FormSubmit({
  to,
  subject = '',
  children,
  className = '',
}) {
  // build a mailto: URL with an optional subject
  const href = `mailto:${to}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

  return (
    <form
      action={href}
      method="POST"
      encType="text/plain"
      className={className}
    >
      {/* your inputs */}
      {children}

      {/* submit button */}
      
    </form>
  );
}
