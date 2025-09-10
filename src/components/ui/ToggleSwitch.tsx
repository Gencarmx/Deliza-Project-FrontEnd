"use client";

import React from 'react';

export interface ToggleSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * If the switch is checked
   */
  checked: boolean;
  /**
   * Handler when switch changes
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * A simple toggle switch component
 */
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, ...props }) => (
  <label className="relative inline-block w-10 h-6">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only"
      {...props}
    />
    {/* Background track */}
    <span
      className={
        `block w-full h-full rounded-full transition-colors duration-200 ease-in-out ` +
        (checked ? 'bg-yellow-400' : 'bg-gray-300')
      }
    />
    {/* Knob */}
    <span
      className={
        `absolute top-0 left-0 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ` +
        (checked ? 'translate-x-4' : 'translate-x-0')
      }
    />
  </label>
);

export default ToggleSwitch;
