import { useState } from 'react'

export enum Tab {
  PHOTO = 'photo',
  POST = 'post',
  LINK = 'link',
}
export const useUploadModel = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.PHOTO)

  return {
    setTab: setCurrentTab,
    currentTab
  }
}
