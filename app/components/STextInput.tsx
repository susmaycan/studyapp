import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputKeyPressEventData,
  TextInput,
  Text,
  View,
} from 'react-native'
import { HelperText } from 'react-native-paper'

interface STextInputProps {
  errors?: string[]
  isMultiline?: boolean
  isRequired?: boolean
  label?: string
  maxLength?: number
  numberOfLines?: number
  onChange: (newValue: string) => void
  onSubmit?: () => void
  returnTypeKey?: 'done' | 'next'
  type?: 'email' | 'password'
  value: string
}

export default function STextInput({
  errors,
  isMultiline,
  isRequired,
  label,
  maxLength,
  numberOfLines,
  onChange,
  onSubmit,
  returnTypeKey,
  type,
  value,
}: STextInputProps) {
  const textLabel = isRequired ? `${label} *` : label

  const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.key === 'Enter' && onSubmit) onSubmit()
  }

  return (
    <View>
      {label && <Text>{textLabel}</Text>}
      <TextInput
        autoComplete={type}
        maxLength={maxLength || 100}
        multiline={isMultiline}
        numberOfLines={numberOfLines || 1}
        onChangeText={(text) => onChange(text)}
        onKeyPress={onKeyPress}
        onSubmitEditing={onSubmit}
        returnKeyType={returnTypeKey || 'default'}
        style={styles.input}
        value={value}
      />
      {errors?.map((error) => (
        <HelperText type="error" visible={!!error} key={error}>
          {error}
        </HelperText>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    padding: 10,
  },
})
