import { Item, ItemName, Link, Photo, Post } from '@/types'
import { useState } from 'react'

export const useCloudModel = () => {
  const [photos, setPhotos] = useState<Photo[] | undefined>()
  const [posts, setPosts] = useState<Post[] | undefined>()
  const [links, setLinks] = useState<Link[] | undefined>()

  const setItems = (what: ItemName, items: Item[]) => {
    items.sort((a: Item, b: Item) => b.creationTime - a.creationTime)
    switch (what) {
      case ItemName.PHOTO:
        setPhotos(items as Photo[])
        break
      case ItemName.POST:
        setPosts(items as Post[])
        break
      case ItemName.LINK:
        setLinks(items as Link[])
        break
      default:
        throw new Error(`Illegal type ${what}`)
    }
  }
  return {
    setLinks, setPhotos, setPosts, setItems, posts, links, photos
  }
}
