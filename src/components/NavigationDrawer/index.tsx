import React from 'react'
import { useLinkClickHandler, useLocation, Outlet } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { Navbar, Dropdown, Avatar, Footer } from 'flowbite-react'
import { LogoutOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons'
import { FormattedMessage } from 'react-intl'
import FirebaseImage from '../StorageAvatar'
import { ImageType } from '@/services/storage'
import { useAuth } from '@/context/FirebaseAuthContext'
import { PageLoading } from '@ant-design/pro-layout'
import { sign } from 'crypto'

function AppNavLink(props: {
  href: string
  text: string
}) {
  const location = useLocation()
  const clickHandler = useLinkClickHandler(props.href)

  return (
    <span onClick={clickHandler}>
      <Navbar.Link href={props.href} active={location.pathname === props.href}>
        {props.text}
      </Navbar.Link>
    </span>
  )
}

const NavigationDrawer = () => {
  const { dbUser, firebaseUser, signOut } = useAuth()
  if (!dbUser || !firebaseUser) return <PageLoading />
  return (
    <>
      <Navbar
        fluid
        rounded
      >
        <span onClick={() => useLinkClickHandler('/')}>
          <Navbar.Brand>
            <img
              src={logo}
              className='mr-3 h-6 sm:h-9'
              alt='Vape Tool Logo'
            />
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
              VapeTool
            </span>
          </Navbar.Brand>
        </span>

        <div className='flex md:order-2'>
          <Dropdown
            arrowIcon={false}
            inline
            label={<FirebaseImage
              size="small"
              type={ImageType.USER}
              id={firebaseUser.uid}
              alt="avatar"
            />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>
                {dbUser.display_name}
              </span>
              <span className='block truncate text-sm font-medium'>
                {dbUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <UserOutlined />
              <FormattedMessage id='menu.account.center' defaultMessage='account center' />
            </Dropdown.Item>
            <Dropdown.Item>
              <UnlockOutlined />
              <FormattedMessage id='menu.account.unlock-pro' defaultMessage='unlock pro' />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={signOut}>
              <LogoutOutlined />
              <FormattedMessage id='menu.account.logout' defaultMessage='logout' />
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <AppNavLink href='/welcome' text='Home' />
          <AppNavLink href='/cloud' text='Cloud' />
          <AppNavLink href='/coil-calculator' text='Coil Calculator' />
          <AppNavLink href='/liquid-blender' text='Liquid blender' />
          <AppNavLink href='/mixer' text='Mixer' />
          <AppNavLink href='/ohm-law' text='Ohm law' />
          <AppNavLink href='/converters' text='Converters' />
          <AppNavLink href='/battery-life' text='Battery life' />
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
      <Footer container>
        <Footer.Copyright
          href='#'
          by='Vape Tool'
          year={2023}
        />
        <Footer.LinkGroup>
          <Footer.Link href='#'>
            About
          </Footer.Link>
          <Footer.Link href='#'>
            Privacy Policy
          </Footer.Link>
          <Footer.Link href='#'>
            Contact
          </Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </>
  )
}

export default NavigationDrawer
