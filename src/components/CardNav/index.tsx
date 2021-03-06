import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '../../uikit'
import useI18n from 'hooks/useI18n'

const StyledNav = styled.div`
  margin-top: 48px;
  margin-bottom: 32px;
`

function Nav({ activeIndex = 0 }: { activeIndex?: number }) {
  const TranslateString = useI18n()
  return (
    <StyledNav>
      <ButtonMenu
        activeIndex={activeIndex}
        variant="subtle"
        styles={{ height: '44px', borderRadius: '22px', background: '#fff' }}
      >
        <ButtonMenuItem
          id="swap-nav-link"
          to="/swap"
          as={Link}
          style={{
            borderRadius: '18px',
            height: '36px',
            fontSize: '16px',
            fontWeight: 600,
            color: activeIndex === 0 ? '#fff' : '#000',
          }}
        >
          {TranslateString(1142, 'Exchange')}
        </ButtonMenuItem>
        <ButtonMenuItem
          id="pool-nav-link"
          to="/pool"
          as={Link}
          style={{
            borderRadius: '18px',
            height: '36px',
            fontSize: '16px',
            fontWeight: 600,
            color: activeIndex === 1 ? '#fff' : '#000',
          }}
        >
          {TranslateString(262, 'Liquidity')}
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export default Nav
