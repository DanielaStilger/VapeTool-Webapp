import { UserPermission } from '@vapetool/types'
import { UserAuthorities } from '../types/UserAuthorities'
import useRouter from './useRouter'
import moment from 'moment'
import { parseParams } from './querystring'

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string): boolean => reg.test(path)

export const isAntDesignPro = (): boolean => {
  return window.location.hostname === 'web.vapetool.app'
}

export const isUserPro = (userSubscription: Date | null | undefined): boolean => {
  if (userSubscription != null) {
    return userSubscription && moment(userSubscription).isAfter()
  } else {
    return false
  }
}

export const IS_PRODUCTION = import.meta.env.PROD
export const IS_NOT_PRODUCTION = !IS_PRODUCTION

export const getPageQuery = () => parseParams(window.location.href.split('?')[1])
export const getPageFragment = () => parseParams(window.location.href.split('#')[1])

export function unitFormatter (decimals: number, unit?: string): (value: number | string | undefined) => string {
  return (value: number | string | undefined) => {
    if (!value || value === '') {
      return ''
    }

    const number = Number(value)

    return !Number.isNaN(number) && Number.isFinite(number)
      ? `${number.toFixed(decimals)}${unit ? ` ${unit}` : ''}`
      : ''
  }
}

export function unitParser (
  decimals: number,
  unit: string,
  negativeAllowed?: boolean
): (displayValue: string | undefined) => number | string {
  return (displayValue: string | undefined) => {
    if (!displayValue) {
      return ''
    }

    let parsed = displayValue
      .replace(unit, '') // remove unit
      .replace(/[^\d.-]/g, '') // remove anything except digits and dots

    if (!negativeAllowed) {
      parsed = parsed.replace('-', '') // remove minuses
    }

    if (parsed === '') {
      return ''
    }

    const value = Number(parsed)
    return Number.isNaN(value) ? 0 : value.toFixed(decimals)
  }
}

export const nanToUndefined = (str: string | number): number | undefined => {
  if (str === '' || str === undefined || str === null) {
    return undefined
  }

  const value = Number(str)

  return Number.isNaN(value) || !Number.isFinite(value) ? undefined : value
}

export const identity = ([a]: any[]) => a

export const safeConvert = (
  func: (params: number[]) => number,
  params: Array<number | undefined>,
  precision = 0
): number | undefined => {
  if (params.some((param) => param === undefined)) {
    return undefined
  }

  const safeParams = params as number[]

  const value = Number(func(safeParams).toFixed(precision))

  return nanToUndefined(value)
}

export const roundWithPrecision = (value: number, precision: number) =>
  Math.round((value + Number.EPSILON) * 10 ** precision) / 10 ** precision

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export const redirectBack = () => {
  const urlParams = new URL(window.location.href)
  const params = getPageQuery()
  let { redirect } = params as { redirect: string }
  if (redirect) {
    const redirectUrlParams = new URL(redirect)
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length)
      if (redirect.match(/^\/.*#/) != null) {
        redirect = redirect.substr(redirect.indexOf('#') + 1)
      }
    } else {
      window.location.href = redirect
    }
  }

  console.log(`isAbout to redirect to ${redirect || '/'}`)
  useRouter().replace(redirect || '/')
}

export const userPermissionToAuthority = (
  permission: UserPermission = UserPermission.ONLINE_USER,
  isPro = false
): UserAuthorities[] => {
  const userRoles = [UserAuthorities.USER]
  if (isPro) {
    userRoles.push(UserAuthorities.PRO)
  }

  if (permission === undefined) {
    return userRoles
  }

  switch (permission) {
    case UserPermission.ONLINE_MODERATOR:
      return [...userRoles, UserAuthorities.MODERATOR]
    case UserPermission.ONLINE_ADMIN:
      return [...userRoles, UserAuthorities.ADMIN]
    case UserPermission.ONLINE_USER:
    case UserPermission.ONLINE_PRO_BUILDER: // it's not PRO subscription, but really active user
    default:
      return userRoles
  }
}

export function storeAuthority (authority: string | string[]) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority))
}
