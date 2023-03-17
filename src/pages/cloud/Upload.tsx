import { Col, Row, Tabs } from 'antd'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import UploadPost from '@/components/UploadPost'
import UploadPhoto from '@/pages/cloud/UploadPhoto'
import { Tab, useUploadModel } from '@/models/upload'
import { PictureOutlined, LinkOutlined, FormOutlined } from '@ant-design/icons'
import UploadLink from '@/components/UploadLink'

const Upload: React.FC = () => {
  const { currentTab, setTab } = useUploadModel()
  const onTabChange = (key: string) => setTab(Tab[key])

  return (
    <Row>
      <Col xs={0} md={4} lg={6} xl={8} />
      <Col xs={24} md={16} lg={14} xl={10}>
        <Tabs onChange={onTabChange} type='card' activeKey={currentTab}>
          <Tabs.TabPane
            tab={
              <span>
                <PictureOutlined />
                <FormattedMessage id='user.photo' defaultMessage='Photo' />
              </span>
            }
            key={Tab.PHOTO}
          >
            <UploadPhoto />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <FormOutlined />
                <FormattedMessage id='user.post' defaultMessage='Post' />
              </span>
            }
            key={Tab.POST}
          >
            <UploadPost />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <LinkOutlined />
                <FormattedMessage id='user.link' defaultMessage='Link' />
              </span>
            }
            key={Tab.LINK}
          >
            <UploadLink />
          </Tabs.TabPane>
        </Tabs>
      </Col>
      <Col xs={0} md={4} lg={6} xl={8} />
    </Row>
  )
}

export default Upload
