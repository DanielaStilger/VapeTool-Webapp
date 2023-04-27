import React from 'react'
import { GithubOutlined } from '@ant-design/icons'
import { Footer } from 'flowbite-react'

export default () => (
  <Footer container={true}>
  <Footer.Copyright
    href="#"
    by="Vape Tool"
    year={new Date(Date.now()).getFullYear()}
  />
  <Footer.LinkGroup>
    <Footer.Link href="https://github.com/vape-tool/VapeTool-Webapp">
      Github <GithubOutlined />
    </Footer.Link>
    <Footer.Link href="#">
      Privacy Policy
    </Footer.Link>
  </Footer.LinkGroup>
</Footer>
)
