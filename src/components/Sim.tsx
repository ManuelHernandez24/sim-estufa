import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { ComponentsWithTime } from '../models';
import calculateNextSim from '../utils/calculateNextSim';
import { useIndexedDB } from 'react-indexed-db';
import { SIM_STORE } from '../config/DBConfig';
import SimDT from './SimDT';
import formatNumber from '../utils/formatNumber';
import './Sim.css';
import { useTimer } from 'use-timer';
import { Knob } from 'primereact/knob';
import { TreeSelect } from 'primereact/treeselect';

interface SimProps { }

const initialComponents: ComponentsWithTime = {
  density: 0.0,
  contamination: 0.0,
  capital: 0.0,
  time: 1
};

const Sim: React.FC<SimProps> = () => {
  const [components, setComponents] = useState<ComponentsWithTime>(initialComponents);
  const [history, setHistory] = useState<ComponentsWithTime[]>([]);
  const [gas, setGas] = useState<number>(0);
  const [estufa, setEstufa] = useState<number>(0);
  const { add, getAll, clear } = useIndexedDB(SIM_STORE);
  const [tipoMaterial, setTipoMaterial] = useState(null);

  const nextCycle = async () => {
    const nextSim = calculateNextSim(components);
    setComponents((old) => nextSim);
    await add(nextSim);
    const newHistory = await getAll();
    setHistory((old) => newHistory);
  };

  const { start, pause, reset, time, status } = useTimer({
    autostart: true,
    interval: 1000,
    onTimeOver: async () => { },
    onTimeUpdate: async () => {
      await nextCycle();
    }
  });

  const handleClear = async () => {
    await clear();
    setComponents(initialComponents);
    await updateHistory();
  };

  const updateHistory = async () => {
    const newHistory = await getAll();
    setHistory((old) => newHistory);
  };

  useEffect(() => {
    updateHistory();
  }, []);

  return (
    <>
      <div className={'sim-container'}>
        <h2 className={'component'}>
          Tiempo de ebullici&oacute;n: <span>{components.time}</span>
        </h2>
        <h2 className={'component'}>
          Apertura del tanque:
          <Knob value={gas} min={0} max={100} onChange={(e) => setGas(e.value)} />
        </h2>

        {/* <h2 className={'component'}>
          Tiempo: <span>{components.time}</span>
        </h2> */}
        {/* <h2 className={'component'}>
          Densidad: <span>{formatNumber(components?.density)} persona/km&sup2;</span>
        </h2> */}
        <h2 className={'component'}>
          Control de la estufa: <span>{components.time}</span>
        </h2>
        {/* <h2 className={'component'}>
          Contaminaci&oacute;n: <span>{formatNumber(components?.contamination)} AQI</span>
        </h2> */}
        {/* <h2 className={'component'}>
          Capital: <span>{formatNumber(components?.capital)} d&oacute;lares</span>
        </h2> */}
      </div>
      <div className={'sim-actions'}>
        {status === 'PAUSED' || status === 'STOPPED' ? (
          <Button icon={'pi pi-play'} onClick={start} className={'p-button-sm'} />
        ) : (
          <Button icon={'pi pi-pause'} onClick={pause} className={'p-button-sm'} />
        )}{' '}
        <Button
          icon={'pi pi-stop'}
          onClick={async () => {
            await handleClear();
            reset();
          }}
          className={'p-button-sm'}
        />
      </div>

      <div>
        <h2 className={'component'}>
          Apertura de la estufufa:
          <Knob value={estufa} min={0} max={5} onChange={(e) => setEstufa(e.value)} />
        </h2>
        <h2 className={'component'}>
          Tipo de material:
          TreeSelect value={selectedNodeKey1} options={nodes} onChange={(e) => setSelectedNodeKey1(e.value)} placeholder="Select Item"></TreeSelect>
      </h2>
    </div>


      {/* <div className={'sim-history'}>
        <SimDT data={history} />
      </div> */}

    </>
  );
};

export default Sim;
