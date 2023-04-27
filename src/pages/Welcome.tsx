import React from 'react'
import { Card, Typography } from 'antd'

export default () => (
  <React.Fragment>
    <Card>
      <Typography.Title level={4}>
        <span role='img' aria-label='icon'>
          🚧
        </span>
        Vape Tool Webapp - Alpha
        <span role='img' aria-label='icon'>
          {' '}
          🚧
        </span>
      </Typography.Title>
      <Typography>
        <Typography.Paragraph>
          This webapp is currently under heavy development 🏗 . You might find a lot of bugs or even
          dragons{' '}
          <span role='img' aria-label='icon'>
            {' '}
            🐉
          </span>
          ...
          <Typography.Text strong>
            Please use this app on your own risk{' '}
            <span role='img' aria-label='icon'>
              👷
            </span>
            .
          </Typography.Text>
        </Typography.Paragraph>
      </Typography>
    </Card>
  </React.Fragment>
)
