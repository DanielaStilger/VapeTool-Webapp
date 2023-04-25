import { createStyles } from 'antd-style'

export default createStyles(({ token }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    margin: '-24px',
    overflow: 'auto',
    background: token.colorBgLayout
  },
  lang: {
    width: '100%',
    height: '40px',
    lineHeight: '44px',
    textAlign: 'right',
    ':global(.ant-dropdown-trigger)': { marginRight: '24px' }
  },
  content: { flex: 1, padding: '32px 0' },
  '@media (min-width: @screen-md-min)': {
    '.container': {
      backgroundImage:
        "url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center 110px',
      backgroundSize: '100%'
    },
    '.content': { padding: '32px 0 24px' }
  },
  top: { textAlign: 'center' },
  header: {
    height: '44px',
    lineHeight: '44px',
    a: { textDecoration: 'none' }
  },
  logo: { height: '44px', marginRight: '16px', verticalAlign: 'top' },
  title: {
    position: 'relative',
    top: '2px',
    color: '@heading-color',
    fontWeight: 600,
    fontSize: '33px',
    fontFamily: "Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif"
  },
  desc: {
    marginTop: '12px',
    marginBottom: '40px',
    color: '@text-color-secondary',
    fontSize: '@font-size-base'
  },
  icon: {
    marginLeft: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
    transition: 'color 0.3s',
    '&:hover': { color: token.colorPrimary }
  },
  other: {
    marginTop: '24px',
    lineHeight: '22px',
    textAlign: 'left',
    '.register': { cssFloat: 'right' }
  },
  main: {
    width: '368px',
    margin: '0 auto',
    '@media screen and (max-width: @screen-sm)': { width: '95%' },
    ':global': {
      '.antd-pro-login-submit': { width: '100%', marginTop: '24px' }
    }
  }
}))
