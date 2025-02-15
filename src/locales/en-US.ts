import component from './en-US/component'
import globalHeader from './en-US/globalHeader'
import menu from './en-US/menu'
import pwa from './en-US/pwa'
import settingDrawer from './en-US/settingDrawer'
import settings from './en-US/settings'
import misc from './en-US/misc'
import signIn from './en-US/signIn'
import converters from './en-US/converters'
import user from './en-US/user'
import battery from './en-US/battery'
import liquid from './en-US/liquid'
import mixer from './en-US/mixer'
import coilCalculator from './en-US/coilCalculator'

export default {
  'navBar.lang': 'Languages',
  'app.currency': '$',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...misc,
  ...signIn,
  ...converters,
  ...user,
  ...battery,
  ...liquid,
  ...mixer,
  ...coilCalculator
}
