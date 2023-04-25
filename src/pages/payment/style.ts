
import { createStyles } from 'antd-style'

export default createStyles(({ token }) => ({
  benefitsCard: {
    color: '@text-color-dark',
    background: '@primary-color',
    border: '1px @primary-color solid',
    fontFamily: '@fontFamily',
    borderRadius: '2px',
    '@media (max-width: @screen-lg)': { '& > div': { padding: '12px' } },
    h1: { color: '@text-color-inverse' },
    ul: {
      listStyleType: 'initial',
      li: { marginBottom: '12px', fontSize: '16px' }
    }
  },

  paymentOption: {
    display: 'block',
    marginBottom: '8px',
    padding: '8px 0',
    fontWeight: 800,
    fontSize: '20px',
    lineHeight: '20px'
  },
  radioText: {
    display: 'inline-block',
    marginLeft: '0',
    color: '@text-color-secondary',
    verticalAlign: 'middle',
    transition: 'margin 700ms, color 700ms',
    '& > div': { marginTop: '4px' },
    '&:hover': {
      marginLeft: '16px',
      color: '@text-color'
    }
  },
  active: {
    marginLeft: '16px',
    color: '@text-color'
  },
  paymentCard: {
    background: '#fefefe',
    border: '1px solid',
    borderColor: token.colorPrimary,
    fontFamily: '@fontFamily',
    borderRadius: '2px',
    '@media (max-width: @screen-lg)': { '& > div': { padding: '12px' } },
    h1: { color: token.colorPrimary },
    button: { margin: '24px 0 8px' }
  },
  accepted: {
    padding: '0 8px',
    color: token.colorTextSecondary,
    fontSize: '12px'
  },
  return: {
    color: token.colorPrimary,
    fontSize: '13px',
    i: { marginRight: '8px' }
  },
  methodName: { display: 'block', fontWeight: 800 },
  paypalMethod: {
    color: token.colorText,
    background: 'rgb(255, 196, 57)'
  },
  poweredBy: {
    display: 'block',
    color: token.colorTextSecondary,
    fontSize: '10px',
    transition: 'color 300ms'
  },
  '& > img': {
    maxWidth: '100px',
    maxHeight: '30px'
  },
  paypalLogo: { maxHeight: '50px', marginTop: '8px' },
  paymentMethod: {
    height: '92px',
    padding: '12px',
    color: token.colorText,
    textAlign: 'center',
    border: '1px solid',
    borderColor: token.colorPrimary,
    borderRadius: '2px',
    cursor: 'pointer',
    transition: 'color 300ms, background 700ms',
    '&.disabled': {
      background: '@btn-disable-bg',
      borderColor: '@btn-disable-border',
      cursor: 'inherit'
    },
    '&:hover:not(.disabled)': {
      color: '@text-color-inverse',
      background: token.colorPrimary
    }
  }
}))
