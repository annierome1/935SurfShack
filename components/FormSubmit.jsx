'use client';

import React from 'react';
import styles from '../styles/components/FormSubmit.module.css'

export default function FormSubmit({
  to,
  subject = '',
  children,
  formType = 'inquiry',    
  className = '',
  buttonText = 'Send Message',
}) {

  const humanize = (key) =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_-]/g, ' ')
      .replace(/^./, (s) => s.toUpperCase());

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const { name, email, message, ...others } = data;

    // Build friendly body
    const lines = [`Hi! My name is ${name}.`, ''];

    if (formType === 'privateEvent') {
      lines.push("I'm interested in booking a private event for:", '');
    } else if (formType === 'careers') {
      lines.push("I'd like to submit my application for:", '');
    } else {
      lines.push('I have a question regarding:', '');
    }

    Object.entries(others).forEach(([key, val]) => {
      if (val) lines.push(`${humanize(key)}: ${val}`);
    });

    // Add the main message last
    if (message) {
      lines.push('', message);
    }

    lines.push('', 'Thanks!', name);

    const body = encodeURIComponent(lines.join('\r\n'));
    const mailto =
      `mailto:${to}` +
      (subject ? `?subject=${encodeURIComponent(subject)}` : '') +
      `&body=${body}`;

    window.location.href = mailto;
  };


  const formClass = [styles.form, styles[`${formType}Form`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <form onSubmit={handleSubmit} className={formClass}>
      {children}
      
    </form>
  );
}
