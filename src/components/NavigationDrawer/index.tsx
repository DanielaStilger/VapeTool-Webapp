import React from 'react';
import { theme } from 'antd';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.svg"
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { LogoutOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

// @ts-ignore
const NavigationDrawer = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Navbar
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand href="https://flowbite.com/">
                <img
                    src={logo}
                    className="mr-3 h-6 sm:h-9"
                    alt="Vape Tool Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    VapeTool
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            Bonnie Green
                        </span>
                        <span className="block truncate text-sm font-medium">
                            name@flowbite.com
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        <UserOutlined />
                        <FormattedMessage id="menu.account.center" defaultMessage="account center" />
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <UnlockOutlined />
                        <FormattedMessage id="menu.account.unlock-pro" defaultMessage="unlock pro" />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <LogoutOutlined />
                        <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link
                    href="/navbars"
                    active={true}
                >
                    Home
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    About
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Services
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Pricing
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>

    )
};

export default NavigationDrawer;