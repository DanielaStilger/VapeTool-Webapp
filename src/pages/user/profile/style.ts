import { createStyles } from 'antd-style'

export default createStyles(() => ({
  itemsAndControl: {
    display: 'flex',
    alignItems: 'stretch',
    marginTop: '24px',
    marginLeft: '-75px - 24px',
    '@media (max-width: @screen-xl)': { '&': { marginLeft: '0' } }
  },
  itemsPanel: {
    flex: '1 1 calc(100% - @control-width)',
    paddingLeft: '12px',
    '@media (max-width: @screen-lg)': {
      '&': { width: 'calc(100% - @icon-size)' }
    }
  },
  controlContainer: {
    position: 'relative',
    flex: '0 0 @control-width',
    paddingRight: '12px',
    '@media (max-width: @screen-lg)': { '&': { flexBasis: '@icon-size' } }
  },
  ul: {
    margin: '0',
    padding: '0',
    listStyleType: 'none'
  },
  li: {
    height: '@icon-size',
    padding: '0',
    cursor: 'pointer',
    '.label': {
      background: '@component-background',
      borderBottom: '1px @background-color-base solid'
    },
    '&:last-child .icon,\n      &:last-child .label': {
      borderBottomColor: 'transparent'
    }
  },
  active: {
    '.label': { background: '@background-color-light' },
    '.icon': { background: '@primary-8' }
  },
  icon: {
    display: 'block',
    cssFloat: 'left',
    width: '@icon-size',
    height: '@icon-size + 1px',
    paddingTop: '(@icon-size - @svg-size) / 2',
    color: '@text-color-inverse',
    textAlign: 'center',
    background: '@primary-color',
    'svg,\n    img': { width: '@svg-size', height: '@svg-size' },
    img: { verticalAlign: 'top' }
  },
  label: {
    display: 'block',
    cssFloat: 'left',
    width: 'calc(100% - @icon-size)',
    paddingLeft: '12px',
    lineHeight: '@icon-size',
    textTransform: 'uppercase'
  },
  controlPanel: {
    position: ['-webkit-sticky', 'sticky'],
    top: '88px',
    width: '150px',
    overflow: 'hidden',
    border: '1px solid #e8e8e8',
    borderRadius: '2px',
    '@media (max-width: @screen-xl)': {
      '&': { width: '@icon-size' },
      '.label': { display: 'none !important' }
    }
  }
}))
