import { Flavor, Liquid, Result } from '@vapetool/types'
import { message } from 'antd'
import { calculateResults } from '@/services/liquid'
import { useState } from 'react'
import { isLoggedInOrShowNotification } from '@/services/user'

export interface LiquidModelState {
  currentLiquid: Liquid
  results?: Result[]
  editingFlavor?: string
  showNewFlavorModal?: boolean
}

export const useLiquidModel = () => {
  const [calculateBtnLoading, setCalculateBtnLoading] = useState(false)
  const [currentLiquid, setCurrentLiquid] = useState<Liquid>(new Liquid())
  const [resultsState, setResultsState] = useState<Result[]>()
  const [editingFlavor, setEditingFlavor] = useState<string>()
  const [showNewFlavorModal, setShowNewFlavorModal] = useState<boolean>(false)
  const [saveModalVisible, setSaveModalVisible] = useState(false)
  const setBaseStrength = (strength: number): void => {
    setCurrentLiquid({
      ...currentLiquid,
      baseStrength: strength
    })
  }
  const setBaseRatio = (ratio: number): void => {
    setCurrentLiquid({
      ...currentLiquid,
      baseRatio: ratio
    })
  }
  const setThinner = (thinner: number): void => {
    setCurrentLiquid({
      ...currentLiquid,
      thinner
    })
  }
  const setAmount = (amount: number): void => {
    setCurrentLiquid({
      ...currentLiquid,
      amount
    })
  }
  const setTargetStrength = (strength: number): void => {
    setCurrentLiquid({
      ...currentLiquid,
      targetStrength: strength
    })
  }
  const setTargetRatio = (ratio: number): void => {
    setCurrentLiquid({
      ...currentLiquid,
      targetRatio: ratio
    })
  }
  const setResults = (payload: Result[]): void => {
    setResultsState(payload)
  }
  const setLiquid = (payload: Liquid): void => {
    setCurrentLiquid(payload)
  }
  const editFlavor = (payload: string): void => {
    setEditingFlavor(payload)
  }
  const showFlavorModal = () => {
    setShowNewFlavorModal(true)
  }
  const hideFlavorModal = () => {
    setShowNewFlavorModal(false)
  }
  const addFlavor = (payload: Flavor[]) => {
    setCurrentLiquid({
      ...currentLiquid,
      flavors: [...currentLiquid.flavors, ...payload]
    })
  }
  const removeFlavor = (uid: string) => {
    const newFlavors = currentLiquid.flavors.filter((flavor: Flavor) => flavor.uid !== uid)
    setCurrentLiquid({
      ...currentLiquid,
      flavors: [...newFlavors]
    })
  }
  // change any
  const setFlavor = (uid: string, row: any) => {
    const newData = [...currentLiquid.flavors]
    const index = newData.findIndex((item) => uid === item.uid)
    if (index > -1) {
      const item = newData[index]
      newData.splice(index, 1, {
        ...item,
        ...row
      })
    } else {
      newData.push(row)
    }
    setCurrentLiquid({
      ...currentLiquid,
      flavors: [...newData]
    })
  }
  const calculateResult = async () => {
    if (!isLoggedInOrShowNotification()) return
    try {
      const res = await calculateResults(currentLiquid)
      setResults(res)
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message)
      }
    }
  }
  return {
    setBaseStrength,
    setBaseRatio,
    setThinner,
    setAmount,
    setTargetStrength,
    setTargetRatio,
    setResults,
    setLiquid,
    editFlavor,
    addFlavor,
    removeFlavor,
    setFlavor,
    hideFlavorModal,
    showFlavorModal,
    calculateResult,
    setSaveModalVisible,
    setCalculateBtnLoading,
    calculateBtnLoading,
    currentLiquid,
    resultsState,
    editingFlavor,
    showNewFlavorModal,
    saveModalVisible
  }
}
