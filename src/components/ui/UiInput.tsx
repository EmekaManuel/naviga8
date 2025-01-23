import UiField from "./UiField";
import styles from './UiInput.module.scss';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input/input';

export type OnChangeParams = { name: string; value: string | null };
interface Props {
  label?: string;
  value: string | null | number;
  placeholder?: string;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  name: string;
  type?: 'text' | 'phone'
  error?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (event: OnChangeParams) => void;
}

export default function UiInput({
  label,
  name,
  type,
  value,
  placeholder,
  disabled,
  error,
  inputRef,
  onChange,
}: Props) {

  function sendValue(e: { target: { name: string; value: string } }) {
      onChange({ name: e.target.name, value: e.target.value });
  }

  function sendPhone(value: string | null | undefined) {
    onChange({ name, value: value || null });
  }

  return (
    <UiField label={label} error={error}>
      <div className={styles.input_wrapper}>
          {type === 'phone' ? (
            <div className={styles.phone_wrapper}>
              <div className={styles.phone_tag}>+234</div>
              <PhoneInput
                value={`${value}` || ''}
                country="NG"
                className={`${styles.phone_input} ${error && styles.error}`}
                placeholder="e.g: 08034283438"
                onChange={(e) => sendPhone(e)}
              />
            </div>
        ) : (
          <input 
            className={`${styles.ui_input} ${error && styles.error}`}
            type="text" 
            value={value || ''}
            placeholder={placeholder}
            name={name}
            ref={inputRef}
            disabled={disabled}
            onChange={sendValue}
          />
        )}
        
      </div>
    </UiField>
  );
}
