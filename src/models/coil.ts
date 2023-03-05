import { Coil, Properties, Wire, wireGenerator, WireStyle } from '@vapetool/types';
import { message } from 'antd';
import * as server from '@/services/coil';
import { useState } from 'react';
import { isLoggedInOrShowNotification } from '@/services/user';

export interface Path {
  style: WireStyle;
  index: number;
}

export const useCoilModel = () => {
  const [currentCoil, setCurrentCoil] = useState<Coil>(wireGenerator.normalCoil());
  const [baseVoltage, setBaseVoltage] = useState<number>(3.7);
  const [properties, setProperties] = useState<Properties>();

  const setCoilType = (type: number, paths: Path[]) => {
    if (paths.length === 0) {
      const newCoil = wireGenerator.coilOfType(type);
      setCurrentCoil(newCoil);
      return;
    }
    const newWire: Wire = new Wire({ ...wireGenerator.coilOfType(type) });
    const newCoil = { ...currentCoil };
    modifyWireOnPath(newCoil, newWire, paths);
    setCurrentCoil(newCoil);
  };

  const addWire = (wire: Wire, paths: Path[]) => {
    const newCoil = { ...currentCoil };

    addWireOnPath(newCoil, wire, paths);
    setCurrentCoil(newCoil);
  };

  const deleteWire = (paths: Path[]) => {
    const newCoil = { ...currentCoil };
    deleteWireOnPath(newCoil, paths);
    setCurrentCoil(newCoil);
  };

  const setWire = (wire: Wire, paths: Path[]) => {
    const newCoil = { ...currentCoil };
    modifyWireOnPath(newCoil, wire, paths);
    setCurrentCoil(newCoil);
  };

  const setLegsLength = (legsLength: number) => {
    setCurrentCoil({ ...currentCoil, legsLength });
  };

  const setResistance = (resistance: number) => {
    setCurrentCoil({ ...currentCoil, resistance });
  };

  const setWraps = (wraps: number) => {
    setCurrentCoil({ ...currentCoil, wraps });
  };

  const setCoil = (coil: Coil) => {
    setCurrentCoil({ ...currentCoil, ...coil });
  };
  const setSetup = (setup: number) => {
    setCurrentCoil({ ...currentCoil, setup });
  };
  const setInnerDiameter = (innerDiameter: number) => {
    setCurrentCoil({ ...currentCoil, innerDiameter });
  };

  const calculateProperties = async (coil: Coil) => {
    if (!isLoggedInOrShowNotification()) return;
    try {
      const response = await server.calculateProperties(currentCoil, baseVoltage);
      if (response instanceof Response) {
        throw new Error(response.statusText);
      } else if (response instanceof Object) {
        console.log(response);
        setProperties(response);
      }
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message);
      }
    }
  };

  const calculateForResistance = async () => {
    if (!isLoggedInOrShowNotification()) return;
    try {
      const response = await server.calculateForResistance(currentCoil, baseVoltage);
      if (response instanceof Response) {
        throw new Error(response.statusText);
      } else if (response instanceof Object) {
        setCoil(response);
        await calculateProperties(response);
      }
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message);
      }
    }
  };

  const calculateForWraps = async () => {
    if (!isLoggedInOrShowNotification()) return;
    try {
      const response = await server.calculateForWraps(currentCoil, baseVoltage);
      if (response instanceof Response) {
        throw new Error(response.statusText);
      } else if (response instanceof Object) {
        setCoil(response);
        await calculateProperties(response);
      }
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message);
      }
    }
  };

  return {
    currentCoil,
    properties,
    baseVoltage,
    setCoilType,
    setBaseVoltage,
    setSetup,
    setInnerDiameter,
    setLegsLength,
    setResistance,
    setWraps,
    calculateForResistance,
    calculateForWraps,
    addWire,
    deleteWire,
    setWire,
  };
};

function deleteWireOnPath(wire: Coil | Wire, paths: Path[]) {
  const path = paths.shift();
  const isLast = paths.length === 0;
  if (path !== undefined) {
    if (isLast) {
      if (path.style === WireStyle.CORE) {
        wire.cores.splice(path.index, 1);
      } else {
        wire.outers.splice(path.index, 1);
      }
    }
    if (path.style === WireStyle.CORE) {
      deleteWireOnPath(wire.cores[path.index], paths);
    } else {
      deleteWireOnPath(wire.outers[path.index], paths);
    }
  }
}

function addWireOnPath(wire: Coil | Wire, newWire: Wire, paths: Path[]) {
  const path = paths.shift();
  if (path === undefined) {
    wire.cores.push(newWire);
  } else {
    addWireOnPath(wire.cores[path.index], newWire, paths);
  }
}

function modifyWireOnPath(wire: Coil | Wire, newWire: Wire, paths: Path[]) {
  const path = paths.shift();
  if (path !== undefined) {
    if (path.style === WireStyle.CORE) {
      modifyWireOnPath(wire.cores[path.index], newWire, paths);
    } else {
      modifyWireOnPath(wire.outers[path.index], newWire, paths);
    }
  } else {
    Object.assign(wire, newWire);
  }
}