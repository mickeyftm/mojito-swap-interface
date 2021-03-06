import React, { CSSProperties, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Input, Text, Flex, Box } from '../../uikit'
import { useUserDeadline } from 'state/user/hooks'
import QuestionHelper from '../QuestionHelper'

const Field = styled.div`
  align-items: center;
  display: inline-flex;

  & > ${Input} {
    max-width: 100px;
  }
`

type TransactionDeadlineSettingModalProps = {
  translateString: (translationId: number, fallback: string) => string
  styles: CSSProperties
}

const TransactionDeadlineSetting = ({ translateString, styles }: TransactionDeadlineSettingModalProps) => {
  const [deadline, setDeadline] = useUserDeadline()
  const [value, setValue] = useState(deadline / 60) // deadline in minutes
  const [error, setError] = useState<string | null>(null)

  const theme = useTheme()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(parseInt(inputValue, 10))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 60
      if (!Number.isNaN(rawValue) && rawValue > 0) {
        setDeadline(rawValue)
        setError(null)
      } else {
        setError(translateString(1150, 'Enter a valid deadline'))
      }
    } catch {
      setError(translateString(1150, 'Enter a valid deadline'))
    }
  }, [value, setError, setDeadline, translateString])

  return (
    <Box mb="16px" style={styles}>
      <Flex alignItems="center" mb="8px">
        <Text>{translateString(90, 'Transaction deadline')}</Text>
        <QuestionHelper
          text={translateString(188, 'Your transaction will revert if it is pending for more than this long.')}
        />
      </Flex>
      <Field>
        <Input
          type="number"
          step="1"
          min="1"
          value={value}
          onChange={handleChange}
          scale="md"
          style={{ borderRadius: '4px', background: '#fff', border: '1px solid #d9d9d9', height: '48px' }}
        />
        <Text fontSize="14px" ml="8px">
          Minutes
        </Text>
      </Field>
      {error && (
        <Text mt="8px" color="failure">
          {error}
        </Text>
      )}
    </Box>
  )
}

export default TransactionDeadlineSetting
