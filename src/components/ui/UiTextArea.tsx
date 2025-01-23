import React, { lazy } from 'react';
import styles from './UiTextArea.module.scss';
const UiField = lazy(() => import('./UiField'));
interface Props {
  label: string;
  value: string;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  placeholder?: string;
  error?: string;
  onChange: (event: { name: string; value: string }) => void;
}
export default function UiTextArea({
  label,
  name,
  value,
  error,
  placeholder,
  onChange,
}: Props) {
  function sendValue(e: { target: { name: string; value: string } }) {
    onChange({ name: e.target.name, value: e.target.value });
  }
  return (
    <UiField label={label} error={error}>
      <textarea 
        className={`${styles.ui_textarea} ${error && styles.error}`}
        value={value || ''}
        name={name}
        placeholder={placeholder}
        onChange={sendValue}
      >
      </textarea>
    </UiField>
  );
}

