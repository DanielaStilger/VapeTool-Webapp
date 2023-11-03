import React, { useEffect, useState } from 'react'
import { getAdImageProperties, BannerProperties, getBannerUrl } from '@/services/storage'
import { useAuth } from '@/context/FirebaseAuthContext'

export default (props: { providerName: string }) => {
  const { firebaseUser, dbUser, isUserPro } = useAuth()
  const isPro = isUserPro()

  const [bannerProperties, setBannerProperties] = useState<BannerProperties>()
  const [bannerSrc, setBannerSrc] = useState<string | undefined>()
  if (firebaseUser?.isAnonymous || isPro) {
    return <></>
  }

  useEffect(() => {
    getAdImageProperties(props.providerName)
      .then((adProperties) => {
        console.log({ adProperties })
        getBannerUrl(adProperties).then((newBannerSrc) => {
          setBannerSrc(newBannerSrc)
          setBannerProperties(adProperties)
        })
      })
      .catch(() => {
        const defaultBannerProperties: BannerProperties = {
          name: 'admob',
          linkUrl: '',
          imageGs: ''
        }
        setBannerProperties(defaultBannerProperties)
      })
  }, [props.providerName])

  return (
    <>
      {(bannerProperties != null) && (
        <>
          {bannerProperties.linkUrl && (
            <a href={bannerProperties.linkUrl} target='__blank'>
              <img src={bannerSrc} alt={bannerProperties.name} />
            </a>
          )}
        </>
      )}
    </>
  )
}
