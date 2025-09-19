import React from 'react';

// Enhanced Card components with Tailwind classes for styling
export const Card = ({ children, className }) => <div className={`glass-card border-white/10 p-6 rounded-2xl ${className}`}>{children}</div>;
export const CardHeader = ({ children, className }) => <div className={`pb-4 ${className}`}>{children}</div>;
export const CardTitle = ({ children, className }) => <h3 className={`text-xl font-semibold text-white ${className}`}>{children}</h3>;
export const CardDescription = ({ children, className }) => <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
export const CardContent = ({ children, className }) => <div className={`pt-4 ${className}`}>{children}</div>;

// Enhanced Button with variants
export const Button = ({ children, variant, size, className, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary";
  const sizeStyle = size === 'lg' ? 'px-8 py-3' : 'px-4 py-2';
  
  let variantStyle;
  if (variant === 'outline') {
    variantStyle = "border border-white/20 bg-transparent hover:bg-white/10 text-white";
  } else if (variant === 'ghost') {
    variantStyle = "hover:bg-white/10 hover:text-white text-muted-foreground";
  } else if (variant === 'link') {
    variantStyle = "text-primary underline-offset-4 hover:underline";
  } else {
    variantStyle = "bg-primary text-primary-foreground hover:bg-primary/90 text-white";
  }

  return <button className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`} {...props}>{children}</button>;
};

// Enhanced Badge with variants
export const Badge = ({ children, className }) => <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}>{children}</span>;

export const Progress = ({ value }) => <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{ width: `${value}%` }}></div></div>;
// In src/ui.js, find the Input export and replace it with this:

export const Input = (props) => <input className="flex h-10 w-full rounded-md border-gray-700 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" {...props} />;
export const Label = (props) => <label className="text-sm font-medium leading-none text-white" {...props} />;
export const Checkbox = (props) => <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" {...props} />;
export const Select = ({ children }) => <div>{children}</div>;
export const SelectTrigger = ({ children }) => <div className="border border-white/20 p-2 rounded-md">{children}</div>;
export const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
export const SelectContent = ({ children }) => <div>{children}</div>;
export const SelectItem = ({ children, value }) => <div data-value={value}>{children}</div>;
export const Avatar = ({ children, className }) => <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full items-center justify-center bg-slate-700 text-white ${className}`}>{children}</div>;
export const AvatarFallback = ({ children }) => <span>{children}</span>;
export const AvatarImage = () => null;